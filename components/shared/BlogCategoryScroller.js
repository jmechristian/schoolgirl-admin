import React, { useRef, useState, useEffect, Fragment } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import { Listbox, Transition } from '@headlessui/react';
import {
  PencilSquareIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/solid';
import ScrollerItem from '../shared/ScrollerItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import NewScroller from '../shared/NewScroller';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';
import { getClassroomInspoPosts } from '../../lib/API';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BlogCategoryScroller = ({
  itemTextStyle,
  headline,
  bookmark,
  background,
  category,
  categories,
  price,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [items, setItems] = useState([]);
  const [isCategory, setIsCategory] = useState(category && category);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(category);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getClassroomInspoPosts(selected && selected);
      setItems(posts.nodes);
    };

    getPosts();
  }, [selected]);

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blog')
      .update({ category_headline: isHeadline, category: selected })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light max-w-3xl mx-auto w-full flex flex-col gap-3'>
        <div className='flex gap-6'>
          <div className='w-full text-center'>{isHeadline}</div>
        </div>
      </div>
      <div className='flex gap-3 mx-auto max-w-[1440px] px-6 sm:px-0 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.title ? it.title : it.headline}
              >
                <ScrollerItem
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

export default BlogCategoryScroller;
