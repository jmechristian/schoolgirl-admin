import EmailSubscription from '../components/shared/EmailSubscription';
import FourColGridWithHeading from '../components/shared/FourColGridWithHeading';
import Hero from '../components/shared/Hero';
import InstagramGrid from '../components/shared/InstagramGrid';
import ThreeColGridNoHeading from '../components/shared/ThreeColGridNoHeading';
import { shopifyClient, parseShopifyResponse } from '../lib/shopify';

export default function Home() {
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

  return (
    <div className='flex flex-col gap-12 md:gap-16 pb-16'>
      <Hero
        side='md:bg-gradient-to-l'
        heading='Shop'
        headline='Spring Dream'
        subtext='Shop fantastic floral designs, vibrant colors, whimsical patterns, and more inside our seasonal classroom décor!'
        buttonText='Shop The Season'
        buttonColor='bg-sweet-green'
        bg='bg-hero-one'
        textSide='right-10'
        textColor='text-sweet-green'
        bodyColor='text-gray-700'
        link='https://shopschoolgirlstyle.com/collections/glorious-spring-cue-the-sunshine-flowers'
      />
      <FourColGridWithHeading
        items={seasonItems}
        headline='Shop the Season'
        itemTextStyle='uppercase text-gray-500/80 text-base md:text-lg'
        background={true}
      />
      <Hero
        side='md:bg-gradient-to-r'
        heading='Shop'
        headline='Boho Beauty'
        subtext='Transform your classroom into a bohemian fantasy with tasseled pillows, chic polka dots, and pastel rainbows!'
        buttonText="See What's New"
        buttonColor='bg-gray-900'
        bg='bg-hero-two'
        textSide='left-10'
        textColor='text-gray-900'
        bodyColor='text-gray-700'
        link='https://shopschoolgirlstyle.com/collections/boho-rainbow-surprise-makeover'
      />
      <FourColGridWithHeading
        items={collectionItems}
        headline='Shop the Collection'
        itemTextStyle='text-gray-500/80 text-sm'
        background={true}
      />
      <Hero
        side='md:bg-none'
        heading='Shop'
        headingColor='text-gray-700 md:text-white'
        headline="Mel's Picks"
        subtext='From rainbow borders to verdant green décor, Mel’s picks of the week are a true celebration of spring!'
        buttonText='Shop Her Picks'
        buttonColor='bg-white'
        buttonTextColor='text-gray-700'
        bg='bg-hero-three'
        textSide='right-10'
        textColor='text-gray-700 md:text-white'
        bodyColor='text-gray-700 md:text-white'
        link='https://shopschoolgirlstyle.com/collections/mels-picks'
      />
      <FourColGridWithHeading
        items={pickItems}
        headline='Picks of the Week'
        itemTextStyle='text-gray-500/80 text-sm'
        background={true}
      />
      <Hero
        side='md:bg-gradient-to-r'
        heading='Blog'
        headingColor='text-warm-brown'
        headline='Good Vibes'
        subtext='From statement-making murals to retro influences and  pretty pastels, see why this collection brings all the smiles!'
        buttonText='Read All About It'
        buttonColor='bg-warm-brown'
        buttonTextColor='text-white'
        bg='bg-hero-goodvibes'
        textSide='left-10'
        textColor='text-warm-brown'
        bodyColor='text-gray-700'
        link='https://schoolgirlstyle.com/2022/09/08/good-vibes-collection/'
      />
      <FourColGridWithHeading
        items={styleItems}
        headline='Style In Session'
        itemTextStyle='text-gray-500/80 text-sm'
      />
      <div className='bg-khaki w-full py-16 px-6 flex justify-center'>
        <div className='w-full flex flex-col justify-center items-center px-6 max-w-7xl gap-16'>
          <Hero
            side='md:bg-gradient-to-r md:from-white/30'
            heading='Watch'
            headingColor='text-gray-700'
            headline='Classroom Makeover'
            subtext='We celebrate Megan with a 
            new classroom filled with florals, muted pinks, and retro accents, 
            for a space bursting with whimsy!'
            buttonText='Watch Now'
            buttonColor='bg-gray-700'
            buttonTextColor='text-white'
            bg='bg-hero-makeover'
            textSide='left-0 md:left-10'
            textColor='text-gray-700'
            bodyColor='text-gray-700'
            link='https://youtu.be/6Aqu5bC4XEk'
          />
          <ThreeColGridNoHeading
            items={makeoverItems}
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
  // Fetch all the products
  const products = await shopifyClient.product.fetchAll();

  return {
    props: {
      products: parseShopifyResponse(products),
    },
  };
}
