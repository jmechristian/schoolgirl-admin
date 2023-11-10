import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import HeadlineMotion from '../../components/shared/HeadlineMotion';
import { sellers } from '../../data/seller';
import { createClient } from '@supabase/supabase-js';
import SellerFlexItem from '../../components/shared/SellerFlexItem';
import SellerSubnav from '../../components/shared/SellerSubnav';
import HeyTeachScroller from '../../components/shared/HeyTeachScroller';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Index = ({ pageData, rowData, sellerHeader, heroes, dbsellers }) => {
  const [filteredValue, setFilteredValue] = useState('all');
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setIsSearch] = useState('');

  const changeFilter = (val) => {
    setFilteredValue(val);
  };

  const changeSearch = (val) => {
    setIsSearch(val);
  };

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

  const sellersToShow = useMemo(() => {
    if (filteredValue === 'all') {
      return dbsellers.data
        .sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          }
        })
        .filter(
          (o) =>
            o.name.toLowerCase().includes(search.toLowerCase()) ||
            o.shop_name.toLowerCase().includes(search.toLowerCase()) ||
            o.description.toLowerCase().includes(search.toLowerCase())
        );
    } else if (filteredValue === 'curriculum') {
      return dbsellers.data
        .sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          }
        })
        .filter(
          (o) =>
            (o.category.includes('Curriculum') &&
              o.name.toLowerCase().includes(search.toLowerCase())) ||
            o.shop_name.toLowerCase().includes(search.toLowerCase()) ||
            o.description.toLowerCase().includes(search.toLowerCase())
        );
    } else if (filteredValue === 'lifestyle') {
      return (
        dbsellers.data
          .sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
          })
          .filter(
            (o) =>
              o.category.includes('Lifestyle') &&
              o.name.toLowerCase().includes(search.toLowerCase())
          ) ||
        o.shop_name.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [filteredValue, search, dbsellers]);

  const paginated = () => {};

  useEffect(() => {
    const paginate = () => {
      let pag = [];
      let itemsPerPage = 12;

      for (var i = 0; i < sellersToShow.length; i++) {
        if (
          i >= (currentPage - 1) * itemsPerPage &&
          i < currentPage * itemsPerPage
        ) {
          pag.push(sellersToShow[i]);
        }
      }

      return pag;
    };

    paginate();

    setFilteredSellers(paginate());
  }, [sellersToShow, currentPage]);

  return (
    <div className='flex flex-col'>
      <div className='max-w-7xl mx-auto'>
        <div
          className={`w-full h-auto hidden md:block ${
            heroes.data && heroes.data[0].link && heroes.data[0].link != 'NULL'
              ? 'cursor-pointer'
              : ''
          }`}
          onClick={
            heroes.data && heroes.data[0].link && heroes.data[0].link != 'NULL'
              ? () => window.open(heroes.data[0].link, '_blank')
              : () => {}
          }
        >
          <Image
            width={'1800'}
            height={'800'}
            alt='Hey, Teach! Marketplace'
            src={heroes.data && heroes.data[0].image}
          />
        </div>
        <div className='w-full h-auto md:hidden'>
          <Image
            width={'1200'}
            height={'800'}
            alt='Hey, Teach! Marketplace'
            src={heroes.data && heroes.data[0].mobileImage}
          />
        </div>
      </div>
      <div className='pt-36 pb-24'>
        <HeyTeachScroller
          items={pageData && pageData.data}
          headline={rowData && rowData.data[0].title}
          itemTextStyle={'uppercase text-gray-500/80 text-base md:text-lg'}
          background={true}
        />
      </div>
      <SellerSubnav
        subNav={[]}
        changeFilter={changeFilter}
        changeSearch={changeSearch}
      />

      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light py-16'>
        <HeadlineMotion>
          {sellerHeader && sellerHeader.data[0].text}
        </HeadlineMotion>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-10 lg:gap-y-20 pb-24'>
        {filteredSellers.length > 0 &&
          filteredSellers.map((it, i) => (
            <div key={i} className='h-full w-full'>
              <SellerFlexItem
                image={it.image}
                alt={it.shop_name}
                headline={it.shop_name}
                subheadline={it.name}
                link={it.link}
                subtitle={it.description}
                order={it.order}
              />
            </div>
          ))}
      </div>
      <div className='flex gap-20 items-center justify-center max-w-4xl mx-auto mb-20'>
        <div className='flex justify-center'>
          {currentPage != 1 && (
            <motion.div
              className='flex w-16 h-16 rounded-full cursor-pointer bg-gray-900 shadow-lg backdrop-blur-sm justify-center items-center z-40'
              onClick={() => setCurrentPage(currentPage - 1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ArrowLeftIcon className='w-8 h-8 stroke-white stroke-2' />
            </motion.div>
          )}
        </div>
        <div className='flex justify-center'>
          <motion.div
            className='flex w-16 h-16 rounded-full cursor-pointer bg-gray-900 shadow-lg backdrop-blur-sm justify-center items-center z-40'
            onClick={() => setCurrentPage(currentPage + 1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ArrowRightIcon className='w-8 h-8 stroke-white stroke-2' />
          </motion.div>
        </div>
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

  const sellerHeader = await supabase
    .from('rando_inputs')
    .select('*')
    .eq('id', 1);

  const heroes = await supabase.from('hey_teach_row').select('*').eq('id', 1);

  const dbsellers = await supabase.from('sellers').select('*');

  return {
    props: {
      pageData,
      rowData,
      sellerHeader,
      heroes,
      dbsellers,
    },
  };
}

export default Index;
