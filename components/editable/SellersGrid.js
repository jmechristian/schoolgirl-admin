import React, { useEffect, useState } from 'react';
import SellerFlexItem from '../shared/SellerFlexItem';
import EditableSellerFlexItem from './EditableSellerFlexItem';
import TextInput from '../shared/TextInput';

import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SellersGrid = () => {
  const [isSellers, setIsSellers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isImage, setIsImage] = useState('');
  const [isName, setIsName] = useState('');
  const [isShopname, setIsShopname] = useState('');
  const [isLink, setIsLink] = useState('');
  const [isDescription, setIsDescription] = useState('');
  const [isCategory, setIsCategory] = useState('');

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sellers' },
        () => {
          getSellers();
        }
      )
      .subscribe();
  });

  const getSellers = async () => {
    let { data: sellers, error } = await supabase.from('sellers').select('*');
    if (!error) {
      setIsSellers(sellers);
    }
  };

  const createItemHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('sellers')
      .insert([
        {
          name: isName,
          shop_name: isShopname,
          description: isDescription,
          link: isLink,
          category: isCategory,
          image: isImage,
        },
      ])
      .select();

    if (!error) {
      setIsCreating(false);
    }
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-20 pb-24'>
        {isSellers &&
          isSellers.length > 0 &&
          isSellers.map((it, i) => (
            <div key={i} className='h-full w-full'>
              <EditableSellerFlexItem
                image={it.image}
                alt={it.shop_name}
                headline={it.shop_name}
                subheadline={it.name}
                link={it.link}
                subtitle={it.description}
                id={it.id}
                category={it.category}
              />
            </div>
          ))}
        <div className='w-full h-full min-h-[345px] border-4 border-neutral-300 border-dashed flex justify-center items-center relative'>
          {isCreating && (
            <motion.div className='absolute z-50 -top-24 -left-6 -right-12 -bottom-12  bg-black/40 backdrop-blur flex justify-center items-center'>
              <motion.div className='bg-white/80 p-3 max-w-5xl w-full h-full flex justify-center items-center'>
                <motion.form
                  className='flex flex-col gap-1 w-full'
                  onSubmit={(event) => createItemHandler(event)}
                >
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
                        onClick={() => setIsCreating(false)}
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
          <div
            className='w-full h-full flex justify-center items-center cursor-pointer'
            onClick={() => setIsCreating(true)}
          >
            <PlusCircleIcon className='w-20 h-20 fill-indigo-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersGrid;
