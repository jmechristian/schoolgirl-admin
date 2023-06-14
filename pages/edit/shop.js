import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
import { shopifyClient, parseShopifyResponse } from '../../lib/shopify';
import { createClient } from '@supabase/supabase-js';
import Hero from '../../components/shared/Hero';
import EditableHero from '../../components/editable/EditableHero';
import EditableVideoPlayer from '../../components/editable/EditableVideoPlayer';
import FourColGridWithHeading from '../../components/shared/FourColGridWithHeading';
import EditableFourColGridWithHeading from '../../components/editable/EditableFourColGridWithHeadling';
import ShopScrollerWithHeadline from '../../components/shared/ShopScrollerWithHeadline';
import EditableShopScrollerWithHeadline from '../../components/editable/EditableShopScrollerWithHeadline';
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

const Index = ({ pageData, products, decor, picks }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });
  return (
    <main className='pb-16 relative' id='home'>
      <InnerPageSubNav subNav={subNav} />
      <EditableHero
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
        id={pageData.data[0].hero_main.id}
      />
      <div
        className='flex flex-col pt-16 gap-10 md:gap-16 scroll-mt-24'
        id='collections'
      >
        <EditableShopScrollerWithHeadline
          itemTextStyle='text-gray-700'
          headline={pageData.data[0].shop_collection_1_title}
          shopID={pageData.data[0].shop_collection_1}
          fieldID={'shop_collection_1_title'}
          fieldID2={'shop_collection_1'}
        />
        <div className='scroll-mt-24' id='new'>
          <EditableHero
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
            id={pageData.data[0].hero_two.id}
          />
        </div>
        <EditableShopScrollerWithHeadline
          itemTextStyle='text-gray-700'
          headline={pageData.data[0].shop_collection_2_title}
          shopID={pageData.data[0].shop_collection_2}
          fieldID={'shop_collection_2_title'}
          fieldID2={'shop_collection_2'}
        />
        <div className='scroll-mt-24' id='furniture design'>
          <EditableHero
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
            id={pageData.data[0].hero_three.id}
          />
        </div>
        <div className='scroll-mt-24' id='design'>
          <EditableFourColGridWithHeading
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
        <div className='scroll-mt-24' id='melspicks'>
          <EditableHero
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
            id={pageData.data[0].hero_four.id}
          />
        </div>
        <EditableShopScrollerWithHeadline
          itemTextStyle='text-gray-700'
          headline={pageData.data[0].shop_collection_3_title}
          shopID={pageData.data[0].shop_collection_3}
          fieldID={'shop_collection_3_title'}
          fieldID2={'shop_collection_3'}
        />
        <div className='flex flex-col'>
          <EditableVideoPlayer
            placeholder={pageData.data[0].shop_video_placeholder}
            url={pageData.data[0].shop_video}
            field_one='shop_video_placeholder'
            field_two='shop_video'
            table='shop'
            id={1}
          />
          <div className='bg-gradient-to-b from-khaki space-y-16'>
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

  return {
    props: {
      pageData,
    },
  };
}

export default Index;
