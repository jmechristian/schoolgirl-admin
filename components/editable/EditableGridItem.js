import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableGridItem = ({
  image,
  alt,
  headline,
  text,
  background,
  link,
  job,
  id,
}) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);
  const [isBg, setIsBg] = useState(image && image);
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(link && link);
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

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

  const gridItemSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('grid_item')
      .update({
        title: isHeadline,
        link: isLink,
        image: isBg,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    image && (
      <AnimatePresence>
        <motion.div
          className='w-full h-full min-h-[220px] flex flex-col relative'
          variants={variants}
          initial='hide'
          animate={inView ? 'show' : 'hide'}
          ref={itemRef}
          //   onClick={() => window.open(link, '_blank')}
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
          <motion.div className='absolute left-6 bottom-5 z-50 shadow-lg w-12 h-12 rounded-full bg-black ring-2 ring-white flex items-center justify-center cursor-pointer'>
            <motion.div onClick={() => setIsEditing(true)}>
              <PencilSquareIcon className='w-6 h-6 fill-white' />
            </motion.div>
          </motion.div>
          {isEditing && (
            <motion.div className='absolute z-50 top-0 left-0 bottom-0 right-0 bg-black/40 backdrop-blur flex justify-center items-center'>
              <motion.div className='bg-white/80 p-3 max-w-3xl w-full h-full flex justify-center items-center'>
                <motion.form
                  className='flex flex-col gap-4 w-full'
                  onSubmit={(event) => gridItemSubmitHandler(event)}
                >
                  <motion.div className='grid grid-cols-1 gap-3'>
                    <TextInput
                      type='text'
                      name='background'
                      id='background'
                      placeholder='new background...'
                      value={isBg}
                      changeHandler={(val) => setIsBg(val)}
                    />
                    <TextInput
                      type='text'
                      name='headline'
                      id='headline'
                      placeholder='new headline...'
                      value={isHeadline}
                      changeHandler={(val) => setIsHeadline(val)}
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
                          Cancel
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
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default EditableGridItem;
