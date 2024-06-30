import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const EditableFlexGridItem = ({
  image,
  alt,
  headline,
  text,
  background,
  subheadline,
  link,
  id,
}) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);
  const [isBg, setIsBg] = useState(image && image);
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(link && link);
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isSubheadline, setIsSubheadline] = useState(
    subheadline && subheadline
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
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

  const gridItemSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('grid_item')
      .update({
        title: isHeadline,
        link: isLink,
        subheadline: isSubheadline,
        image: isBg,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  const goElsewhere = () => {
    window.open(link, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full min-h-[350px] flex flex-col relative'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        <motion.div className='absolute left-6 bottom-16 z-50 shadow-lg w-12 h-12 rounded-full bg-black ring-2 ring-white flex items-center justify-center cursor-pointer'>
          <motion.div onClick={() => setIsEditing(true)}>
            <PencilSquareIcon className='w-6 h-6 fill-white' />
          </motion.div>
        </motion.div>
        {isEditing && (
          <motion.div className='absolute z-50 top-0 left-0 bottom-0 right-0 bg-black/40 backdrop-blur flex justify-center items-center'>
            <motion.div className='bg-white/80 p-3 max-w-3xl w-full h-full flex justify-center items-center'>
              <motion.form
                className='flex flex-col gap-1 w-full'
                onSubmit={(event) => gridItemSubmitHandler(event)}
              >
                <motion.div className='grid grid-cols-1 gap-1'>
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
                    placeholder='if headline...'
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
                  <TextInput
                    type='text'
                    name='subheadline'
                    id='subheadline'
                    placeholder='if subheadline...'
                    value={isSubheadline}
                    changeHandler={(val) => setIsSubheadline(val)}
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
        <motion.div
          className='block relative w-full h-full cursor-pointer'
          //   onClick={goElsewhere}
        >
          <Image src={isBg} fill alt={alt} className='object-cover' />
        </motion.div>
        <motion.div
          className={`${background} w-full flex justify-between items-start overflow-hidden py-3 h-16`}
        >
          <motion.div className='flex flex-col'>
            <motion.div
              className={`font-brown-bold tracking-wide ${text} cursor-pointer`}
              //   onClick={goElsewhere}
            >
              {isHeadline}
            </motion.div>
            <motion.div className={`font-brown text-sm tracking-wide ${text}`}>
              {isSubheadline}
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
