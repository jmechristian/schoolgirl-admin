import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

import SellerFlexItem from '../../components/shared/SellerFlexItem';
import TextInput from '../../components/shared/TextInput';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

import { supabase } from '../../lib/API';

const Page = () => {
  const [isSellers, setIsSellers] = useState([]);
  const [isOrderedSellers, setIsOrderedSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isImage, setIsImage] = useState('');
  const [isName, setIsName] = useState('');
  const [isShopname, setIsShopname] = useState('');
  const [isLink, setIsLink] = useState('');
  const [isDescription, setIsDescription] = useState('');
  const [isCategory, setIsCategory] = useState('');
  const [isSettingOrder, setIsSettingOrder] = useState(false);

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sellers' },
        (payload) => {
          getSellers();
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
      setIsOrderedSellers(sellers);
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
  };

  const updateSellerOrder = async (id, index) => {
    const { data, error } = await supabase
      .from('sellers')
      .update({
        order: index
          .toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
          .toString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
    }
  };

  const setOrderHandler = async () => {
    setIsSettingOrder(true);
    setIsSubmitted(false);
    isOrderedSellers.forEach((seller, index) =>
      updateSellerOrder(seller.id, index)
    );

    setIsSettingOrder(false);
    setIsSubmitted(true);
  };

  return (
    <div className='max-w-7xl mx-auto py-24'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-20 pb-24'>
        {isSellers
          .sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
          })
          .map((it, i) => (
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
      </div>
      <div className='max-w-7xl mx-auto py-20 flex flex-col gap-9'>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id='items'
            boxesPerRow={4}
            rowHeight={50}
            style={{ height: 50 * Math.ceil(isOrderedSellers.length / 4) }}
          >
            {isOrderedSellers &&
              isOrderedSellers.map((seller, i) => (
                <GridItem key={seller.id}>
                  <div className='px-6 py-2 bg-neutral-200 rounded w-fit cursor-grab'>
                    {seller.name}
                  </div>
                </GridItem>
              ))}
          </GridDropZone>
        </GridContextProvider>
        <div className='flex items-center gap-6 mt-10'>
          <div
            className='bg-black text-white items-center flex gap-2 font-brown-bold text-lg px-9 py-4 rounded-lg w-fit cursor-pointer'
            onClick={setOrderHandler}
          >
            <div>{isSettingOrder ? 'Updating...' : 'Set Order'}</div>
            {isSettingOrder && (
              <div>
                <CloudArrowUpIcon className='w-7 h-7 animate-bounce' />
              </div>
            )}
          </div>
          {isSubmitted && (
            <div>
              <CheckCircleIcon className='w-12 h-12 fill-green-600' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
