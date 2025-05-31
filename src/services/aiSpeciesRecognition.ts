
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

interface SpeciesResult {
  species: string;
  confidence: number;
  behavior: string;
  location: string;
}

interface HuggingFaceResult {
  label: string;
  score: number;
}

class AISpeciesRecognitionService {
  private mobileNetModel: mobilenet.MobileNet | null = null;
  private isLoading = false;
  private huggingFaceApiKey = '';

  // Wildlife species mapping for Indian fauna
  private wildlifeMapping: Record<string, { species: string; behavior: string; location: string }> = {
    'tiger': { species: 'Bengal Tiger', behavior: 'Hunting patrol', location: 'Sundarbans National Park' },
    'elephant': { species: 'Asian Elephant', behavior: 'Feeding', location: 'Kaziranga National Park' },
    'leopard': { species: 'Snow Leopard', behavior: 'Territory marking', location: 'Hemis National Park' },
    'rhinoceros': { species: 'Indian Rhinoceros', behavior: 'Grazing', location: 'Kaziranga National Park' },
    'lion': { species: 'Asiatic Lion', behavior: 'Resting', location: 'Gir National Park' },
    'bear': { species: 'Sloth Bear', behavior: 'Foraging', location: 'Daroji Bear Sanctuary' },
    'deer': { species: 'Spotted Deer', behavior: 'Grazing', location: 'Bandhavgarh National Park' },
    'monkey': { species: 'Langur', behavior: 'Social grooming', location: 'Western Ghats' },
    'bird': { species: 'Peacock', behavior: 'Displaying', location: 'Ranthambore National Park' },
    'snake': { species: 'King Cobra', behavior: 'Basking', location: 'Western Ghats' }
  };

  async loadMobileNetModel(): Promise<void> {
    if (this.mobileNetModel || this.isLoading) return;
    
    try {
      this.isLoading = true;
      console.log('Loading MobileNet model...');
      
      // Load the MobileNet model
      this.mobileNetModel = await mobilenet.load();
      console.log('MobileNet model loaded successfully');
    } catch (error) {
      console.error('Failed to load MobileNet model:', error);
      throw new Error('Failed to load AI model');
    } finally {
      this.isLoading = false;
    }
  }

  async classifyImage(imageElement: HTMLImageElement): Promise<SpeciesResult> {
    try {
      // Try MobileNet first (primary method)
      if (this.mobileNetModel) {
        const predictions = await this.mobileNetModel.classify(imageElement);
        console.log('MobileNet predictions:', predictions);
        
        if (predictions && predictions.length > 0) {
          const topPrediction = predictions[0];
          return this.mapPredictionToWildlife(topPrediction.className, topPrediction.probability);
        }
      }

      // Fallback to Hugging Face if MobileNet fails
      return await this.classifyWithHuggingFace(imageElement);
    } catch (error) {
      console.error('Classification error:', error);
      throw new Error('Failed to classify image');
    }
  }

  private mapPredictionToWildlife(className: string, confidence: number): SpeciesResult {
    const lowerClassName = className.toLowerCase();
    
    // Find matching wildlife category
    for (const [key, value] of Object.entries(this.wildlifeMapping)) {
      if (lowerClassName.includes(key)) {
        return {
          species: value.species,
          confidence: Math.round(confidence * 100),
          behavior: value.behavior,
          location: value.location
        };
      }
    }

    // Default classification if no specific wildlife match
    return {
      species: `Unidentified Species (${className})`,
      confidence: Math.round(confidence * 100),
      behavior: 'Unknown behavior',
      location: 'Location to be determined'
    };
  }

  private async classifyWithHuggingFace(imageElement: HTMLImageElement): Promise<SpeciesResult> {
    if (!this.huggingFaceApiKey) {
      throw new Error('Hugging Face API key not provided');
    }

    try {
      // Convert image to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      ctx.drawImage(imageElement, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');

      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/resnet-50',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceApiKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: imageData
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const results: HuggingFaceResult[] = await response.json();
      
      if (results && results.length > 0) {
        const topResult = results[0];
        return this.mapPredictionToWildlife(topResult.label, topResult.score);
      }

      throw new Error('No results from Hugging Face API');
    } catch (error) {
      console.error('Hugging Face classification error:', error);
      throw new Error('Backup classification failed');
    }
  }

  setHuggingFaceApiKey(apiKey: string): void {
    this.huggingFaceApiKey = apiKey;
  }

  async processImageFile(file: File): Promise<SpeciesResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const result = await this.classifyImage(img);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  async processImageFromCanvas(canvas: HTMLCanvasElement): Promise<SpeciesResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const result = await this.classifyImage(img);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load canvas image'));
      img.src = canvas.toDataURL();
    });
  }
}

export const aiSpeciesService = new AISpeciesRecognitionService();
export type { SpeciesResult };
