import React, { useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PlayIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence, useInView } from 'framer-motion';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
import { useRouter } from 'next/router';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const PlayerIcon = () => {
  return (
    <div className='w-28 h-28 md:w-40 md:h-40 rounded-full border-white bg-gray/30 backdrop-blur-md shadow-2xl border-8 absolute flex justify-center items-center z-5'>
      <PlayIcon className='w-20 ml-3 md:w-24 md:ml-4 h-full fill-white leading-none inline-flex' />
    </div>
  );
};

const EditableVideoPlayer = ({
  placeholder,
  url,
  id,
  table,
  field_one,
  field_two,
}) => {
  const videoRef = useRef();
  const inView = useInView(videoRef);

  const [isPlaying, setPlaying] = useState(true);
  const [isBg, setIsBg] = useState(placeholder && placeholder);
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(url && url);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isTable, setIsTable] = useState(table && table);

  const router = useRouter();

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

  const playVideo = () => {
    // if (inView) {
    //   setPlaying(true);
    // } else {
    //   setPlaying(false);
    // }
    console.log(inView);
  };

  const queryData = {
    [field_one]: isBg,
    [field_two]: isLink,
  };

  const heroSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from(`${isTable}`)
      .update({
        [field_one]: isBg,
        [field_two]: isLink,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
    console.log('data', data);
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-60 md:h-[600px] max-w-[1440px] mx-auto aspect-video relative'
        ref={videoRef}
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        layout
      >
        {isEditing && (
          <motion.div className='absolute z-30 top-0 left-0 bottom-0 right-0 bg-black/40 backdrop-blur flex justify-center items-center py-8'>
            <motion.div className='bg-white/80 max-w-3xl w-full h-full rounded-lg p-9 flex justify-center items-center'>
              <motion.form
                className='flex flex-col gap-4 w-full'
                onSubmit={(event) => heroSubmitHandler(event)}
              >
                <motion.div className='grid grid-cols-1 gap-6'>
                  <TextInput
                    type='text'
                    name='placeholder'
                    id='placeholder'
                    placeholder='new placeholder image...'
                    value={isBg}
                    changeHandler={(val) => setIsBg(val)}
                  />
                  <TextInput
                    type='text'
                    name='link'
                    id='link'
                    placeholder='new link...'
                    value={isLink}
                    changeHandler={(val) => setIsLink(val)}
                  />
                </motion.div>
                <motion.div className='flex justify-between items-center w-full'>
                  <motion.div className='flex justify-end items-center mt-4 gap-4'>
                    <motion.div className='font-medium text-green-700 text-lg'>
                      {isSubmitted && (
                        <div className='flex items-center gap-1 text-green-700'>
                          <CheckCircleIcon className='w-7 h-7 fill-green-700' />
                          Updated!
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                  <motion.div className='flex justify-end items-center mt-4 gap-4'>
                    <motion.div
                      className='bg-black/40 rounded-lg px-4 py-2'
                      onClick={() => setIsEditing(false)}
                    >
                      <motion.div className='text-white font-bold cursor-pointer'>
                        {isSubmitted ? 'Close' : 'Cancel'}
                      </motion.div>
                    </motion.div>
                    <motion.button
                      className='bg-black rounded-lg px-4 py-2'
                      type='submit'
                    >
                      <motion.div className='text-white font-bold'>
                        {isLoading ? 'Sending...' : 'Update'}
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
        <motion.div className='absolute left-6 bottom-5 z-50 shadow-lg w-16 h-16 rounded-full bg-black ring-2 ring-white flex items-center justify-center cursor-pointer'>
          <motion.div onClick={() => setIsEditing(true)} className='max-w-7xl'>
            <PencilSquareIcon className='w-7 h-7 fill-white' />
          </motion.div>
        </motion.div>
        <ReactPlayer
          url={url}
          width='auto'
          height='100%'
          playsinline
          light={placeholder}
          playIcon={<PlayerIcon />}
          controls={true}
          muted
          playing={isPlaying}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default EditableVideoPlayer;
