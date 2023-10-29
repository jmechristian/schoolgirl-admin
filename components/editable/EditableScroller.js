import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';

import HeadlineMotion from '../shared/HeadlineMotion';
import NewScroller from '../shared/NewScroller';
import HeyTeachScrollerItem from '../shared/HeyTeachScrollerItem';
import EditableHeyTeachScrollerItem from './EditableHeyTeachScrollerItem';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableScroller = ({
  items,
  headline,
  itemTextStyle,
  background,
  bookmark,
  row,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline ? headline : '');
  const [isHeadlineHover, setIsHeadlineHover] = useState(false);
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isItemSubmitted, setItemSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isItemBg, setIsItemBg] = useState('');
  const [isItemLink, setIsItemLink] = useState('');
  const [isItemHeadline, setIsItemHeadline] = useState('');
  const [isItemSubheadline, setIsItemSubheadline] = useState('');

  const gridItemSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await supabase
      .from('site_row')
      .update({
        title: isHeadline,
      })
      .eq('id', row)
      .select();

    if (!error) {
      setIsSubmitting(false);
      setIsSubmited(true);
      setIsEditingHeadline(false);
    }
    console.log('data', data);
  };

  const newItemHandler = async () => {};

  const submitNewHeadlineHandler = () => {
    setIsEditingHeadline(false);
    setIsSubmited(true);
  };

  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div
        className=' max-w-5xl w-full mx-auto text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light hover:bg-neutral-100 hover:py-2 transition-all ease-in relative'
        onMouseEnter={() => setIsHeadlineHover(true)}
        onMouseLeave={() => setIsHeadlineHover(false)}
      >
        <div
          className={`absolute ${
            isHeadlineHover || isEditingHeadline ? 'flex' : 'hidden'
          } items-center top-1/2 mr-3 -translate-y-1/2 right-0 transition-all ease-in`}
        >
          {isEditingHeadline ? (
            <div onClick={gridItemSubmitHandler}>
              <CloudArrowUpIcon
                className={`w-9 h-9 fill-black cursor-pointer bg-white rounded-full ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              />
            </div>
          ) : (
            <div onClick={() => setIsEditingHeadline(true)}>
              <PencilSquareIcon className='w-7 h-7 fill-black cursor-pointer' />
            </div>
          )}
          <div>
            <CheckCircleIcon
              className={`w-8 h-8 ${
                isSubmited ? 'fill-green-700' : 'fill-neutral-300'
              } ${isSubmitting ? 'animate-bounce' : ''}`}
            />
          </div>
        </div>
        {isEditingHeadline ? (
          <div>
            <input
              type='text'
              id='newHeadline'
              name='newHeadline'
              placeholder={headline ? headline : 'Enter Headline'}
              className='placeholder:text-gray-400 p-1.5 w-full max-w-4xl text-center'
              value={isHeadline}
              onChange={(e) => setIsHeadline(e.target.value)}
            />
          </div>
        ) : (
          <HeadlineMotion>{isHeadline}</HeadlineMotion>
        )}
      </div>
      <div className='flex gap-3 max-w-[1440px] mx-auto px-6 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={i}
              >
                <EditableHeyTeachScrollerItem
                  image={it.grid_item.image}
                  headline={
                    it.grid_item.title
                      ? it.grid_item.title
                      : it.grid_item.headline
                  }
                  text={itemTextStyle}
                  subheadline={it.grid_item.subheadline}
                  background={background}
                  slug={it.grid_item.link}
                  id={it.grid_item.id}
                  rowId={row}
                />
              </motion.div>
            ))}
          {/* <motion.div className='flex items-center justify-center border-4 border-neutral-400 border-dashed w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'>
            {isEditing ? (
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
                        value={isItemBg}
                        changeHandler={(val) => setIsItemBg(val)}
                      />
                      <TextInput
                        type='text'
                        name='headline'
                        id='headline'
                        placeholder='if headline...'
                        value={isItemHeadline}
                        changeHandler={(val) => setIsItemHeadline(val)}
                      />
                      <TextInput
                        type='text'
                        name='link'
                        id='link'
                        placeholder='new link...'
                        value={isItemLink}
                        changeHandler={(val) => setIsItemLink(val)}
                      />
                      <TextInput
                        type='text'
                        name='subheadline'
                        id='subheadline'
                        placeholder='if subheadline...'
                        value={isItemSubheadline}
                        changeHandler={(val) => setIsItemSubheadline(val)}
                      />
                    </motion.div>
                    <motion.div className='flex justify-between items-center w-full'>
                      <motion.div className='flex justify-end items-center mt-4 gap-4'>
                        <motion.div className='font-medium text-green-700 text-lg'>
                          {isItemSubmitted && (
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
                            {isItemSubmitted ? 'Close' : 'Cancel'}
                          </motion.div>
                        </motion.div>
                        <motion.button
                          className='bg-black rounded-lg px-4 py-2'
                          type='submit'
                        >
                          <motion.div className='text-white font-bold'>
                            {isLoading ? 'Sending...' : 'Create'}
                          </motion.div>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </motion.div>
              </motion.div>
            ) : (
              <div onClick={() => setIsEditing(true)}>
                <PlusCircleIcon className='w-16 h-16 fill-indigo-600 shadow rounded-full cursor-pointer' />
              </div>
            )}
          </motion.div> */}
        </NewScroller>
      </div>
    </div>
  );
};

export default EditableScroller;
