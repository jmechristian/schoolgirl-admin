import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import FourColGridWithHeading from '../../components/shared/FourColGridWithHeading';
import EditableFourColGridWithHeading from '../../components/editable/EditableFourColGridWithHeadling';
import VideoPlayer from '../../components/shared/VideoPlayer';
import EditableVideoPlayer from '../../components/editable/EditableVideoPlayer';
import EditablePolkaTwoRows from '../../components/editable/EditablePolkaTwoRows';
import StoreList from '../../components/shared/StoreList';
import Hero from '../../components/shared/Hero';
import EditableHero from '../../components/editable/EditableHero';
import InstagramGrid from '../../components/shared/InstagramGrid';
import EmailSubscription from '../../components/shared/EmailSubscription';
import { createClient } from '@supabase/supabase-js';

const subNav = [
  {
    name: 'Top',
    link: '#home',
  },
  {
    name: 'Store',
    link: '#store',
  },
  {
    name: 'Events',
    link: '#events',
  },
];

const polkaItems = [
  {
    heading: 'Store',
    headline: 'Meet Us In Michigan!',
    body: 'Located in Flushing, Michigan, the Schoolgirl Style Store presents beautiful décor designed to inspire teachers and promote creativity in the classroom. From borders to cut-outs, rugs, pillows, desk sets and much more, discover everything needed to enhance the classroom.',
    bodyCallout:
      '115 E. Main St, Flushing, MI 48433 \nClosed for the Season.  Set up re-open on May 1, 2023',
    cta: 'Take A Peek Inside',
    background: 'bg-visit-meet',
    button: true,
    link: 'https://youtu.be/Vbz4xoAEkOY',
  },
  {
    heading: 'Outlet',
    headline: 'A Smarter Way to Shop',
    body: 'Our second store location invites customers to explore Schoolgirl Style behind-the-scenes at our warehouse and teacher outlet. See the Style Crew in action packing orders and take advantage of 50% off store items all day every day.',
    bodyCallout:
      '106 Lynn St, Flushing, MI 48433 \nClosed for the Season.  Set up re-open on May 1, 2023',
    cta: 'Plan Your Trip',
    background: 'bg-visit-outlet',
    button: true,
    link: 'https://shopschoolgirlstyle.com/pages/the-schoolgirl-style-store',
  },
];

const seasonItems = [
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679441699/SGS/Classroom_Rugs_ahc4yq.jpg',
    alt: 'Shop Rugs',
    headline: 'Rugs',
    link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-classroom-area-rugs',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_2_rsktoz.webp',
    alt: 'Shop Borders',
    headline: 'Borders',
    link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-borders',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_3_i4gea7.webp',
    alt: 'Shop Pillows',
    headline: 'Pillows',
    link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-pillows',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_4_airqen.webp',
    alt: 'Shop DÉCOR',
    headline: 'DÉCOR',
    link: 'https://shopschoolgirlstyle.com/pages/classroom-decor',
  },
];

const Index = ({ pageData, locations }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  return (
    <main className='relative' id='home'>
      <InnerPageSubNav subNav={subNav} />
      <EditableVideoPlayer
        placeholder={pageData.data[0].hero_main_placeholder}
        url={pageData.data[0].hero_main_link}
        field_one='hero_main_placeholder'
        field_two='hero_main_link'
        table='visit'
        id={1}
      />
      <div className='flex flex-col gap-16'>
        <EditablePolkaTwoRows
          items={[
            {
              link: pageData.data[0].callout_one_link,
              heading: pageData.data[0].callout_one_heading,
              headline: pageData.data[0].callout_one_headline,
              body: pageData.data[0].callout_one_subheadline,
              bodyCallout: pageData.data[0].callout_one_extra,
              background: pageData.data[0].callout_one_image,
              cta: pageData.data[0].callout_one_text,
              button: true,
              fields: [
                'callout_one_heading',
                'callout_one_headline',
                'callout_one_subheadline',
                'callout_one_extra',
                'callout_one_link',
                'callout_one_text',
                'callout_one_image',
              ],
            },
            {
              link: pageData.data[0].callout_two_link,
              heading: pageData.data[0].callout_two_heading,
              headline: pageData.data[0].callout_two_headline,
              body: pageData.data[0].callout_two_subheadline,
              bodyCallout: pageData.data[0].callout_two_extra,
              background: pageData.data[0].callout_two_image,
              cta: pageData.data[0].callout_two_cta,
              button: true,
              fields: [
                'callout_two_heading',
                'callout_two_headline',
                'callout_two_subheadline',
                'callout_two_extra',
                'callout_two_link',
                'callout_two_cta',
                'callout_two_image',
              ],
            },
          ]}
          table='visit'
          id={1}
        />
        <EditableFourColGridWithHeading
          items={[
            pageData.data[0].headline_one.row_items[0].grid_item,
            pageData.data[0].headline_one.row_items[1].grid_item,
            pageData.data[0].headline_one.row_items[2].grid_item,
            pageData.data[0].headline_one.row_items[3].grid_item,
          ]}
          headline={pageData.data[0].headline_one.title}
          itemTextStyle='uppercase text-gray-500/80 text-base md:text-lg'
          background={true}
        />
      </div>
      <div className='scroll-m-8 flex flex-col pt-16' id='store'>
        <StoreList headline='At a Store Near You' locations={locations.data} />
      </div>
      <div className='scroll-m-8 flex flex-col' id='events'>
        <EditableHero
          side='md:bg-gradient-to-r'
          heading={pageData.data[0].hero_one.heading}
          headline={pageData.data[0].hero_one.headline}
          subtext={pageData.data[0].hero_one.subheadline}
          buttonText={pageData.data[0].hero_one.cta_text}
          buttonColor='bg-sweet-green'
          bg={pageData.data[0].hero_one.image}
          textSide='left-10'
          textColor='text-sweet-green'
          bodyColor='text-gray-600'
          link='https://mailchi.mp/7e9313ff47e7/rollcall'
          id={pageData.data[0].hero_one.id}
          theme={pageData.data[0].hero_one.theme}
        />
        <div className='w-full cursor-pointer h-full bg-gradient-to-r from-sweet-green to-sweet-green/70 font-canela text-white py-12'>
          <div
            className='text-center text-5xl'
            onClick={() =>
              window.open(
                'https://shopschoolgirlstyle.com/pages/the-schoolgirl-style-store',
                '_blank'
              )
            }
          >
            Plan to Visit? Check Our Store Hours!
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-16 py-16'>
        <InstagramGrid />
        <EmailSubscription />
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const pageData = await supabase
    .from('visit')
    .select(
      '*, hero_one:visit_hero_one_fkey(*), headline_one(id, title, row_items(grid_item(*)))'
    );

  const locations = await supabase.from('locations').select('*');

  return {
    props: {
      pageData,
      locations,
    },
  };
}

export default Index;
