import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export const GridItem = ({
  image,
  alt,
  headline,
  text,
  background,
  link,
  job,
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
    image && (
      <AnimatePresence>
        <motion.div
          className='w-full h-full min-h-[220px] flex flex-col'
          variants={variants}
          initial='hide'
          animate={inView ? 'show' : 'hide'}
          ref={itemRef}
          onClick={() => window.open(link, '_blank')}
        >
          <Image src={image} width={330} height={330} alt={alt} />
          <motion.div
            className={`${
              background ? 'bg-khaki' : ''
            } text-center flex flex-col justify-center items-center overflow-hidden py-3 px-5 h-16`}
          >
            <motion.div className={`font-brown-bold tracking-wide ${text}`}>
              {headline}
            </motion.div>
            {job && (
              <motion.div
                className={`font-brown tracking-wide text-gray-500/80 text-sm leading-tight`}
              >
                {job}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
