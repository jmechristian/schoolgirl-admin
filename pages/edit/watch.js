import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import EditableHero from '../../components/editable/EditableHero';
import EditableThreeColumWithHeadline from '../../components/editable/EditableThreeColumWithHeadline';
import { supabase } from '../../lib/API';
import WatchInnerNav from '../../components/editable/WatchInnerNav';
import { LinkIcon } from '@heroicons/react/24/outline';

const Index = ({ pageData, subnav }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  console.log(pageData);
  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  return (
    <main className='relative' id='one'>
      <WatchInnerNav subNav={subnav.data} />
      <div className='relative w-full'>
        <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
          <div>
            <LinkIcon className='w-6 h-6 text-gray-800' />
          </div>
          <div className='text-lg'>One</div>
        </div>
      </div>
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
        link={pageData.data[0].hero_main.cta_link}
        id={pageData.data[0].hero_main.id}
      />
      <div
        className='flex flex-col pt-16 gap-10 md:gap-16 scroll-mt-24'
        id='two'
      >
        <div className='relative w-full'>
          <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
            <div>
              <LinkIcon className='w-6 h-6 text-gray-800' />
            </div>
            <div className='text-lg'>Two</div>
          </div>
        </div>
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
          <div id='three' className=' scroll-m-32'>
            <div className='relative w-full'>
              <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
                <div>
                  <LinkIcon className='w-6 h-6 text-gray-800' />
                </div>
                <div className='text-lg'>Three</div>
              </div>
            </div>
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
          <div id='four' className=' scroll-m-32'>
            <div className='relative w-full'>
              <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
                <div>
                  <LinkIcon className='w-6 h-6 text-gray-800' />
                </div>
                <div className='text-lg'>Four</div>
              </div>
            </div>
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
          <div className='scroll-mt-24' id='five'>
            <div className='relative w-full'>
              <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
                <div>
                  <LinkIcon className='w-6 h-6 text-gray-800' />
                </div>
                <div className='text-lg'>Five</div>
              </div>
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
      </div>
    </main>
  );
};

export async function getServerSideProps() {
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
