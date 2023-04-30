import React from 'react';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import FourColGridWithHeading from '../../components/shared/FourColGridWithHeading';
import VideoPlayer from '../../components/shared/VideoPlayer';
import PolkaTwoRows from '../../components/shared/PolkaTwoRows';
import StoreList from '../../components/shared/StoreList';
import Hero from '../../components/shared/Hero';
import InstagramGrid from '../../components/shared/InstagramGrid';
import EmailSubscription from '../../components/shared/EmailSubscription';

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

const Index = () => {
  return (
    <main className='relative' id='home'>
      <InnerPageSubNav subNav={subNav} />
      <VideoPlayer
        placeholder={
          'https://res.cloudinary.com/designadg/image/upload/q_60/v1678053562/SGS/visit_video_hero_yp0owm.webp'
        }
        url='https://youtu.be/Vbz4xoAEkOY'
      />
      <div className='flex flex-col gap-16'>
        <PolkaTwoRows items={polkaItems} />
        <FourColGridWithHeading
          items={seasonItems}
          headline='Shop Schoolgirl Style'
          itemTextStyle='uppercase text-gray-500/80 text-base md:text-lg'
          background={true}
        />
      </div>
      <div className='scroll-m-8 flex flex-col pt-16' id='store'>
        <StoreList headline='At a Store Near You' />
      </div>
      <div className='scroll-m-8 flex flex-col' id='events'>
        <Hero
          side='md:bg-gradient-to-r'
          heading='Events'
          headline='Field Trip'
          subtext='Don’t miss the bus on all of the fun upcoming events and Schoolgirl Style happenings, plus news on the latest teacher discounts inside our newsletter!'
          buttonText='Stay in the Loop'
          buttonColor='bg-sweet-green'
          bg='bg-visit-events'
          textSide='left-10'
          textColor='text-sweet-green'
          bodyColor='text-gray-600'
          link='https://mailchi.mp/7e9313ff47e7/rollcall'
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

export default Index;
