import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VideoPlayer from '../../components/shared/VideoPlayer';
import VariableHeadlineWithSpan from '../../components/shared/VariableHeadlineWithSpan';
import PolkaTwoRows from '../../components/shared/PolkaTwoRows';
import EditablePolkaTwoRows from '../../components/editable/EditablePolkaTwoRows';
import FullWidthQuote from '../../components/shared/FullWidthQuote';
import Hero from '../../components/shared/Hero';
import EditableHero from '../../components/editable/EditableHero';
import EditableVideoPlayer from '../../components/editable/EditableVideoPlayer';
import FourColStaffGrid from '../../components/shared/FourColStaffGrid';
import EditableFourColStaffGrid from '../../components/editable/EditableFourColStaffGrid';
import InstagramGrid from '../../components/shared/InstagramGrid';
import { createClient } from '@supabase/supabase-js';
import EmailSubscription from '../../components/shared/EmailSubscription';
import { useSelector } from 'react-redux';
import Head from 'next/head';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Page = ({ pageData, staff }) => {
  const polkaItems = [
    {
      heading: pageData.data[0].polka_one_heading,
      headline: pageData.data[0].polka_one_headline,
      body: pageData.data[0].polka_one_subheadline,
      background: pageData.data[0].polka_one_image,
      button: false,
      fields: [
        'polka_one_heading',
        'polka_one_headline',
        'polka_one_subheadline',
        'polka_one_extra',
        'polka_one_link',
        'polka_one_text',
        'polka_one_image',
      ],
    },
    {
      heading: pageData.data[0].polka_two_heading,
      headline: pageData.data[0].polka_two_headline,
      body: pageData.data[0].polka_two_subheadline,
      background: pageData.data[0].polka_two_image,
      button: false,
      fields: [
        'polka_two_heading',
        'polka_two_headline',
        'polka_two_subheadline',
        'polka_two_extra',
        'polka_two_link',
        'polka_two_text',
        'polka_two_image',
      ],
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

  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const [isStaff, setIsStaff] = useState(staff && staff.data);

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  const getStaff = async () => {
    const staff = await supabase.from('staff').select('*');
    setIsStaff(staff.data);
  };

  useEffect(() => {
    const sub = supabase
      .channel('staff-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'staff' },
        (payload) => {
          getStaff();
        }
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  });

  return (
    <>
      <Head>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <main className='relative pb-16' id='home'>
        <EditableVideoPlayer
          placeholder={pageData.data[0].hero_placeholder}
          url={pageData.data[0].hero_link}
          field_one='hero_placeholder'
          field_two='hero_link'
          table='about'
          id={1}
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
        <EditablePolkaTwoRows items={polkaItems} table={'about'} id={1} />
        <FullWidthQuote quote='Teachers are heroes of the world and we love supporting them in their decorating endeavors!' />
        <EditableHero
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
          id={pageData.data[0].hero_one.id}
          theme={pageData.data[0].hero_one.theme}
        />
        <div className='bg-polka-light scroll-mt-24' id='team'>
          <div className='flex flex-col gap-12 max-w-6xl mx-auto py-16'>
            <EditableFourColStaffGrid
              items={isStaff}
              headline='Best In Class'
              itemTextStyle=' text-gray-500/80 text-sm leading-tight'
            />
          </div>
        </div>
        {/* <PerfectPairing headline='Perfect Pairing' /> */}
        <div className='flex flex-col gap-16 pt-20'>
          <InstagramGrid />
          <EmailSubscription />
        </div>
      </main>
    </>
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
