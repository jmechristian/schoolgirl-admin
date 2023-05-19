import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import VideoPlayer from '../../components/shared/VideoPlayer';
import EditableVideoPlayer from '../../components/editable/EditableVideoPlayer';
import VariableHeadlineWithSpan from '../../components/shared/VariableHeadlineWithSpan';
import Hero from '../../components/shared/Hero';
import FourColGridWithHeading from '../../components/shared/FourColGridWithHeading';
import FullWidthQuote from '../../components/shared/FullWidthQuote';
import EmailSubscription from '../../components/shared/EmailSubscription';
import { createClient } from '@supabase/supabase-js';

const Page = ({ pageData }) => {
  const subNav = [
    {
      name: 'Top',
      link: '#home',
    },
    {
      name: 'Makeovers',
      link: '#makeovers',
    },
    {
      name: 'Registry',
      link: '#registry',
    },
    {
      name: 'Scholarships',
      link: '#scholarships',
    },
  ];

  const seasonItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1678663840/SGS/mels_spring_1_opiwvo.webp',
      alt: 'Inspirational Posters',
      headline: 'Inspirational Posters',
      link: 'https://shopschoolgirlstyle.com/collections/beautifully-boho-classroom-makeover/products/fresh-start-poster',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1678663840/SGS/mels_spring_2_jatbuq.webp',
      alt: 'Stay Organized',
      headline: 'Stay Organized',
      link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-desk-sets/products/simply-stylish-file-folders',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1678663840/SGS/mels_spring_3_j1a0mc.webp',
      alt: 'Home Sweet Classroom',
      headline: 'Home Sweet Classroom',
      link: 'https://shopschoolgirlstyle.com/collections/simply-boho/products/schoolgirl-style-simply-boho-home-sweet-classroom-door-decor-bulletin-board-set-uprint',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1678663840/SGS/mels_spring_4_ytnfkq.webp',
      alt: 'Fresh Planner. Clean Slate.',
      headline: 'Fresh Planner. Clean Slate.',
      link: 'https://shopschoolgirlstyle.com/collections/simply-boho/products/copy-of-schoolgirl-style-simply-boho-planner-and-organizer',
    },
  ];

  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  return (
    <main className='relative pb-16' id='home'>
      {/* <InnerPageSubNav subNav={subNav} /> */}
      <EditableVideoPlayer
        placeholder={pageData.data[0].video_hero_placeholder}
        url={pageData.data[0].video_hero_link}
      />
      <div
        className='bg-gradient-to-b from-khaki space-y-16 pt-6 scroll-mt-24'
        id='makeovers'
      >
        <VariableHeadlineWithSpan
          pre='Ready To'
          spanText='Transform'
          post='Your Classroom?'
          subtext='Enter for your chance to win!'
          buttonText='Share Your Story - Enter Here!'
          buttonLink='https://schoolgirlstylemakeover.wufoo.com/forms/z1tea82s13o1uwu/'
        />
      </div>
      <div className='flex flex-col gap-16 scroll-mt-24' id='registry'>
        {/* <Hero
          side='md:bg-gradient-to-r md:from-white/60'
          heading='Registry'
          headline='Gift List'
          subtext='Sign up with SGS today and get started on your gift registry to store all your favorite classroom décor in one place!'
          buttonText='Get Started'
          buttonColor='bg-gray-700'
          bg='bg-hero-giving'
          textSide='left-10'
          textColor='text-gray-700'
          bodyColor='text-gray-700'
        /> */}
        {/* <FourColGridWithHeading
          items={seasonItems}
          headline="Mel's Spring Selections"
          itemTextStyle='text-gray-500/80 text-base md:text-lg md:leading-tight'
          background={true}
        /> */}
        {/* <div className='flex flex-col scroll-mt-24' id='scholarships'>
          <Hero
            side='md:bg-gradient-to-l md:from-white/60'
            heading='Scholarship'
            headline='Shining Stars'
            subtext='We believe every teacher deserves the opportunity to truly shine. Explore our SGS scholarships to learn more!'
            buttonText='Get Started'
            buttonColor='bg-gray-900'
            bg='bg-hero-giving-scholarship'
            textSide='right-10'
            textColor='text-gray-900'
            bodyColor='text-gray-700'
            link='mailto:customerservice@schoolgirlstyle.com'
          />
          <FullWidthQuote quote='We aim to help teachers create classrooms that are bright spots in their everyday lives.' />
          <Hero
            side='md:bg-gradient-to-r md:from-white/60'
            heading='Stylist'
            headline='Style Session'
            subtext='Not sure where to start with your classroom transformation? Connect with a SGS Stylist today to inspire your journey!'
            buttonText="Let's Connect"
            buttonColor='bg-gray-900'
            bg='bg-hero-giving-stylist'
            textSide='left-10'
            textColor='text-gray-900'
            bodyColor='text-gray-700'
          />
        </div> */}
        <EmailSubscription />
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const pageData = await supabase.from('giving').select('*');

  return {
    props: {
      pageData,
    },
  };
}

export default Page;
