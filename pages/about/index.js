import React from 'react';
import VideoPlayer from '../../components/shared/VideoPlayer';
import VariableHeadlineWithSpan from '../../components/shared/VariableHeadlineWithSpan';
import PolkaTwoRows from '../../components/shared/PolkaTwoRows';
import FullWidthQuote from '../../components/shared/FullWidthQuote';
import Hero from '../../components/shared/Hero';
import FourColStaffGrid from '../../components/shared/FourColStaffGrid';
import InstagramGrid from '../../components/shared/InstagramGrid';
import { createClient } from '@supabase/supabase-js';
import EmailSubscription from '../../components/shared/EmailSubscription';

const Page = ({ pageData, staff }) => {
  const polkaItems = [
    {
      heading: pageData.data[0].polka_one_heading,
      headline: pageData.data[0].polka_one_headline,
      body: pageData.data[0].polka_one_subheadline,
      background: pageData.data[0].polka_one_image,
      button: false,
    },
    {
      heading: pageData.data[0].polka_two_heading,
      headline: pageData.data[0].polka_two_headline,
      body: pageData.data[0].polka_two_subheadline,
      background: pageData.data[0].polka_two_image,
      button: false,
    },
  ];

  const seasonItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about_elisa_tgeohm.webp',
      alt: '‘Eye for Design’ E’Lisa Director of Marketing',
      headline: '‘Eye for Design’ E’Lisa ',
      job: 'Director of Marketing',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about_raissa_oeapsg.webp',
      alt: '‘Running the Show’ Raissa Product Merchant',
      headline: '‘Running the Show’ Raissa ',
      job: 'Product Merchant',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_jessica_r6a31j.webp',
      alt: '‘Jack of all Trades’ Jessica Customer Care Lead',
      headline: '‘Jack of all Trades’ Jessica',
      job: 'Customer Care Lead',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_christy_zom5d6.webp',
      alt: '‘Cream of the Crop’ Christy Art Director',
      headline: '‘Cream of the Crop’ Christy',
      job: 'Art Director',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_natalie_awesvm.webp',
      alt: '`Connoisseur of Pantone` Natalie',
      headline: '‘Connoisseur of Pantone’ Natalie',
      job: 'Graphic Designer',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_emilyB_lnhkdv.webp',
      alt: 'Emily Schoolgirl Stylist',
      headline: '‘Retail Jedi’ Emily',
      job: 'Schoolgirl Stylist',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_chad_pgqekk.webp',
      alt: 'Chad Design Assistant',
      headline: '‘Champion of Office Happiness’ Chad',
      job: 'Design Assistant',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_emily_ohvtnv.webp',
      alt: 'Emily Creative Director',
      headline: '‘Operations Ninja’ Emily',
      job: 'Creative Director',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679258440/SGS/about_kelly_agmt0x.webp',
      alt: 'Kelly Schoolgirl Stylist',
      headline: '‘Creator of Joy’ Kelly',
      job: 'Schoolgirl Stylist',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679689169/SGS/about_mary_z39jat.webp',
      alt: '‘Master of her Craft Mary’',
      headline: '‘Master of her Craft Mary’',
      job: 'Graphic Designer',
    },
  ];

  return (
    <main className='relative pb-16' id='home'>
      <VideoPlayer
        placeholder={pageData.data[0].hero_placeholder}
        url={pageData.data[0].hero_link}
      />
      <div className='bg-gradient-to-b from-khaki space-y-16 pt-6'>
        <VariableHeadlineWithSpan
          pre='Inspiring'
          spanText='Creativity'
          post='in the Classroom'
          subtext={[
            'Founded in 2011 by Melanie Ralbusky, the Schoolgirl Style brand has since become synonymous with trend-setting classroom décor. Infusing an element of fashion in every design, Schoolgirl Style invites teachers and students alike to tap into their creativity and enjoy the fun of learning.',
            'Now in over 10,000 stores, Schoolgirl Style™ is widely recognized as the most innovative and influential source for classroom resources, having built a loyal community of over 400,000 followers on social media with tens of millions of views. Schoolgirl Style™ delivers creative design solutions that celebrate the classroom as a fun and functional atmosphere where children can thrive.',
          ]}
          buttonText='Melanie'
        />
      </div>
      <PolkaTwoRows items={polkaItems} />
      <FullWidthQuote
        quote={pageData.data[0].blog_quote}
        author={pageData.data[0].quote_author}
      />
      <Hero
        side='md:bg-gradient-to-r md:from-white/60'
        heading={pageData.data[0].hero_one.heading}
        headline={pageData.data[0].hero_one.headline}
        subtext={pageData.data[0].hero_one.subheadline}
        buttonText={pageData.data[0].hero_one.cta_text}
        buttonColor=''
        bg={pageData.data[0].hero_one.image}
        textSide='left-10'
        textColor='text-neutral-brown'
        bodyColor='text-gray-600'
        link={pageData.data[0].hero_one.cta_link}
        theme={pageData.data[0].hero_one.theme}
      />
      <div className='bg-polka-light scroll-mt-24' id='team'>
        <div className='flex flex-col gap-12 max-w-6xl mx-auto py-16'>
          <FourColStaffGrid
            items={staff.data}
            headline='Best In Class'
            itemTextStyle='text-gray-500/80 text-sm leading-tight'
          />
        </div>
      </div>
      {/* <PerfectPairing headline='Perfect Pairing' /> */}
      <div className='flex flex-col gap-16 pt-20'>
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
    .from('about')
    .select('*, hero_one:about_hero_one_fkey(*)');

  const staff = await supabase.from('staff').select('*');

  return {
    props: {
      pageData,
      staff,
    },
  };
}

export default Page;
