import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

import SellerFlexItem from '../components/shared/SellerFlexItem';
import SortableSeller from '../components/editable/SortableSeller';
import TextInput from '../components/shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Page = () => {
  const [isSellers, setIsSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = async () => {
    let { data: sellers, error } = await supabase.from('sellers').select('*');
    if (!error) {
      setIsSellers(sellers);
    }
  };

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    // console.log(
    //   'sourceIndex',
    //   sourceIndex,
    //   'targetIndex',
    //   targetIndex,
    //   'sourceId',
    //   sourceId
    // );
    console.log('seller is' + ' ' + isSellers[sourceIndex].name);
    const nextState = swap(isSellers, sourceIndex, targetIndex);
    setIsSellers(nextState);
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-20 pb-24'>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id='items'
          className='max-w-5xl mx-auto w-full col-span-4'
          boxesPerRow={4}
          rowHeight={340}
          style={{
            height: 340 * Math.ceil(isSellers.length / 4),
          }}
        >
          {isSellers.map((seller, i) => (
            <GridItem
              key={seller.id}
              className='px-3 border border-neutral-300 flex justify-center items-center h-full'
            >
              <div key={i} className='h-full w-full cursor-grab mt-6'>
                <SortableSeller
                  image={seller.image}
                  alt={seller.shop_name}
                  headline={seller.shop_name}
                  subheadline={seller.name}
                  link={seller.link}
                  subtitle={seller.description}
                  id={seller.id}
                  category={seller.category}
                />
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      {/* {isSellers.map((it, i) => (
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
      ))} */}
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
  );
};

export default Page;
