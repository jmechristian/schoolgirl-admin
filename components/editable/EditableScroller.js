import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

import HeadlineMotion from '../shared/HeadlineMotion';
import NewScroller from '../shared/NewScroller';
import HeyTeachScrollerItem from '../shared/HeyTeachScrollerItem';
import EditableHeyTeachScrollerItem from './EditableHeyTeachScrollerItem';

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
        </NewScroller>
      </div>
    </div>
  );
};

export default EditableScroller;
