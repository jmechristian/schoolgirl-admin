import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

const FadeInWrapper = ({ children }) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);

  const variants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeInWrapper;
