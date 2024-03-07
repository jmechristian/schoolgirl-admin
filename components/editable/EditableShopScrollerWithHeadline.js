import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShopScrollerItem from '../shared/ShopScrollerItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import NewScroller from '../shared/NewScroller';
import { shopifyClient, parseShopifyResponse } from '../../lib/shopify';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableShopScrollerWithHeadline = ({
  headline,
  itemTextStyle,
  background,
  shopID,
  fieldID,
  fieldID2,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [collection, setCollection] = useState(shopID && shopID);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState(undefined);
  const [newCollection, setNewCollection] = useState(shopID);

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('shop')
      .update({
        [fieldID]: isHeadline,
        [fieldID2]: newCollection,
      })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      // Fetch all the products
      const products = await shopifyClient.collection.fetchWithProducts(
        `gid://shopify/Collection/${newCollection}`,
        {
          productsFirst: 10,
        }
      );
      setCollectionProducts(parseShopifyResponse(products.products));
      setCollectionTitle(parseShopifyResponse(products.title));
    };

    // const getAllCollections = async () => {
    //   const allCollections = await shopifyClient.collection
    //     .fetchAll(250)
    //     .then((collection) => setAllCollections(collection));
    // };

    getProducts();
    // getAllCollections();
  }, [newCollection]);

  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
        <div className='flex flex-col items-center max-w-2xl mx-auto'>
          <div className='flex gap-6'>
            <HeadlineMotion>{isHeadline}</HeadlineMotion>
            <div onClick={() => setIsEditing(!isEditing)}>
              <PencilSquareIcon className='w-7 h-7 fill-black mt-2' />
            </div>
          </div>
          {isEditing && (
            <form
              className='grid grid-cols-2 gap-2 items-center w-full'
              onSubmit={(e) => headlineSubmitHandler(e)}
            >
              <TextInput
                type='text'
                id='headline'
                placeholder={'Enter Collection ID'}
                value={newCollection}
                changeHandler={(val) =>
                  setNewCollection(val.toString().trim().replace(/\s+/g, ''))
                }
              />
              <TextInput
                type='text'
                id='collection'
                value={isHeadline}
                placeholder={'Enter Headline'}
                changeHandler={(val) => setIsHeadline(val)}
              />

              <button
                type='submit'
                className={`${
                  isSubmitted ? 'bg-green-700' : 'bg-black'
                } rounded-lg text-white font-medium text-sm p-2 font-brown col-span-2`}
              >
                {isLoading
                  ? 'Sending....'
                  : isSubmitted
                  ? 'Updated!'
                  : 'Update'}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className='flex gap-3 max-w-[1440px] mx-auto px-6 w-full overflow-hidden relative'>
        <NewScroller>
          {collectionProducts &&
            collectionProducts.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.id}
              >
                <ShopScrollerItem
                  image={it.images ? it.images[0].src : ''}
                  alt={
                    it.featuredImage ? it.featuredImage.node.altText : it.alt
                  }
                  headline={it.title ? it.title : it.headline}
                  text={itemTextStyle}
                  subheadline={it.subheadline}
                  background={background}
                  price={it.variants[0].price.amount}
                  slug={it.onlineStoreUrl}
                />
              </motion.div>
            ))}
        </NewScroller>
      </div>
    </div>
  );
};

export default EditableShopScrollerWithHeadline;
