import React from 'react';
import VideoPlayer from '../../components/shared/VideoPlayer';
import VariableHeadlineWithSpan from '../../components/shared/VariableHeadlineWithSpan';
import PolkaTwoRows from '../../components/shared/PolkaTwoRows';
import FullWidthQuote from '../../components/shared/FullWidthQuote';
import Hero from '../../components/shared/Hero';
import FourColStaffGrid from '../../components/shared/FourColStaffGrid';
import InstagramGrid from '../../components/shared/InstagramGrid';
import EmailSubscription from '../../components/shared/EmailSubscription';

const Page = ({ pageData }) => {
  const polkaItems = [
    {
      heading: 'Founder',
      headline: 'Meet Mel!',
      body: 'Combining her extensive teaching background with her love of fashion, founder Melanie Ralbusky shares her passion and creativity through her beloved Schoolgirl Style brand. With thousands of vibrant designs created to enhance educational spaces, Melanie seeks to inspire a beautiful, warm, and welcoming learning environment that reflects contemporary fashion trends. ',
      background: 'bg-hero-mel',
      button: false,
    },
    {
      heading: 'Chief Operating Officer',
      headline: 'All About Al!',
      body: 'With an impressive background in educational product management for brands such as Amazon and Carson-Dellosa, Schoolgirl Style’s Chief Operating Officer, Al Greco, brings his passion and expertise to the brand’s daily operations. Al’s creativity and vision has helped the Schoolgirl Style brand to grow and thrive, ensuring its classroom décor products reach teachers and students worldwide.',
      background: 'bg-hero-al',
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
        placeholder='https://res.cloudinary.com/designadg/image/upload/v1678820898/SGS/about-video-playholder_t6vwb9.webp'
        url='https://youtu.be/Zd9nZaWYhLw'
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
      <FullWidthQuote quote='Teachers are heroes of the world and we love supporting them in their decorating endeavors!' />
      <Hero
        side='md:bg-gradient-to-r md:from-white/60'
        heading=''
        headline='Dream Team'
        subtext='Schoolgirl Style would be nothing without the hard work and dedication of its entire team. From their brilliant ideas to their beautiful designs, the team’s passion and creativity is the heart of Schoolgirl Style.'
        buttonText=''
        buttonColor=''
        bg='bg-hero-about-dreamteam'
        textSide='left-10'
        textColor='text-neutral-brown'
        bodyColor='text-gray-600'
      />
      <div className='bg-polka-light scroll-mt-24' id='team'>
        <div className='flex flex-col gap-12 max-w-6xl mx-auto py-16'>
          <FourColStaffGrid
            items={seasonItems}
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
  );
};

export default Page;
