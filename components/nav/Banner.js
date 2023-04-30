import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Banner = () => {
  const bannerRef = useRef();
  const inView = useInView(bannerRef);

  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      y: -40,
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
        className='w-full bg-neutral-100 py-4 text-center flex justify-center items-center'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={bannerRef}
      >
        <motion.div className='text-neutral-500 font-brown'>
          <motion.h3 className='px-8 sm:px-0'>
            <motion.a
              href='https://shopschoolgirlstyle.com/'
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
              Style Week
            </motion.a>{' '}
            is coming! The magic starts{' '}
            <span className='font-brown-bold'>March 31.</span> Exclusive
            back-to-school collections revealed.
          </motion.h3>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Banner;
