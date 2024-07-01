import React from 'react';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import FourColGridWithHeading from '../../components/shared/FourColGridWithHeading';
import VideoPlayer from '../../components/shared/VideoPlayer';
import PolkaTwoRows from '../../components/shared/PolkaTwoRows';
import StoreList from '../../components/shared/StoreList';
import Hero from '../../components/shared/Hero';
import InstagramGrid from '../../components/shared/InstagramGrid';
import EmailSubscription from '../../components/shared/EmailSubscription';
import { supabase } from '../../lib/API';
import NewSubnav from '../../components/shared/NewSubnav';

const Index = ({ pageData, locations, subnav }) => {
  return (
    <main className='relative' id='one'>
      <NewSubnav subNav={subnav.data} />
      <VideoPlayer
        placeholder={pageData.data[0].hero_main_placeholder}
        url={pageData.data[0].hero_main_link}
      />
      <div className='flex flex-col gap-16 scroll-mt-16' id='two'>
        <PolkaTwoRows
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
            },
          ]}
        />
        <div className='scroll-mt-16' id='three'>
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
        </div>
      </div>
      <div className='scroll-m-8 flex flex-col pt-16' id='four'>
        <StoreList
          headline={pageData.data[0].stores_headline}
          locations={locations.data}
        />
      </div>
      <div className='scroll-m-8 flex flex-col' id='five'>
        <Hero
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
          theme={pageData.data[0].hero_one.theme}
        />
        <div
          className='scroll-mt-16 w-full cursor-pointer h-full bg-gradient-to-r from-sweet-green to-sweet-green/70 font-canela text-white py-12'
          id='six'
        >
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
  const pageData = await supabase
    .from('visit')
    .select(
      '*, hero_one:visit_hero_one_fkey(*), headline_one(id, title, row_items(grid_item(*)))'
    );

  const locations = await supabase.from('locations').select('*');

  const subnav = await supabase.from('visit_subnav').select('*');

  return {
    props: {
      pageData,
      locations,
      subnav,
    },
  };
}

export default Index;
