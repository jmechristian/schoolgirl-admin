import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/outline';

export const FlexGridItem = ({
  image,
  alt,
  headline,
  text,
  background,
  subheadline,
  link,
}) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);

  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const goElsewhere = () => {
    window.open(link, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full min-h-[350px] flex flex-col'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        <motion.div
          className='block relative w-full h-full cursor-pointer'
          onClick={goElsewhere}
        >
          <Image src={image} fill alt={alt} className='object-cover' />
        </motion.div>
        <motion.div
          className={`${background} w-full flex justify-between items-start overflow-hidden py-3 h-16`}
        >
          <motion.div className='flex flex-col'>
            <motion.div
              className={`font-brown-bold tracking-wide ${text} cursor-pointer`}
              onClick={goElsewhere}
            >
              {headline}
            </motion.div>
            <motion.div className={`font-brown text-sm tracking-wide ${text}`}>
              {subheadline}
            </motion.div>
          </motion.div>
          {/* <motion.div onClick={() => setIsBookmarked(!isBookmarked)}>
            <BookmarkIcon
              className={`w-5 h-5  ${
                isBookmarked
                  ? 'fill-brand-red stroke-brand-red'
                  : 'stroke-gray-800'
              }`}
            />
          </motion.div> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
