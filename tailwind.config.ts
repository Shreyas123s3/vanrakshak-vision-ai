
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// VanRakshak AI Color Palette
				'forest-navy': '#0B1426',
				'electric-cyan': '#00D4FF',
				'bio-green': '#39FF6A',
				'neural-purple': '#8B5FFF',
				'tiger-orange': '#FF6B35',
				'misty-white': '#F8FAFC',
				
				// KILLER COLOR PSYCHOLOGY PALETTE
				'earth-warm': 'rgb(var(--earth-warm))',
				'earth-comfort': 'rgb(var(--earth-comfort))',
				'nature-trust': 'rgb(var(--nature-trust))',
				'nature-deep': 'rgb(var(--nature-deep))',
				'endangered-alert': 'rgb(var(--endangered-alert))',
				'endangered-urgent': 'rgb(var(--endangered-urgent))',
				'thriving-life': 'rgb(var(--thriving-life))',
				'thriving-growth': 'rgb(var(--thriving-growth))',
				'ai-electric': 'rgb(var(--ai-electric))',
				'ai-neural': 'rgb(var(--ai-neural))',
				'success-gold': 'rgb(var(--success-gold))',
				'success-natural': 'rgb(var(--success-natural))',
				'temp-warm': 'rgb(var(--temp-warm))',
				'temp-cool': 'rgb(var(--temp-cool))',
				'temp-neutral': 'rgb(var(--temp-neutral))'
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace']
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
				'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
				'2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
				'5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
				'7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
				'8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
				'9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.03em' }]
			},
			letterSpacing: {
				'tighter': '-0.05em',
				'tight': '-0.025em',
				'normal': '0em',
				'wide': '0.025em',
				'wider': '0.05em',
				'widest': '0.1em',
				'ultra-tight': '-0.08em'
			},
			lineHeight: {
				'none': '1',
				'tight': '1.25',
				'snug': '1.375',
				'normal': '1.5',
				'relaxed': '1.625',
				'loose': '2',
				'ultra-loose': '2.5'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'elegant-glow': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 8px rgba(var(--ai-electric), 0.2)) drop-shadow(0 0 16px rgba(var(--thriving-life), 0.1))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 12px rgba(var(--ai-electric), 0.3)) drop-shadow(0 0 24px rgba(var(--thriving-life), 0.15))'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'glitch': {
					'0%': {
						transform: 'translate(0)'
					},
					'20%': {
						transform: 'translate(-2px, 2px)'
					},
					'40%': {
						transform: 'translate(-2px, -2px)'
					},
					'60%': {
						transform: 'translate(2px, 2px)'
					},
					'80%': {
						transform: 'translate(2px, -2px)'
					},
					'100%': {
						transform: 'translate(0)'
					}
				},
				'typing': {
					'from': {
						width: '0'
					},
					'to': {
						width: '100%'
					}
				},
				'blink': {
					'0%, 50%': {
						borderColor: 'transparent'
					},
					'51%, 100%': {
						borderColor: 'rgb(var(--ai-electric))'
					}
				},
				'particle-float': {
					'0%': {
						transform: 'translateY(100vh) translateX(0px)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-100vh) translateX(100px)',
						opacity: '0'
					}
				},
				'forest-sway': {
					'0%, 100%': {
						transform: 'rotate(0deg) translateX(0px)'
					},
					'25%': {
						transform: 'rotate(1deg) translateX(2px)'
					},
					'75%': {
						transform: 'rotate(-1deg) translateX(-2px)'
					}
				},
				'cloud-drift': {
					'0%': {
						transform: 'translateX(-100px)'
					},
					'100%': {
						transform: 'translateX(calc(100vw + 100px))'
					}
				},
				'mystical-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(var(--ai-electric), 0.3), 0 0 40px rgba(var(--thriving-life), 0.2)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(var(--ai-electric), 0.5), 0 0 60px rgba(var(--thriving-life), 0.3)'
					}
				},
				'firefly-dance': {
					'0%': {
						transform: 'translate(0px, 0px)'
					},
					'33%': {
						transform: 'translate(30px, -20px)'
					},
					'66%': {
						transform: 'translate(-20px, 20px)'
					},
					'100%': {
						transform: 'translate(0px, 0px)'
					}
				},
				'aurora': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'translateX(-50%) scaleX(1)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'translateX(-50%) scaleX(1.1)'
					}
				},
				// KILLER TYPOGRAPHY ANIMATIONS
				'font-fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'text-reveal': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'grow-emphasis': {
					'0%': { transform: 'scale(1)' },
					'50%': { 
						transform: 'scale(1.1)', 
						color: 'rgb(var(--success-gold))' 
					},
					'100%': { transform: 'scale(1)' }
				},
				'conservation-pulse': {
					'0%, 100%': { 
						opacity: '1', 
						transform: 'scale(1)',
						color: 'rgb(var(--nature-trust))'
					},
					'50%': { 
						opacity: '0.8', 
						transform: 'scale(1.02)',
						color: 'rgb(var(--thriving-life))'
					}
				},
				'species-entrance': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px) scale(0.8) rotate(-5deg)'
					},
					'60%': {
						opacity: '1',
						transform: 'translateY(-5px) scale(1.05) rotate(2deg)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1) rotate(0deg)'
					}
				},
				'color-temperature-warm': {
					'0%': { filter: 'sepia(0) hue-rotate(0deg) saturate(1)' },
					'100%': { filter: 'sepia(0.2) hue-rotate(15deg) saturate(1.1)' }
				},
				'color-temperature-cool': {
					'0%': { filter: 'sepia(0) hue-rotate(0deg) saturate(1)' },
					'100%': { filter: 'sepia(0.1) hue-rotate(-15deg) saturate(1.05)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'elegant-glow': 'elegant-glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glitch': 'glitch 1s ease-in-out infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink': 'blink 0.75s step-end infinite',
				'particle-float': 'particle-float 15s linear infinite',
				'forest-sway': 'forest-sway 8s ease-in-out infinite',
				'cloud-drift': 'cloud-drift 20s linear infinite',
				'mystical-glow': 'mystical-glow 4s ease-in-out infinite',
				'firefly-dance': 'firefly-dance 6s ease-in-out infinite',
				'aurora': 'aurora 10s ease-in-out infinite',
				// KILLER TYPOGRAPHY ANIMATIONS
				'font-fade-in': 'font-fade-in 0.8s ease-out forwards',
				'text-reveal': 'text-reveal 1s ease-out forwards',
				'grow-emphasis': 'grow-emphasis 2s ease-out',
				'conservation-pulse': 'conservation-pulse 3s ease-in-out infinite',
				'species-entrance': 'species-entrance 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'temp-warm': 'color-temperature-warm 1s ease-out forwards',
				'temp-cool': 'color-temperature-cool 1s ease-out forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'cyber-grid': 'linear-gradient(rgba(var(--ai-electric), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--ai-electric), 0.1) 1px, transparent 1px)',
				'aurora-gradient': 'linear-gradient(45deg, rgba(var(--ai-electric), 0.3), rgba(var(--ai-neural), 0.3), rgba(var(--thriving-life), 0.3))',
				// KILLER CONTEXTUAL GRADIENTS
				'endangered-gradient': 'linear-gradient(135deg, rgba(var(--endangered-alert), 0.1), rgba(var(--endangered-urgent), 0.05))',
				'thriving-gradient': 'linear-gradient(135deg, rgba(var(--thriving-life), 0.1), rgba(var(--thriving-growth), 0.05))',
				'ai-gradient': 'linear-gradient(135deg, rgba(var(--ai-electric), 0.1), rgba(var(--ai-neural), 0.05))',
				'success-gradient': 'linear-gradient(135deg, rgba(var(--success-gold), 0.1), rgba(var(--success-natural), 0.05))',
				'nature-gradient': 'linear-gradient(135deg, rgba(var(--nature-trust), 0.1), rgba(var(--nature-deep), 0.05))'
			},
			backgroundSize: {
				'cyber-grid': '50px 50px'
			},
			textShadow: {
				'glow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
				'soft': '0 2px 4px rgba(0, 0, 0, 0.3)',
				'conservation': '0 0 12px rgba(var(--nature-trust), 0.4)',
				'ai': '0 0 12px rgba(var(--ai-electric), 0.4)',
				'species': '0 0 8px rgba(var(--thriving-life), 0.3)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
