import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

const HeadlineWithSpan = ({ link }) => {
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
        className='flex flex-col gap-4 md:gap-6 items-center w-full max-w-7xl py-24 bg-white mx-auto px-6 md:px-0 mt-16'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        <div>
          <h2 className='font-canela text-gray-900 text-5xl text-center'>
            Get <span className='font-scarlet'>Inspired</span> with our
            lookbook!
          </h2>
        </div>
        <div>
          <p className='text-center text-base md:text-lg'>
            Explore our latest lookbook and find lots of inspiration for your
            next classroom transformation!
          </p>
        </div>
        <button
          className='bg-neutral-brown font-sweet-bold text-white uppercase px-5 py-3 tracking-widest'
          onClick={() =>
            window.open(
              'https://shopschoolgirlstyle.com/pages/sgs-lookbook',
              '_blank'
            )
          }
        >
          Explore Lookbook
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default HeadlineWithSpan;
