import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const ScrollerItem = ({
  image,
  alt,
  headline,
  text,
  background,
  subheadline,
  bookmark,
  price,
  slug,
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

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full flex flex-col snap-start cursor-grab'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        <motion.div className='block relative aspect-square cursor-grabbing'>
          <Image
            src={image}
            fill
            alt={alt}
            className='object-cover'
            draggable={false}
          />
        </motion.div>
        <motion.div
          className={`${background} w-full flex ${
            bookmark ? 'justify-between' : 'justify-center'
          } items-start overflow-hidden py-4 h-16`}
        >
          <motion.div
            className='flex flex-col cursor-pointer'
            onClick={() => window.open(`${slug ? `/blog/${slug}` : '/#'}`)}
          >
            <motion.div className={`font-brown-bold tracking-wide ${text}`}>
              {headline}
            </motion.div>
            <motion.div className={`font-brown text-sm tracking-wide ${text}`}>
              {subheadline ? subheadline : ''}
              {price ? price : ''}
            </motion.div>
          </motion.div>
          {bookmark && (
            <motion.div onClick={() => setIsBookmarked(!isBookmarked)}>
              <BookmarkIcon
                className={`w-5 h-5  ${
                  isBookmarked
                    ? 'fill-brand-red stroke-brand-red'
                    : 'stroke-gray-800'
                }`}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScrollerItem;
