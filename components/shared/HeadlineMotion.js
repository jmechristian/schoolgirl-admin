import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SplitText } from './SplitText';

const HeadlineMotion = ({ children, val }) => {
  const textRef = useRef();
  const inView = useInView(textRef);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        ref={textRef}
      >
        <SplitText
          initial={{ y: '100%' }}
          animate={inView ? 'visible' : { y: '100%' }}
          variants={{
            visible: (i) => ({
              y: 0,
              transition: {
                delay: i * 0.05,
                ease: 'easeOut',
                duration: 0.4,
              },
            }),
          }}
        >
          {children}
        </SplitText>
      </motion.div>
    </AnimatePresence>
  );
};

export default HeadlineMotion;
