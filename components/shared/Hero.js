import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/router';

const Hero = ({
  side,
  heading,
  headingColor,
  headline,
  subtext,
  buttonText,
  buttonColor,
  bg,
  textSide,
  textColor,
  link,
  bodyColor,
  buttonTextColor,
}) => {
  const heroRef = useRef();
  const inView = useInView(heroRef);

  const router = useRouter();

  const variants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full relative h-full'
        initial='hide'
        variants={variants}
        animate={inView ? 'show' : 'hide'}
        ref={heroRef}
      >
        <motion.div
          className={`absolute bottom-0 right-0 left-0 w-full h-full bg-gradient-to-r via-white/80 from-white/30 to-white/30 ${side} md:from-white z-10 `}
        ></motion.div>
        <motion.div
          className={`h-96 relative md:h-[543px] flex max-w-[1440px] mx-auto bg-cover bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <motion.div
            className={`absolute w-[300px] md:h-[543px] flex justify-center items-center top-0 bottom-0 ${textSide} z-20`}
          >
            <motion.div className='flex flex-col max-w-screen-xs text-center gap-3'>
              <motion.div
                className={`font-sweet-bold uppercase tracking-widest text-xs ${
                  headingColor ? headingColor : 'text-gray-900'
                }`}
              >
                {heading}
              </motion.div>
              <motion.div
                className={`font-canela text-5xl md:text-7xl ${textColor}`}
              >
                {headline}
              </motion.div>
              <motion.div
                className={`font-brown ${bodyColor} px-4 text-sm md:text-base`}
              >
                {subtext}
              </motion.div>
              <motion.button
                className={`font-sweet-bold text-sm md:text-base tracking-widest uppercase mt-2 ${buttonColor} ${
                  buttonTextColor ? buttonTextColor : 'text-white'
                } py-3 px-5 w-fit mx-auto`}
                onClick={() => window.open(link, '_blank')}
              >
                {buttonText}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hero;
