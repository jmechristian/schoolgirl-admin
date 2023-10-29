import React, { useRef, useState } from 'react';
import Image from 'next/image';
import TextInput from '../shared/TextInput';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BookmarkIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, BellAlertIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableSellerFlexItem = ({
  category,
  image,
  alt,
  headline,
  text,
  background,
  subheadline,
  link,
  subtitle,
  id,
}) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isName, setIsName] = useState(subheadline && subheadline);
  const [isShopname, setIsShopname] = useState(headline && headline);
  const [isDescription, setIsDescription] = useState(subtitle && subtitle);
  const [isImage, setIsImage] = useState(image && image);
  const [isLink, setIsLink] = useState(link && link);
  const [isCategory, setIsCategory] = useState(category && category);

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

  const goElsewhere = () => {
    window.open(isLink, '_blank');
  };

  const gridItemSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('sellers')
      .update({
        name: isName,
        shop_name: isShopname,
        description: isDescription,
        category: isCategory,
        image: isImage,
        link: isLink,
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
    const { error } = await supabase.from('sellers').delete().eq('id', id);
    setIsDeleting(false);
  };

  return (
    <AnimatePresence className='w-full h-full'>
      <motion.div
        className='w-full h-full py-3 flex flex-col relative'
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        ref={itemRef}
      >
        {isDeleting && (
          <div className='fixed inset-0 bg-black/50 z-[100] flex items-center justify-center'>
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
                  onClick={() => setIsDeleting(false)}
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
          <motion.div className='absolute z-50 -top-24 -left-6 -right-6 -bottom-6  bg-black/40 backdrop-blur flex justify-center items-center'>
            <motion.div className='bg-white/80 p-3 max-w-5xl w-full h-full flex justify-center items-center'>
              <motion.form className='flex flex-col gap-1 w-full'>
                <motion.div className='grid grid-cols-1 gap-1'>
                  <TextInput
                    type='text'
                    name='image'
                    id='image'
                    placeholder='new image...'
                    value={isImage}
                    changeHandler={(val) => setIsImage(val)}
                  />
                  <TextInput
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name...'
                    value={isName}
                    changeHandler={(val) => setIsName(val)}
                  />
                  <TextInput
                    type='text'
                    name='shopname'
                    id='shopname'
                    placeholder='Shop Name...'
                    value={isShopname}
                    changeHandler={(val) => setIsShopname(val)}
                  />
                  <TextInput
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Description...'
                    value={isDescription}
                    changeHandler={(val) => setIsDescription(val)}
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
                    name='category'
                    id='category'
                    placeholder='Lifestyle, Curriculum...'
                    value={isCategory}
                    changeHandler={(val) => setIsCategory(val)}
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
                      <motion.div
                        className='text-white font-bold'
                        onClick={(event) => gridItemSubmitHandler(event)}
                      >
                        {isLoading ? 'Sending...' : 'Create'}
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
        <motion.div className='absolute z-10 right-0 top-0 flex gap-2'>
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
        <motion.div
          className='block relative w-full h-full cursor-pointer aspect-square mb-3'
          onClick={goElsewhere}
        >
          <Image src={image} fill alt={alt} className='object-contain' />
        </motion.div>
        <motion.div
          className={`${background} w-full flex justify-center items-start py-3 h-16`}
        >
          <motion.div className='flex flex-col text-center'>
            <motion.div
              className={`font-brown text-sm tracking-wide ${text} uppercase text-xs`}
            >
              {isName}
            </motion.div>
            <motion.div
              className={`font-brown-bold tracking-wide ${text} cursor-pointer`}
              onClick={goElsewhere}
            >
              {isShopname}
            </motion.div>
            <motion.div className='my-2 text-sm text-neutral-500'>
              {isDescription}
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

export default EditableSellerFlexItem;
