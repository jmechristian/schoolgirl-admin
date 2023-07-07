import React, { useEffect } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
import { shopifyClient, parseShopifyResponse } from '../../lib/shopify';
import { createClient } from '@supabase/supabase-js';
import Hero from '../../components/shared/Hero';
import FourColGridWithHeading from '../../components/shared/FourColGridWithHeading';
import ShopScrollerWithHeadline from '../../components/shared/ShopScrollerWithHeadline';
import VideoPlayer from '../../components/shared/VideoPlayer';
import HeadlineWithSpan from '../../components/shared/HeadlineWithSpan';
import EmailSubscription from '../../components/shared/EmailSubscription';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';

const subNav = [
  {
    name: 'shop',
    link: '#home',
  },
  {
    name: 'Collections',
    link: '#collections',
  },
  {
    name: 'New Arrivals',
    link: '#new',
  },
  {
    name: 'Furniture',
    link: '#design',
  },
  {
    name: 'Rugs',
    link: '#design',
  },
  {
    name: 'Decor',
    link: '#design',
  },
  {
    name: 'Accessories',
    link: '#design',
  },
  {
    name: 'Storage',
    link: '#design',
  },
  // {
  //   name: 'Sale',
  //   link: '#sale',
  // },
  {
    name: "Mel's Picks",
    link: '#melspicks',
  },
];

const Index = ({ pageData, products, decor, picks, subnav }) => {
  return (
    <main className='pb-16 relative' id='one'>
      <InnerPageSubNav subNav={subNav} />
      <Hero
        side='md:bg-gradient-to-l'
        heading={pageData.data[0].hero_main.heading}
        headline={pageData.data[0].hero_main.headline}
        subtext={pageData.data[0].hero_main.subheadline}
        buttonText={pageData.data[0].hero_main.cta_text}
        buttonColor='bg-gray-900'
        bg={pageData.data[0].hero_main.image}
        textSide='right-10'
        textColor='text-gray-900'
        bodyColor='text-gray-700'
        link={pageData.data[0].hero_main.cta_link}
        theme={pageData.data[0].hero_main.theme}
      />
      <div
        className='flex flex-col pt-16 gap-10 md:gap-16 scroll-mt-24'
        id='two'
      >
        <ShopScrollerWithHeadline
          items={products.products}
          itemTextStyle='text-gray-700'
          headline={pageData.data[0].shop_collection_1_title}
          bookmark={true}
        />
        <div className='scroll-mt-24' id='three'>
          <Hero
            side='md:bg-gradient-to-r'
            heading={pageData.data[0].hero_two.heading}
            headline={pageData.data[0].hero_two.headline}
            subtext={pageData.data[0].hero_two.subheadline}
            buttonText={pageData.data[0].hero_two.cta_text}
            buttonColor='bg-neutral-brown'
            bg={pageData.data[0].hero_two.image}
            textSide='left-10'
            textColor='text-neutral-brown'
            bodyColor='text-gray-700'
            link={pageData.data[0].hero_two.cta_link}
            theme={pageData.data[0].hero_two.theme}
          />
        </div>
        <div className='scroll-mt-24' id='four'>
          <ShopScrollerWithHeadline
            items={decor.products}
            itemTextStyle='uppercase text-gray-700'
            headline={pageData.data[0].shop_collection_2_title}
          />
        </div>
        <div className='scroll-mt-24' id='five'>
          <Hero
            side='md:bg-gradient-to-l'
            heading={pageData.data[0].hero_three.heading}
            headline={pageData.data[0].hero_three.headline}
            subtext={pageData.data[0].hero_three.subheadline}
            buttonText={pageData.data[0].hero_three.cta_text}
            buttonColor='bg-gray-900'
            bg={pageData.data[0].hero_three.image}
            textSide='right-10'
            textColor='text-gray-900'
            bodyColor='text-gray-700'
            link={pageData.data[0].hero_three.cta_link}
            theme={pageData.data[0].hero_three.theme}
          />
        </div>
        <div className='scroll-mt-24' id='six'>
          <FourColGridWithHeading
            items={[
              pageData.data[0].headline_three.row_items[0].grid_item,
              pageData.data[0].headline_three.row_items[1].grid_item,
              pageData.data[0].headline_three.row_items[2].grid_item,
              pageData.data[0].headline_three.row_items[3].grid_item,
            ]}
            headline={pageData.data[0].headline_three.title}
            itemTextStyle='uppercase text-gray-500/80 text-base md:text-lg'
            background={true}
          />
        </div>
        <div className='scroll-mt-24' id='seven'>
          <Hero
            side='md:bg-gradient-to-r'
            heading={pageData.data[0].hero_four.heading}
            headline={pageData.data[0].hero_four.headline}
            subtext={pageData.data[0].hero_four.subheadline}
            buttonText={pageData.data[0].hero_four.cta_text}
            buttonColor='bg-neutral-brown'
            bg={pageData.data[0].hero_four.image}
            textSide='left-10'
            textColor='text-neutral-brown'
            bodyColor='text-gray-700'
            link={pageData.data[0].hero_four.cta_link}
            theme={pageData.data[0].hero_four.theme}
          />
        </div>
        <div className='scroll-mt-24' id='eight'>
          <ShopScrollerWithHeadline
            items={picks.products}
            itemTextStyle='text-gray-700'
            headline={pageData.data[0].shop_collection_3_title}
            bookmark={true}
            price
          />
        </div>
        <div className='flex flex-col scroll-mt-24' id='nine'>
          <VideoPlayer
            placeholder={pageData.data[0].shop_video_placeholder}
            url={pageData.data[0].shop_video}
          />
          <div
            className='bg-gradient-to-b from-khaki space-y-16 scroll-mt-24'
            id='ten'
          >
            <HeadlineWithSpan link='https://shopschoolgirlstyle.com/pages/sgs-lookbook' />
            <EmailSubscription />
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const pageData = await supabase
    .from('shop')
    .select(
      '*, hero_main:shop_hero_main_fkey(*), hero_two:shop_hero_two_fkey(*), hero_three:shop_hero_three_fkey(*), hero_four:shop_hero_four_fkey(*), headline_three(id, title, row_items(grid_item(*)))'
    );

  const safari = 'gid://shopify/Collection/286718034077';
  // Fetch all the products
  const products = await shopifyClient.collection.fetchWithProducts(
    `gid://shopify/Collection/${pageData.data[0].shop_collection_1}`,
    {
      productsFirst: 10,
    }
  );

  // const collectionId = 'gid://shopify/Collection/438218719523';
  // Fetch all the products

  const melspicks = await shopifyClient.collection.fetchWithProducts(
    `gid://shopify/Collection/${pageData.data[0].shop_collection_3}`,
    { productsFirst: 10 }
  );

  // const decor = 'gid://shopify/Collection/433233494307';
  const classDecor = await shopifyClient.collection.fetchWithProducts(
    `gid://shopify/Collection/${pageData.data[0].shop_collection_2}`,
    {
      productsFirst: 10,
    }
  );

  const subnav = await supabase.from('shop_subnav').select('*');

  return {
    props: {
      products: parseShopifyResponse(products),
      picks: parseShopifyResponse(melspicks),
      decor: parseShopifyResponse(classDecor),
      pageData,
      subnav,
    },
  };
}

export default Index;
