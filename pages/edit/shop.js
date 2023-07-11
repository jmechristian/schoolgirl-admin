import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createClient } from '@supabase/supabase-js';
import EditableHero from '../../components/editable/EditableHero';
import EditableVideoPlayer from '../../components/editable/EditableVideoPlayer';
import EditableFourColGridWithHeading from '../../components/editable/EditableFourColGridWithHeadling';
import EditableShopScrollerWithHeadline from '../../components/editable/EditableShopScrollerWithHeadline';
import HeadlineWithSpan from '../../components/shared/HeadlineWithSpan';
import EmailSubscription from '../../components/shared/EmailSubscription';
import EditableInnerPageSubNav from '../../components/editable/EditableInnerPageSubNav';
import { LinkIcon } from '@heroicons/react/24/outline';

const subNav = [
  {
    name: 'shop',
    link: '#home',
  },
  {
    name: 'Collections',
    link: '#collections',
  },
  {
    name: 'New Arrivals',
    link: '#new',
  },
  {
    name: 'Furniture',
    link: '#design',
  },
  {
    name: 'Rugs',
    link: '#design',
  },
  {
    name: 'Decor',
    link: '#design',
  },
  {
    name: 'Accessories',
    link: '#design',
  },
  {
    name: 'Storage',
    link: '#design',
  },
  // {
  //   name: 'Sale',
  //   link: '#sale',
  // },
  {
    name: "Mel's Picks",
    link: '#melspicks',
  },
];

const Index = ({ pageData, subnav }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  return (
    <main className='pb-16 relative' id='one'>
      <EditableInnerPageSubNav subNav={subnav.data} />
      <div className='relative w-full'>
        <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
          <div>
            <LinkIcon className='w-6 h-6 text-gray-800' />
          </div>
          <div className='text-lg'>One</div>
        </div>
      </div>
      <EditableHero
        side='md:bg-gradient-to-l'
        heading={pageData.data[0].hero_main.heading}
        headline={pageData.data[0].hero_main.headline}
        subtext={pageData.data[0].hero_main.subheadline}
        buttonText={pageData.data[0].hero_main.cta_text}
        buttonColor='bg-gray-900'
        bg={pageData.data[0].hero_main.image}
        textSide='right-10'
        textColor='text-gray-900'
        bodyColor='text-gray-700'
        link={pageData.data[0].hero_main.cta_link}
        id={pageData.data[0].hero_main.id}
        theme={pageData.data[0].hero_main.theme}
      />
      <div
        className='flex flex-col pt-16 gap-10 md:gap-16 scroll-mt-24'
        id='two'
      >
        <div className='relative w-full'>
          <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
            <div>
              <LinkIcon className='w-5 h-5 text-gray-800' />
            </div>
            <div>Two</div>
          </div>
        </div>
        <EditableShopScrollerWithHeadline
          itemTextStyle='text-gray-700'
          headline={pageData.data[0].shop_collection_1_title}
          shopID={pageData.data[0].shop_collection_1}
          fieldID={'shop_collection_1_title'}
          fieldID2={'shop_collection_1'}
        />
        <div className='scroll-mt-24' id='three'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-5 h-5 text-gray-800 ' />
              </div>
              <div>Three</div>
            </div>
          </div>
          <EditableHero
            side='md:bg-gradient-to-r'
            heading={pageData.data[0].hero_two.heading}
            headline={pageData.data[0].hero_two.headline}
            subtext={pageData.data[0].hero_two.subheadline}
            buttonText={pageData.data[0].hero_two.cta_text}
            buttonColor='bg-neutral-brown'
            bg={pageData.data[0].hero_two.image}
            textSide='left-10'
            textColor='text-neutral-brown'
            bodyColor='text-gray-700'
            link={pageData.data[0].hero_two.cta_link}
            id={pageData.data[0].hero_two.id}
            theme={pageData.data[0].hero_two.theme}
          />
        </div>
        <div className='scroll-mt-24' id='four'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-6 h-6 text-gray-800' />
              </div>
              <div>Four</div>
            </div>
          </div>
          <EditableShopScrollerWithHeadline
            itemTextStyle='text-gray-700'
            headline={pageData.data[0].shop_collection_2_title}
            shopID={pageData.data[0].shop_collection_2}
            fieldID={'shop_collection_2_title'}
            fieldID2={'shop_collection_2'}
          />
        </div>
        <div className='scroll-mt-24' id='five'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-6 h-6 text-gray-800' />
              </div>
              <div>Five</div>
            </div>
          </div>
          <EditableHero
            side='md:bg-gradient-to-l'
            heading={pageData.data[0].hero_three.heading}
            headline={pageData.data[0].hero_three.headline}
            subtext={pageData.data[0].hero_three.subheadline}
            buttonText={pageData.data[0].hero_three.cta_text}
            buttonColor='bg-gray-900'
            bg={pageData.data[0].hero_three.image}
            textSide='right-10'
            textColor='text-gray-900'
            bodyColor='text-gray-700'
            link={pageData.data[0].hero_three.cta_link}
            id={pageData.data[0].hero_three.id}
            theme={pageData.data[0].hero_three.theme}
          />
        </div>
        <div className='scroll-mt-24' id='six'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-6 h-6 text-gray-800' />
              </div>
              <div>Six</div>
            </div>
          </div>
          <EditableFourColGridWithHeading
            items={[
              pageData.data[0].headline_three.row_items[0].grid_item,
              pageData.data[0].headline_three.row_items[1].grid_item,
              pageData.data[0].headline_three.row_items[2].grid_item,
              pageData.data[0].headline_three.row_items[3].grid_item,
            ]}
            headline={pageData.data[0].headline_three.title}
            itemTextStyle='uppercase text-gray-500/80 text-base md:text-lg'
            background={true}
            id={pageData.data[0].headline_three.id}
          />
        </div>
        <div className='scroll-mt-24' id='seven'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-6 h-6 text-gray-800' />
              </div>
              <div>Seven</div>
            </div>
          </div>
          <EditableHero
            side='md:bg-gradient-to-r'
            heading={pageData.data[0].hero_four.heading}
            headline={pageData.data[0].hero_four.headline}
            subtext={pageData.data[0].hero_four.subheadline}
            buttonText={pageData.data[0].hero_four.cta_text}
            buttonColor='bg-neutral-brown'
            bg={pageData.data[0].hero_four.image}
            textSide='left-10'
            textColor='text-neutral-brown'
            bodyColor='text-gray-700'
            link={pageData.data[0].hero_four.cta_link}
            id={pageData.data[0].hero_four.id}
            theme={pageData.data[0].hero_four.theme}
          />
        </div>
        <div className='scroll-mt-24' id='eight'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-6 h-6 text-gray-800' />
              </div>
              <div>Eight</div>
            </div>
          </div>
          <EditableShopScrollerWithHeadline
            itemTextStyle='text-gray-700'
            headline={pageData.data[0].shop_collection_3_title}
            shopID={pageData.data[0].shop_collection_3}
            fieldID={'shop_collection_3_title'}
            fieldID2={'shop_collection_3'}
          />
        </div>
        <div className='flex flex-col' id='nine'>
          <div className='relative w-full'>
            <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
              <div>
                <LinkIcon className='w-6 h-6 text-gray-800' />
              </div>
              <div>Nine</div>
            </div>
          </div>
          <EditableVideoPlayer
            placeholder={pageData.data[0].shop_video_placeholder}
            url={pageData.data[0].shop_video}
            field_one='shop_video_placeholder'
            field_two='shop_video'
            table='shop'
            id={1}
          />
          <div className='bg-gradient-to-b from-khaki space-y-16' id='ten'>
            <div className='relative w-full'>
              <div className='absolute top-0 left-6 z-30 py-4 px-6 shadow-md rounded bg-white/50 backdrop-blur text-gray-800 font-medium text-lg flex gap-1 items-center'>
                <div>
                  <LinkIcon className='w-6 h-6 text-gray-800' />
                </div>
                <div>Ten</div>
              </div>
            </div>
            <HeadlineWithSpan link='https://shopschoolgirlstyle.com/pages/sgs-lookbook' />
            <EmailSubscription />
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const subnav = await supabase.from('shop_subnav').select('*');

  const pageData = await supabase
    .from('shop')
    .select(
      '*, hero_main:shop_hero_main_fkey(*), hero_two:shop_hero_two_fkey(*), hero_three:shop_hero_three_fkey(*), hero_four:shop_hero_four_fkey(*), headline_three(id, title, row_items(grid_item(*)))'
    );

  return {
    props: {
      pageData,
      subnav,
    },
  };
}

export default Index;
