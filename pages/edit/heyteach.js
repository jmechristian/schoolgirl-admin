import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createClient } from '@supabase/supabase-js';

import HeadlineMotion from '../../components/shared/HeadlineMotion';
import EditableScroller from '../../components/editable/EditableScroller';

const items = [
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-classroom-management-resources-digital-and-printable',
    headline: 'Classroom Management',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Classroom-Managemet.png',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-seasonal-products',
    headline: 'Fall',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Fall.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-lanyards',
    headline: 'Lanyards',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Lanyard.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-no-prep',
    headline: 'No-Prep',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/No-Prep-scaled.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-teacher-planners',
    headline: 'Planners',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Planner.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-t-shirts-teacher-apparel-accessories-for-teachers',
    headline: 'Teacher T-Shirts',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Teacher-t-shirts-scaled.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/pages/hey-teach-teacher-lifestyle-marketplace',
    headline: 'Teacher Lifestyle',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Teacher-Lifestyle.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/pages/hey-teach-teacher-curriculum-marketplace',
    headline: 'Curriculum',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Curriculum-scaled.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-jewelry-bracelets-earrings-pins',
    headline: 'Teacher Jewelry',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Teacher-Jewelry.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-stem-curriculum-digital-and-printable-classroom-resources',
    headline: 'STEM',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/STEM.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-science-of-reading-digital-and-printable-resources',
    headline: 'Science of Reading',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Science-of-Reading.jpg',
    background: true,
  },
  {
    link: 'https://shopschoolgirlstyle.com/collections/hey-teach-classroom-organization',
    headline: 'Classroom Organization',
    image:
      'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Classroom-Organization.jpg',
    background: true,
  },
];

const Page = ({ pageData, rowData }) => {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }
  });

  return (
    <div className='flex flex-col'>
      <div className='max-w-7xl mx-auto'>
        <div className='w-full h-auto hidden md:block'>
          <Image
            width={'1800'}
            height={'800'}
            alt='Hey, Teach! Marketplace'
            src={
              'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/07/Hey-Teach-2023-MM-1800x800-1.jpg'
            }
          />
        </div>
        <div className='w-full h-auto md:hidden'>
          <Image
            width={'1200'}
            height={'800'}
            alt='Hey, Teach! Marketplace'
            src={
              'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/07/Hey-Teach-2023-MM-1200x800-1.jpg'
            }
          />
        </div>
      </div>
      <div className='pt-36 pb-24'>
        <EditableScroller
          items={pageData && pageData.data}
          headline={rowData && rowData.data[0].title}
          itemTextStyle={'uppercase text-gray-500/80 text-base md:text-lg'}
          background={true}
          row={'926b329e-07ea-4959-97e7-3e3b002bc667'}
        />
      </div>
      {/* <SellerSubnav
        subNav={[]}
        changeFilter={changeFilter}
        changeSearch={changeSearch}
      /> */}

      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light py-16'>
        <HeadlineMotion>Teacher Marketplace</HeadlineMotion>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const rowID = '926b329e-07ea-4959-97e7-3e3b002bc667';
  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const pageData = await supabase
    .from('row_items')
    .select('grid_item(*)')
    .eq('row_id', rowID);

  const rowData = await supabase.from('site_row').select('*').eq('id', rowID);

  return {
    props: {
      pageData,
      rowData,
    },
  };
}

export default Page;
