import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableBanner = () => {
  const bannerRef = useRef();
  const inView = useInView(bannerRef);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isHeadline, setIsHeadline] = useState('');
  const [isLink, setLink] = useState('');

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

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('salesbar')
      .update({
        value: isHeadline,
        link: isLink,
      })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full bg-neutral-100 py-4 text-center flex justify-center items-center gap-3'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={bannerRef}
      >
        {isEditing ? (
          <form
            className='grid grid-cols-8 gap-2 justify-center items-center w-full max-w-[1400px] mx-auto'
            onSubmit={(e) => headlineSubmitHandler(e)}
          >
            <div className='col-span-4'>
              <TextInput
                type='text'
                id='headline'
                value={isHeadline}
                changeHandler={(val) => setIsHeadline(val)}
              />
            </div>
            <div className='col-span-2'>
              <TextInput
                type='text'
                id='link'
                value={isLink}
                changeHandler={(val) => setLink(val)}
              />
            </div>
            <button
              type='submit'
              className={`${
                isSubmitted ? 'bg-green-700' : 'bg-black'
              } rounded-lg text-white font-medium text-sm p-2 font-brown`}
            >
              {isLoading ? 'Sending....' : isSubmitted ? 'Updated!' : 'Update'}
            </button>
          </form>
        ) : (
          <div className='flex items-center gap-3'>
            <motion.div className='text-neutral-500 font-brown'>
              <motion.h3 className='px-8 sm:px-0'>
                <motion.a href={isLink} target='_blank' rel='noreferrer'>
                  {isHeadline}
                </motion.a>
              </motion.h3>
            </motion.div>
          </div>
        )}
        <div onClick={() => setIsEditing(!isEditing)}>
          <PencilSquareIcon className='w-5 h-5 fill-black' />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditableBanner;
