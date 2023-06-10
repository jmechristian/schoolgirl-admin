import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Banner = () => {
  const bannerRef = useRef();
  const inView = useInView(bannerRef);

  const [isHeadline, setIsHeadline] = useState('');
  const [isLink, setLink] = useState('');

  useEffect(() => {
    const getHeader = async () => {
      let { data: salesbar, error } = await supabase
        .from('salesbar')
        .select('*');

      setIsHeadline(salesbar[0].value);
      setLink(salesbar[0].link);

      if (error) {
        console.log(error);
      }
    };

    getHeader();
  }, []);

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
            <motion.a href={isLink} target='_blank' rel='noreferrer'>
              {isHeadline}
            </motion.a>
          </motion.h3>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Banner;
