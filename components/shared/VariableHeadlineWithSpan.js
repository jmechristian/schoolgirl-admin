import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

const VariableHeadlineWithSpan = ({
  pre,
  spanText,
  post,
  subtext,
  buttonText,
  buttonLink,
}) => {
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
        className='flex flex-col gap-6 md:gap-6 items-center w-full max-w-7xl py-24 bg-white mx-auto px-6 md:px-0 mt-16'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        <div>
          <div className='font-canela text-gray-900 text-5xl text-center flex flex-col md:flex-row gap-3 md:gap-5 items-center'>
            {pre} <span className='font-scarlet'>{spanText}</span> {post}
          </div>
        </div>
        <div>
          <div className='text-center text-base md:text-lg max-w-3xl mx-auto flex flex-col gap-6'>
            {typeof subtext === 'string'
              ? subtext
              : subtext.map((it, i) => <p key={i}>{it}</p>)}
          </div>
        </div>
        {buttonText === 'Melanie' ? (
          <p className='text-brand-red font-scarlet text-4xl'>
            &mdash; Melanie
          </p>
        ) : (
          <button
            className='bg-sweet-green font-sweet-bold text-white uppercase px-5 py-3 tracking-widest'
            onClick={() => window.open(buttonLink)}
          >
            {buttonText}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VariableHeadlineWithSpan;
