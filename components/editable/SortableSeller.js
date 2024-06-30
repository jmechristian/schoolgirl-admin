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

const SortableSeller = ({
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
  };

  const deleteItemHandler = async () => {
    const { error } = await supabase.from('sellers').delete().eq('id', id);
    setIsDeleting(false);
  };

  return (
    <div className='w-full max-w-sm mx-auto'>
      <motion.div className='block relative w-full h-full cursor-none aspect-square mb-3'>
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
            className={`font-brown-bold tracking-wide ${text} cursor-grab`}
          >
            {isShopname}
          </motion.div>
          <motion.div className='my-2 text-sm text-neutral-500 hidden'>
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
    </div>
  );
};

export default SortableSeller;
