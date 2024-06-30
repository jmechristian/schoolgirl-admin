import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import RandomScrollerItem from '../shared/RandomScrollerItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import TextInput from '../shared/TextInput';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

import NewScroller from '../shared/NewScroller';
import EditableScrollerItem from './EditableRandomScrollerItem';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RandomScrollerWithHeadline = ({
  items,
  itemTextStyle,
  headline,
  bookmark,
  background,
  price,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blog')
      .update({ tips_headline: isHeadline })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light max-w-3xl mx-auto w-full flex flex-col gap-3'>
        <div className='flex gap-6'>
          <div className='w-full text-center'>{isHeadline}</div>
          <div onClick={() => setIsEditing(!isEditing)}>
            <PencilSquareIcon className='w-7 h-7 fill-black mt-2' />
          </div>
        </div>
        {isEditing && (
          <form className=' w-full' onSubmit={(e) => headlineSubmitHandler(e)}>
            <TextInput
              type='text'
              id='headline'
              placeholder={'Enter new headline'}
              value={isHeadline}
              changeHandler={(val) => setIsHeadline(val)}
            />

            <button
              type='submit'
              className={`${
                isSubmitted ? 'bg-green-700' : 'bg-black'
              } rounded-lg text-white font-medium text-sm p-2 font-brown col-span-2 w-full`}
            >
              {isLoading ? 'Sending....' : isSubmitted ? 'Updated!' : 'Update'}
            </button>
          </form>
        )}
      </div>
      <div className='flex gap-3 mx-auto max-w-[1440px] px-6 sm:px-0 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.title ? it.title : it.headline}
              >
                <EditableScrollerItem
                  id={it.id}
                  image={
                    it.featuredImage
                      ? it.featuredImage.node.sourceUrl
                      : it.image
                  }
                  alt={
                    it.featuredImage ? it.featuredImage.node.altText : it.alt
                  }
                  headline={it.title ? it.title : it.headline}
                  text={itemTextStyle}
                  subheadline={it.subheadline}
                  background={background}
                  bookmark={bookmark}
                  price={it.price ? it.price : ''}
                  slug={it.slug ? it.slug : '/#'}
                />
              </motion.div>
            ))}
        </NewScroller>
      </div>
    </div>
  );
};

export default RandomScrollerWithHeadline;
