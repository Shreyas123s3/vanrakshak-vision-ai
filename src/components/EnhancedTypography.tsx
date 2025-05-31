
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useColorPsychology } from './ColorPsychologyProvider';

interface EnhancedTypographyProps {
  variant: 'hero' | 'heading' | 'subheading' | 'body' | 'caption' | 'stats';
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'grow' | 'pulse' | 'flourish' | 'reveal' | 'none';
  interactive?: boolean;
  tooltip?: string;
  context?: string;
  expandable?: boolean;
  expandedContent?: React.ReactNode;
}

export const EnhancedTypography: React.FC<EnhancedTypographyProps> = ({
  variant,
  children,
  className = '',
  animation = 'fade',
  interactive = false,
  tooltip,
  context,
  expandable = false,
  expandedContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const { getContextualColors } = useColorPsychology();

  useEffect(() => {
    if (isInView && animation !== 'none') {
      controls.start('visible');
    }
  }, [isInView, controls, animation]);

  const getVariantClasses = () => {
    const variants = {
      hero: 'text-hierarchy-primary font-orbitron font-bold',
      heading: 'text-hierarchy-secondary font-orbitron font-semibold',
      subheading: 'text-2xl md:text-3xl font-orbitron font-medium',
      body: 'text-hierarchy-body font-inter',
      caption: 'text-sm md:text-base font-inter opacity-80',
      stats: 'text-4xl md:text-6xl font-orbitron font-bold'
    };
    return variants[variant];
  };

  const getAnimationVariants = () => {
    const variants = {
      fade: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
      },
      grow: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'backOut' } }
      },
      pulse: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      },
      flourish: {
        hidden: { opacity: 0, y: 30, scale: 0.8, rotate: -5 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotate: 0,
          transition: { duration: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }
        }
      },
      reveal: {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: 'easeOut' } }
      },
      none: {
        hidden: {},
        visible: {}
      }
    };
    return variants[animation];
  };

  const getAnimationClass = () => {
    const classes = {
      fade: 'text-fade-reveal',
      grow: 'text-grow-stats',
      pulse: 'text-pulse-conservation',
      flourish: 'text-species-flourish',
      reveal: 'text-fade-reveal',
      none: ''
    };
    return classes[animation];
  };

  const contextualColorClass = context ? getContextualColors(context) : '';
  const interactiveClass = interactive ? 'text-interactive' : '';
  const tooltipClass = tooltip ? 'tooltip-definition' : '';

  const Component = motion.div;

  return (
    <Component
      ref={ref}
      className={`
        ${getVariantClasses()}
        ${getAnimationClass()}
        ${contextualColorClass}
        ${interactiveClass}
        ${tooltipClass}
        ${className}
        font-loading
      `}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      {children}
      
      {/* Tooltip */}
      {tooltip && (
        <div className="tooltip-content">
          {tooltip}
        </div>
      )}
      
      {/* Expandable content */}
      {expandable && (
        <>
          <button
            className="expand-trigger ml-2"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse content' : 'Expand content'}
          >
            {isExpanded ? '−' : '+'}
            <span className="text-sm">
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          </button>
          
          <motion.div
            className={`expandable-section ${isExpanded ? 'expanded' : ''}`}
            initial={false}
            animate={{
              maxHeight: isExpanded ? 'auto' : '0px',
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {expandedContent}
          </motion.div>
        </>
      )}
      
      {/* Hover effects for interactive text */}
      {interactive && isHovered && (
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-ai-electric/10 to-thriving-life/10 rounded-lg -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Component>
  );
};
