import React from 'react';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import Hero from '../../components/shared/Hero';
import ThreeColumWithHeadline from '../../components/shared/ThreeColumWithHeadline';

const subNav = [
  {
    name: 'Home',
    link: '#home',
  },
  {
    name: 'Makeovers',
    link: '#makeovers',
  },
  {
    name: 'SGS',
    link: '#sgs',
  },
];

const makeoverItems = [
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050909/SGS/newKids_item1_wfwtfa.webp',
    alt: 'Classroom Makeover: Simply Safari',
    headline: 'Classroom Makeover: Simply Safari',
    subheadline: 'A vibrant space with cheetah spots and zebra stripes!',
    link: 'https://youtu.be/Ow3P-n6sYt8',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050909/SGS/newKids_item2_ovr11r.webp',
    alt: 'Makeover Magic',
    headline: 'Makeover Magic',
    subheadline: 'An in-depth look at all the details that make a space.',
    link: 'https://youtu.be/hNISloRcYEI',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050909/SGS/newKids_item3_rjwjrb.png',
    alt: 'How to Create the Perfect Corner',
    headline: 'How to Create the Perfect Corner',
    subheadline: 'Get inspired with bulletin boards and bold layering!',
    link: 'https://youtu.be/ZAp7iDPz_Pw',
  },
];

const sgsItems = [
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050908/SGS/sgs_item_1_kgqmuu.webp',
    alt: 'Come Roller Skating with the SGS Team',
    headline: 'Come Roller Skating with the SGS Team',
    subheadline: 'Join us for magical moments with the SGS team!',
    link: 'https://youtu.be/Zd9nZaWYhLw',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050909/SGS/sgs_item_2_gubuxo.webp',
    alt: 'New Inspirational Classroom Headlines',
    headline: 'New Inspirational Classroom Headlines',
    subheadline: 'Bringing positivity into your learning space!',
    link: 'https://youtu.be/W5a0cVwxnLA',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050908/SGS/sgs_item_3_xozpes.webp',
    alt: 'Our New Statement Pieces',
    headline: 'Our New Statement Pieces',
    subheadline: 'The WOW factor!',
    link: 'https://youtu.be/s3M55GMvmFMS',
  },
];

const magicItems = [
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679613050/SGS/boho_rainbow_paua9v.webp',
    alt: 'Classroom Makeover: Boho Rainbow',
    headline: 'Classroom Makeover: Boho Rainbow',
    subheadline: 'Timeless rainbows and enchanting hearts.',
    link: 'https://youtu.be/tIh3rrw42vs',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679613051/SGS/close_to_home_nktkwz.webp',
    alt: 'Classroom Makeover: Close to Home',
    headline: 'Classroom Makeover: Close to Home',
    subheadline: 'The delight of the tropics with pops of happiness.',
    link: 'https://youtu.be/TAp-XILsSDQ',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679613050/SGS/beautifully_boho_go0jdn.webp',
    alt: 'Classroom Makeover: Beautifully Boho',
    headline: 'Classroom Makeover: Beautifully Boho',
    subheadline: 'The epitome of beauty, elegance and warmth.',
    link: 'https://www.youtube.com/watch?v=W0dreax2O_I&list=PL1w3zwxT6DyK2Vj9ziQCuDn90bmoe8jG5&index=7',
  },
];

const classroomItems = [
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050908/SGS/classroomcreations_item_1_aekfke.png',
    alt: 'Beach House Vibes',
    headline: 'Beach House Vibes',
    subheadline: 'I can hear the ocean calling me!',
    link: 'https://www.instagram.com/reel/CgkkcChgzo3/?utm_source=ig_web_copy_link',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050908/SGS/classroomcreations_item_2_hpaqhu.png',
    alt: 'Black+White+Neutral=So Dreamy!',
    headline: 'Black+White+Neutral=So Dreamy!',
    subheadline: 'This color combo never goes out of style.',
    link: 'https://www.instagram.com/reel/ChLeagCpIZR/?utm_source=ig_web_copy_link',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1678050908/SGS/classroomcreations_item_3_z94lob.png',
    alt: 'A POP of Pink',
    headline: 'A POP of Pink',
    subheadline: 'A touch of pink to leave you inspired.',
    link: 'https://www.instagram.com/reel/CgnMz0KgRsp/?utm_source=ig_web_copy_link',
  },
];

const Index = () => {
  return (
    <main className='relative' id='home'>
      <InnerPageSubNav subNav={subNav} />
      <Hero
        side='md:bg-gradient-to-r md:from-white/30'
        heading='Watch'
        headline='Classroom Makeover'
        subtext='We celebrate Megan with a new classroom filled with florals, muted pinks, and retro accents, for a space bursting with whimsy'
        buttonText='Watch Now'
        buttonColor='bg-gray-700'
        bg='bg-hero-makeover'
        textSide='left-10'
        textColor='text-gray-700'
        bodyColor='text-gray-700'
        link='https://youtu.be/6Aqu5bC4XEk'
      />
      <div className='flex flex-col pt-16 gap-10 md:gap-16'>
        <ThreeColumWithHeadline
          headline='New Kids on the Block'
          items={makeoverItems}
          itemTextStyle='text-gray-700'
        />
        <div className='flex flex-col gap-16 py-16 bg-khaki'>
          <div id='makeovers' className=' scroll-m-32'>
            <ThreeColumWithHeadline
              headline='Makeover Magic'
              items={magicItems}
              itemTextStyle='text-gray-700'
            />
          </div>
          <div id='sgs' className=' scroll-m-32'>
            <ThreeColumWithHeadline
              headline='Schoolgirl Style Scenes'
              items={sgsItems}
              itemTextStyle='text-gray-700'
            />
          </div>
          <ThreeColumWithHeadline
            headline='Classroom Creations'
            items={classroomItems}
            itemTextStyle='text-gray-700'
          />
        </div>
      </div>
    </main>
  );
};

export default Index;
