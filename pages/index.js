import { useEffect } from 'react';
import EmailSubscription from '../components/shared/EmailSubscription';
import FourColGridWithHeading from '../components/shared/FourColGridWithHeading';
import Hero from '../components/shared/Hero';
import InstagramGrid from '../components/shared/InstagramGrid';
import ThreeColGridNoHeading from '../components/shared/ThreeColGridNoHeading';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../authSlice';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home({ pageData }) {
  console.log(pageData);
  // const user = useUser();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const collectionItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679700130/SGS/better_together_inspirational_classroom_header_cepm1x.webp',
      alt: 'Better Together Inspirational Classroom Header',
      headline: 'Better Together Header',
      link: 'https://shopschoolgirlstyle.com/collections/boho-rainbow-surprise-makeover/products/schoolgirl-style-simply-stylish-boho-rainbow-better-together-letters-u-print',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679700046/SGS/modern_neutral_rainbow_yrzzlg.webp',
      alt: 'Modern Neutral Rainbow',
      headline: 'Modern Neutral Rainbow',
      link: 'https://shopschoolgirlstyle.com/collections/boho-rainbow-surprise-makeover/products/schoolgirl-style-simply-stylish-boho-rainbow-custom-modern-neutral-rainbow-u-print',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679700046/SGS/listen_learn_love_smcvyd.webp',
      alt: 'Listen, Learn, Love',
      headline: 'Listen, Learn, Love',
      link: 'https://shopschoolgirlstyle.com/collections/boho-rainbow-surprise-makeover/products/simply-inspired-listen-learn-love-poster-uprint',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679700046/SGS/rainbow_door_decor_w4z4gf.webp',
      alt: 'Rainbow Door Decor',
      headline: 'Rainbow Door Decor',
      link: 'https://shopschoolgirlstyle.com/collections/boho-rainbow-surprise-makeover/products/copy-of-schoolgirl-style-black-white-stylish-brights-you-are-awesome-to-the-core-door-decor-bulletin-board-set',
    },
  ];

  const pickItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676249813/SGS/picks_1_fit8ys.webp',
      alt: 'Fringe Labels',
      headline: 'Fringe Labels',
      link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-good-vibes/products/schoolgirl-style-good-vibes-labels-uprint',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676249813/SGS/picks_2_ncpf5j.webp',
      alt: 'Jelly Totes',
      headline: 'Jelly Totes',
      link: 'https://shopschoolgirlstyle.com/collections/large-jelly-totes-1/products/medium-solid-jelly-totes?variant=34788671160477',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676249813/SGS/picks_3_gtua8l.webp',
      alt: 'Paper Lanterns',
      headline: 'Paper Lanterns',
      link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-good-vibes/products/schoolgirl-style-woodland-brown-lantern-pack-of-3',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676249813/SGS/picks_4_ouissh.webp',
      alt: 'Groovy Work',
      headline: 'Groovy Work',
      link: 'https://shopschoolgirlstyle.com/collections/good-vibes-classroom-transformation/products/schoolgirl-style-good-vibes-groovy-work-displays-uprint',
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
      link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-stye-pillows-sale',
    },
    {
      image:
        'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_4_airqen.webp',
      alt: 'Shop DÉCOR',
      headline: 'DÉCOR',
      link: 'https://shopschoolgirlstyle.com/pages/classroom-decor',
    },
  ];

  const makeoverItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1679441941/SGS/Simpy_Safari_Makeover_prbbp6.jpg',
      alt: 'Classroom Makeover: Simply Safari',
      headline: 'Classroom Makeover: Simply Safari',
      subheadline: 'A vibrant space with cheetah spots and zebra stripes!',
      link: 'https://youtu.be/Ow3P-n6sYt8',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676757103/SGS/makeover_2_dsebze.webp',
      alt: 'We’re Bringing the Outlet Store to You',
      headline: 'We’re Bringing the Outlet Store to You',
      subheadline: 'Our biggest sale ever as we welcome a new SGS era!',
      link: 'https://www.instagram.com/reel/CmuwKTaBlSU/?utm_source=ig_web_copy_link',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676757103/SGS/makeover_3_ejia0m.webp',
      alt: 'How to Layer Your Borders',
      headline: 'How to Layer Your Borders',
      subheadline: 'Get inspired with bulletin boards and bold layering!',
      link: 'https://youtu.be/dbCNL-99heE',
    },
  ];

  const styleItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676754208/SGS/style_1_wpizzl.webp',
      alt: 'Bulletin Board Inspiration',
      headline: 'Bulletin Board Inspiration',
      link: 'https://schoolgirlstyle.com/2022/10/17/10-easy-and-inspirational-bulletin-board-ideas/',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676754208/SGS/style_2_gujx4m.webp',
      alt: 'Simply Safari Collection',
      headline: 'Simply Safari Collection',
      link: 'https://schoolgirlstyle.com/2022/09/02/simply-safari-collection/',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676754208/SGS/style_3_ifo7pr.webp',
      alt: 'Lightbulb Moments',
      headline: 'Lightbulb Moments',
      link: 'https://schoolgirlstyle.com/2022/03/15/light-bulb-moments',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1676754208/SGS/style_4_swwdcf.webp',
      alt: 'Classroom Décor Categories',
      headline: 'Classroom Décor Categories',
      link: 'https://schoolgirlstyle.com/2022/07/19/decor-to-your-door-uprint-and-ucut',
    },
  ];

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        dispatch(setUser());
      }
      // console.log('session', session);
    });
  });

  return (
    <div className='flex flex-col gap-12 md:gap-16 pb-16'>
      <Hero
        side='md:bg-gradient-to-l'
        heading={pageData.data[0].hero_main.heading}
        headline={pageData.data[0].hero_main.headline}
        subtext={pageData.data[0].hero_main.subheadline}
        buttonText={pageData.data[0].hero_main.cta_text}
        buttonColor='bg-sweet-green'
        bg={pageData.data[0].hero_main.image}
        textSide='right-10'
        textColor='text-gray-900'
        bodyColor='text-gray-700'
        link={pageData.data[0].hero_main.cta_link}
        theme={pageData.data[0].hero_main.theme}
      />
      <FourColGridWithHeading
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
      <Hero
        side='md:bg-gradient-to-r'
        heading={pageData.data[0].hero_two.heading}
        headline={pageData.data[0].hero_two.headline}
        subtext={pageData.data[0].hero_two.subheadline}
        buttonText={pageData.data[0].hero_two.cta_text}
        buttonColor='bg-gray-900'
        bg={pageData.data[0].hero_two.image}
        textSide='left-10'
        textColor='text-gray-900'
        bodyColor='text-gray-700'
        link={pageData.data[0].hero_two.cta_link}
        theme={pageData.data[0].hero_two.theme}
      />
      <FourColGridWithHeading
        items={[
          pageData.data[0].headline_two.row_items[0].grid_item,
          pageData.data[0].headline_two.row_items[1].grid_item,
          pageData.data[0].headline_two.row_items[2].grid_item,
          pageData.data[0].headline_two.row_items[3].grid_item,
        ]}
        headline={pageData.data[0].headline_two.title}
        itemTextStyle='text-gray-500/80 text-sm'
        background={true}
      />
      <Hero
        side='md:bg-none'
        heading={pageData.data[0].hero_three.heading}
        headline={pageData.data[0].hero_three.headline}
        subtext={pageData.data[0].hero_three.subheadline}
        buttonText={pageData.data[0].hero_three.cta_text}
        buttonColor='bg-white'
        buttonTextColor='text-gray-700'
        bg={pageData.data[0].hero_three.image}
        textSide='right-10'
        textColor='text-gray-700 md:text-white'
        bodyColor='text-gray-700 md:text-white'
        link={pageData.data[0].hero_three.cta_link}
        theme={pageData.data[0].hero_three.theme}
      />
      <FourColGridWithHeading
        items={[
          pageData.data[0].headline_three.row_items[0].grid_item,
          pageData.data[0].headline_three.row_items[1].grid_item,
          pageData.data[0].headline_three.row_items[2].grid_item,
          pageData.data[0].headline_three.row_items[3].grid_item,
        ]}
        headline={pageData.data[0].headline_three.title}
        itemTextStyle='text-gray-500/80 text-sm'
        background={true}
      />
      <Hero
        side='md:bg-gradient-to-r'
        heading={pageData.data[0].hero_four.heading}
        headline={pageData.data[0].hero_four.headline}
        subtext={pageData.data[0].hero_four.subheadline}
        buttonText={pageData.data[0].hero_four.cta_text}
        buttonColor='bg-warm-brown'
        buttonTextColor='text-white'
        bg={pageData.data[0].hero_four.image}
        textSide='left-10'
        textColor='text-warm-brown'
        bodyColor='text-gray-700'
        link={pageData.data[0].hero_four.cta_link}
        theme={pageData.data[0].hero_four.theme}
      />
      <FourColGridWithHeading
        items={[
          pageData.data[0].headline_four.row_items[0].grid_item,
          pageData.data[0].headline_four.row_items[1].grid_item,
          pageData.data[0].headline_four.row_items[2].grid_item,
          pageData.data[0].headline_four.row_items[3].grid_item,
        ]}
        headline={pageData.data[0].headline_four.title}
        itemTextStyle='text-gray-500/80 text-sm'
      />
      <div className='bg-khaki w-full py-16 px-6 flex justify-center'>
        <div className='w-full flex flex-col justify-center items-center px-6 max-w-7xl gap-16'>
          <Hero
            side='md:bg-gradient-to-r md:from-white/30'
            heading={pageData.data[0].watch_hero.heading}
            headline={pageData.data[0].watch_hero.headline}
            subtext={pageData.data[0].watch_hero.subheadline}
            buttonText={pageData.data[0].watch_hero.cta_text}
            buttonColor='bg-gray-700'
            buttonTextColor='text-white'
            bg={pageData.data[0].watch_hero.image}
            textSide='left-0 md:left-10'
            textColor='text-gray-700'
            bodyColor='text-gray-700'
            link='https://youtu.be/6Aqu5bC4XEk'
            theme={pageData.data[0].watch_hero.theme}
          />
          <ThreeColGridNoHeading
            items={[
              pageData.data[0].watch_items.row_items[0].grid_item,
              pageData.data[0].watch_items.row_items[1].grid_item,
              pageData.data[0].watch_items.row_items[2].grid_item,
            ]}
            itemTextStyle='text-gray-700'
          />
        </div>
      </div>
      <InstagramGrid />
      <EmailSubscription />
    </div>
  );
}

export async function getServerSideProps() {
  const pageData = await supabase
    .from('home')
    .select(
      '*, hero_four:home_hero_four_fkey(*), hero_two:home_hero_two_fkey(*), hero_three:home_hero_three_fkey(*), hero_main:home_hero_main_fkey(*), watch_hero:home_watch_hero_fkey(*), headline_one(id, title, row_items(grid_item(*))), headline_two(id, title, row_items(grid_item(*))), headline_three(id, title, row_items(grid_item(*))), headline_four(id, title, row_items(grid_item(*))), watch_items(id, title, row_items(grid_item(*)))'
    );

  return {
    props: {
      pageData,
    },
  };
}
