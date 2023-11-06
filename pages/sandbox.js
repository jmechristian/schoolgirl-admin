import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

import SellerFlexItem from '../components/shared/SellerFlexItem';
import TextInput from '../components/shared/TextInput';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Page = () => {
  const [isSellers, setIsSellers] = useState([]);
  const [isOrderedSellers, setIsOrderedSellers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isImage, setIsImage] = useState('');
  const [isName, setIsName] = useState('');
  const [isShopname, setIsShopname] = useState('');
  const [isLink, setIsLink] = useState('');
  const [isDescription, setIsDescription] = useState('');
  const [isCategory, setIsCategory] = useState('');
  const [isSettingOrder, setIsSettingOrder] = useState(false);

  useEffect(() => {
    getSellers();
    getOrdered();
  }, []);

  useEffect(() => {
    supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sellers' },
        (payload) => {
          console.log('payload', JSON.stringify(payload));
          getSellers();
          getOrdered();
          console.log('hey', JSON.stringify(payload));
          if (payload.eventType === 'DELETE' && payload.table === 'sellers') {
            setIsOrderedSellers(
              isOrderedSellers.filter((seller) => seller.id != payload.old.id)
            );
            setOrderHandler();
          }
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

  const getOrdered = async () => {
    let { data: seller_order, error } = await supabase
      .from('seller_order')
      .select('*');

    if (!error) {
      setIsOrderedSellers(JSON.parse(seller_order[0].order));
    } else {
      console.log(error);
    }
  };

  const createItemHandler = async () => {
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

  const onChange = (sourceId, sourceIndex, targetIndex) => {
    const nextState = swap(isOrderedSellers, sourceIndex, targetIndex);
    setIsOrderedSellers(nextState);
    console.log(nextState);
  };

  const setOrderHandler = async () => {
    setIsSettingOrder(true);
    const { data, error } = await supabase
      .from('seller_order')
      .update([{ order: JSON.stringify(isOrderedSellers) }])
      .eq('id', 1)
      .select();

    if (!error) {
      setIsSettingOrder(false);
    }
  };

  return (
    <div className='max-w-7xl mx-auto py-24'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-20 pb-24'>
        {isOrderedSellers.map((it, i) => (
          <div key={i} className='h-full w-full'>
            <SellerFlexItem
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
        {/* <div className='w-full h-full min-h-[345px] border-4 border-neutral-300 border-dashed flex justify-center items-center relative'>
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
        </div> */}
      </div>
      <div className='max-w-7xl mx-auto py-24 flex flex-col gap-9'>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id='items'
            boxesPerRow={4}
            rowHeight={50}
            style={{ height: 50 * Math.ceil(isSellers.length / 4) }}
          >
            {isOrderedSellers.map((seller, i) => (
              <GridItem key={seller.id}>
                <div className='px-6 py-2 bg-neutral-200 rounded w-fit cursor-grab'>
                  {seller.name}
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
        <div className='flex items-center gap-6 mt-16'>
          <div
            className='bg-black text-white items-center flex gap-2 font-brown-bold text-lg px-9 py-4 rounded-lg w-fit cursor-pointer'
            onClick={setOrderHandler}
          >
            <div>Set Order</div>
            {isSettingOrder && (
              <div>
                <CloudArrowUpIcon className='w-7 h-7 animate-bounce' />
              </div>
            )}
          </div>
          <div>Make sure to refresh after setting order.</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
