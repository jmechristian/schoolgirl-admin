import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import TextInput from '../shared/TextInput';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableScrollerItem = ({
  image,
  alt,
  headline,
  text,
  background,
  subheadline,
  bookmark,
  price,
  slug,
  id,
}) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isImage, setIsImage] = useState(image && image);
  const [isAlt, setIsAlt] = useState(alt && alt);
  const [isSlug, setIsSlug] = useState(slug && slug);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const tipSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tips')
      .update({
        image: isImage,
        alt: isAlt,
        headline: isHeadline,
        slug: isSlug,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full flex flex-col snap-start cursor-point relative'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
        // onClick={() => window.open(`${slug ? slug : '/#'}`)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && !isEditing && (
          <div className='absolute top-3 right-3 w-fit flex items-center z-10'>
            <div
              className='w-9 h-9 rounded-full bg-black text-white flex items-center justify-center'
              onClick={() => setIsEditing(true)}
            >
              <PencilSquareIcon className='w-5 h-5' />
            </div>
          </div>
        )}

        {isEditing && (
          <div className='w-full h-full bg-neutral-300 absolute inset-0 z-20 p-3'>
            <div className='flex flex-col gap-2'>
              <TextInput
                type={'text'}
                name={'headline'}
                id={'headline'}
                placeholder={isHeadline}
                value={isHeadline}
                changeHandler={(val) => setIsHeadline(val)}
              />
              <TextInput
                type={'text'}
                name={'image'}
                id={'image'}
                placeholder={isImage}
                value={isImage}
                changeHandler={(val) => setIsImage(val)}
              />
              <TextInput
                type={'text'}
                name={'alt'}
                id={'alt'}
                placeholder={isAlt}
                value={isAlt}
                changeHandler={(val) => setIsAlt(val)}
              />
              <TextInput
                type={'text'}
                name={'slug'}
                id={'slug'}
                placeholder={isSlug}
                value={isSlug}
                changeHandler={(val) => setIsSlug(val)}
              />
              <div className='flex items-center justify-end w-full gap-3 mt-2'>
                <div
                  className='bg-black text-white px-3 py-1 rounded cursor-pointer'
                  onClick={(e) => tipSubmitHandler(e)}
                >
                  {isLoading
                    ? 'Sending...'
                    : isSubmitted
                    ? 'Submitted!'
                    : 'Submit'}
                </div>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}
        <motion.div className='block relative aspect-square cursor-point'>
          <Image
            src={isImage}
            fill
            alt={isAlt}
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
            onClick={() => window.open(`${isSlug}`)}
          >
            <motion.div className={`font-brown-bold tracking-wide ${text}`}>
              {isHeadline}
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

export default EditableScrollerItem;
