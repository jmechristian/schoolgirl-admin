import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const NewScroller = ({ children }) => {
  const scrollerRef = useRef();
  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const [scrollPercent, setScrollPercent] = useState(1);

  useEffect(() => {
    setScrollPercent(scrollXProgress.current);
    return scrollXProgress.onChange(() => updateXProgress());
  }, [scrollXProgress]);

  const updateXProgress = () => {
    setScrollPercent(scrollXProgress.current);
  };

  const scrollRight = () => {
    const right = scrollerRef.current;
    right.scrollBy(500, 0);
  };

  const scrollLeft = () => {
    const left = scrollerRef.current;
    left.scrollBy(-500, 0);
  };

  return (
    <>
      {scrollPercent != 1 && (
        <>
          <motion.div
            className='hidden lg:flex w-16 h-16 rounded-full cursor-pointer bg-gray-900 shadow-lg backdrop-blur-sm absolute top-1/2 -translate-y-1/2 right-0 justify-center items-center z-40'
            onClick={scrollRight}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ArrowRightIcon className='w-8 h-8 stroke-white stroke-2' />
          </motion.div>
          <motion.div
            className='hidden md:flex absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white via-white/80 w-16 md:w-40 z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          ></motion.div>
        </>
      )}
      {scrollPercent != 0 && (
        <>
          <motion.div
            className='hidden lg:flex w-16 h-16 rounded-full cursor-pointer bg-gray-900 shadow-lg backdrop-blur-sm absolute top-1/2 -translate-y-1/2 left-0 justify-center items-center z-40'
            onClick={scrollLeft}
          >
            <ArrowLeftIcon className='w-8 h-8 stroke-white stroke-2' />
          </motion.div>
          <div className='hidden md:block absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white via-white/80 w-16 md:w-40 z-10'></div>
        </>
      )}
      <motion.div
        className='overflow-x-scroll snap-x flex scroll-ml-16 flex-col scroll-smooth'
        ref={scrollerRef}
        id='scrollers'
        layoutScroll
      >
        <motion.div className='grid grid-flow-col gap-5'>{children}</motion.div>
      </motion.div>
    </>
  );
};

export default NewScroller;
