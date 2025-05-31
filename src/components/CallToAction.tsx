
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: 'partnership',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-forest-navy via-forest-navy/95 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-tiger-orange to-electric-cyan mb-8">
            Join the Revolution
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed mb-8">
            Partner with VanRakshak AI to transform wildlife conservation across India
          </p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-bio-green">🤝 Partnership Opportunities</span>
            <span className="text-electric-cyan">💡 Innovation Collaboration</span>
            <span className="text-neural-purple">🌍 Global Impact</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="holographic p-8 rounded-2xl"
          >
            <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-8 text-center">
              Get in Touch
            </h3>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-bio-green font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white focus:border-electric-cyan focus:outline-none transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-bio-green font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white focus:border-electric-cyan focus:outline-none transition-colors duration-300"
                    placeholder="your.email@organization.com"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="organization" className="block text-bio-green font-semibold mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white focus:border-electric-cyan focus:outline-none transition-colors duration-300"
                    placeholder="Your organization name"
                  />
                </div>

                {/* Interest Type */}
                <div>
                  <label htmlFor="interest" className="block text-bio-green font-semibold mb-2">
                    Interest Type
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white focus:border-electric-cyan focus:outline-none transition-colors duration-300"
                  >
                    <option value="partnership">Strategic Partnership</option>
                    <option value="funding">Investment Opportunity</option>
                    <option value="technology">Technology Collaboration</option>
                    <option value="deployment">Deployment Support</option>
                    <option value="research">Research Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-bio-green font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-forest-navy/50 border border-electric-cyan/30 rounded-lg text-misty-white focus:border-electric-cyan focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your interest in VanRakshak AI..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-orbitron font-bold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-neural-purple/50 text-misty-white/50 cursor-not-allowed'
                      : 'cyber-border holographic text-electric-cyan hover:text-forest-navy hover:bg-electric-cyan'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl text-bio-green mb-6">✅</div>
                <h4 className="text-2xl font-orbitron font-bold text-electric-cyan mb-4">
                  Message Sent Successfully!
                </h4>
                <p className="text-lg text-misty-white mb-6">
                  Thank you for your interest in VanRakshak AI. Our team will get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      organization: '',
                      interest: 'partnership',
                      message: ''
                    });
                  }}
                  className="glassmorphism px-6 py-3 rounded-lg text-electric-cyan hover:text-bio-green transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Contact Information & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="glassmorphism p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-bold text-neural-purple mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-electric-cyan to-bio-green rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <div className="text-bio-green font-semibold">Email</div>
                    <div className="text-misty-white">contact@vanrakshak.ai</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-neural-purple to-tiger-orange rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <div className="text-bio-green font-semibold">Phone</div>
                    <div className="text-misty-white">+91 9876 543 210</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-tiger-orange to-electric-cyan rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <div className="text-bio-green font-semibold">Address</div>
                    <div className="text-misty-white">
                      IIT Delhi Research Park<br />
                      New Delhi, India 110016
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Links */}
            <div className="glassmorphism p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6">
                Connect With Us
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'LinkedIn', icon: '💼', color: 'from-blue-500 to-blue-600' },
                  { name: 'Twitter', icon: '🐦', color: 'from-sky-400 to-sky-500' },
                  { name: 'GitHub', icon: '🐙', color: 'from-gray-600 to-gray-700' },
                  { name: 'Research', icon: '🔬', color: 'from-green-500 to-green-600' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${social.color} rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Call to Action Stats */}
            <div className="glassmorphism p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-bold text-tiger-orange mb-6">
                Why Partner With Us?
              </h3>
              
              <div className="space-y-4">
                {[
                  { stat: '95%+', label: 'AI Accuracy Rate', desc: 'Industry-leading precision' },
                  { stat: '24/7', label: 'Monitoring', desc: 'Continuous protection' },
                  { stat: '50+', label: 'Sanctuaries', desc: 'Planned coverage' },
                  { stat: '₹13.5cr', label: 'Total Investment', desc: '4-year program' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-forest-navy/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <div className="text-lg font-orbitron font-bold text-electric-cyan">
                        {item.stat}
                      </div>
                      <div className="text-sm text-misty-white/60">{item.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-bio-green font-semibold">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16 pt-8 border-t border-electric-cyan/20"
        >
          <p className="text-misty-white/60 mb-4">
            © 2024 VanRakshak AI. All rights reserved. Built for ENVIROSITY'25 Hackathon.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-misty-white/40">
            <a href="#" className="hover:text-electric-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-electric-cyan transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-electric-cyan transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
