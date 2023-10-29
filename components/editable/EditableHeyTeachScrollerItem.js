import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BookmarkIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, BellAlertIcon } from '@heroicons/react/24/solid';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableHeyTeachScrollerItem = ({
  image,
  alt,
  headline,
  text,
  background,
  subheadline,
  bookmark,
  link,
  price,
  slug,
  id,
  rowId,
}) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBg, setIsBg] = useState(image && image);
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(slug && slug);
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isSubheadline, setIsSubheadline] = useState(
    subheadline && subheadline
  );
  const [isDeleting, setIsDeleting] = useState(false);
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
    console.log(id);
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
    console.log('data', data);
  };

  const deleteItemHandler = async () => {
    const { error } = await supabase
      .from('row_items')
      .delete()
      .eq('item_id', id);
    setIsDeleting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-full flex flex-col snap-start cursor-pointer relative'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        <motion.div className='absolute z-10 right-2 top-2 flex gap-2'>
          <motion.div
            className=' w-9 h-9 p-2 bg-black ring ring-neutral-500 rounded-full hover:ring-yellow-300 flex justify-center items-center shadow cursor-pointer'
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className='w-6 h-6 stroke-white' />
          </motion.div>
          <motion.div
            className=' w-9 h-9 p-2 bg-red-600 ring ring-red-400 hover:ring-yellow-300 rounded-full flex justify-center items-center shadow cursor-pointer'
            onClick={() => setIsDeleting(true)}
          >
            <TrashIcon className='w-6 h-6 stroke-white' />
          </motion.div>
        </motion.div>
        {isDeleting && (
          <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
            <div className='bg-white rounded-lg p-6 w-[500px] h-[320px] flex flex-col gap-6 justify-center items-center'>
              <div>
                <BellAlertIcon className='w-12 h-12 fill-red-600' />
              </div>
              <div className='font-brown-bold text-xl text-red-600'>
                Are you sure you want to delete?
              </div>
              <div className='font-brown  text-red-600 text-lg'>
                This cannot be undone.
              </div>
              <div className='flex items-center gap-3 w-full justify-center mt-2'>
                <div
                  className='bg-neutral-800 text-white font-brown text-lg px-4 py-2 rounded-lg cursor-pointer'
                  onChange={() => setIsDeleting(false)}
                >
                  Cancel
                </div>
                <div
                  className='bg-red-600 text-white font-brown text-lg px-4 py-2 rounded-lg cursor-pointer'
                  onClick={deleteItemHandler}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        )}

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
                        <div className='flex items-center gap-1 text-green-700 text-sm'>
                          <CheckCircleIcon className='w-5 h-5 fill-green-700' />
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
          className='block relative aspect-square cursor-pointer'
          onClick={() => window.open(`${isLink}`)}
        >
          <Image
            src={isBg}
            fill
            alt={headline}
            className='object-cover'
            draggable={false}
          />
        </motion.div>
        <motion.div
          className={`${background ? 'bg-khaki' : ''} w-full flex ${
            bookmark ? 'justify-between' : 'justify-center'
          } items-start py-4`}
        >
          <motion.div
            className='flex flex-col cursor-pointer'
            onClick={() => window.open(`${slug}`)}
          >
            <motion.div
              className={`font-brown-bold tracking-wide ${text} line-clamp-2`}
            >
              {isHeadline}
            </motion.div>
            <motion.div className={`font-brown text-sm tracking-wide ${text}`}>
              {isSubheadline ? isSubheadline : ''}
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

export default EditableHeyTeachScrollerItem;
