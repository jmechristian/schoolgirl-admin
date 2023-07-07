import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import EditableHero from '../../components/editable/EditableHero';
import EditableThreeColumWithHeadline from '../../components/editable/EditableThreeColumWithHeadline';
import EditableInnerPageSubNav from '../../components/editable/EditableInnerPageSubNav';
import Hero from '../../components/shared/Hero';
import { createClient } from '@supabase/supabase-js';
import ThreeColumWithHeadline from '../../components/shared/ThreeColumWithHeadline';
import WatchInnerNav from '../../components/editable/WatchInnerNav';

const Index = ({ pageData, subnav }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  console.log(subnav.data);

  return (
    <main className='relative' id='home'>
      <WatchInnerNav subNav={subnav.data} />
      <EditableHero
        side='md:bg-gradient-to-r md:from-white/30'
        heading={pageData.data[0].hero_main.heading}
        headline={pageData.data[0].hero_main.headline}
        subtext={pageData.data[0].hero_main.subheadline}
        buttonText={pageData.data[0].hero_main.cta_text}
        buttonColor='bg-gray-700'
        bg={pageData.data[0].hero_main.image}
        textSide='left-10'
        textColor='text-gray-700'
        bodyColor='text-gray-700'
        link='https://youtu.be/6Aqu5bC4XEk'
        id={pageData.data[0].hero_main.id}
      />
      <div className='flex flex-col pt-16 gap-10 md:gap-16'>
        <EditableThreeColumWithHeadline
          items={[
            pageData.data[0].headline_one.row_items[0].grid_item,
            pageData.data[0].headline_one.row_items[1].grid_item,
            pageData.data[0].headline_one.row_items[2].grid_item,
          ]}
          id={pageData.data[0].headline_one.id}
          headline={pageData.data[0].headline_one.title}
          itemTextStyle='text-gray-700'
        />
        <div className='flex flex-col gap-16 py-16 bg-khaki'>
          <div id='makeovers' className=' scroll-m-32'>
            <EditableThreeColumWithHeadline
              items={[
                pageData.data[0].headline_two.row_items[0].grid_item,
                pageData.data[0].headline_two.row_items[1].grid_item,
                pageData.data[0].headline_two.row_items[2].grid_item,
              ]}
              headline={pageData.data[0].headline_two.title}
              itemTextStyle='text-gray-700'
              id={pageData.data[0].headline_two.id}
            />
          </div>
          <div id='sgs' className=' scroll-m-32'>
            <EditableThreeColumWithHeadline
              items={[
                pageData.data[0].headline_three.row_items[0].grid_item,
                pageData.data[0].headline_three.row_items[1].grid_item,
                pageData.data[0].headline_three.row_items[2].grid_item,
              ]}
              headline={pageData.data[0].headline_three.title}
              itemTextStyle='text-gray-700'
              id={pageData.data[0].headline_three.id}
            />
          </div>
          <EditableThreeColumWithHeadline
            items={[
              pageData.data[0].headline_four.row_items[0].grid_item,
              pageData.data[0].headline_four.row_items[1].grid_item,
              pageData.data[0].headline_four.row_items[2].grid_item,
            ]}
            headline={pageData.data[0].headline_four.title}
            itemTextStyle='text-gray-700'
            id={pageData.data[0].headline_three.id}
          />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const pageData = await supabase
    .from('watch')
    .select(
      '*, hero_main:watch_hero_main_fkey(*), headline_one(id, title, row_items(grid_item(*))), headline_two(id, title, row_items(grid_item(*))), headline_three(id, title, row_items(grid_item(*))), headline_four(id, title, row_items(grid_item(*)))'
    );

  const subnav = await supabase.from('watch_subnav').select('*');

  return {
    props: {
      pageData,
      subnav,
    },
  };
}

export default Index;
