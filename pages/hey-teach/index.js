import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import HeadlineMotion from '../../components/shared/HeadlineMotion';
import { sellers } from '../../data/seller';
import SellerFlexItem from '../../components/shared/SellerFlexItem';
import SellerSubnav from '../../components/shared/SellerSubnav';
import HeyTeachScroller from '../../components/shared/HeyTeachScroller';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Index = () => {
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
      return sellers.filter(
        (o) =>
          o.name.toLowerCase().includes(search.toLowerCase()) ||
          o.shopName.toLowerCase().includes(search.toLowerCase()) ||
          o.subtitle.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filteredValue === 'curriculum') {
      return sellers.filter(
        (o) =>
          (o.category.includes('Curriculum') &&
            o.name.toLowerCase().includes(search.toLowerCase())) ||
          o.shopName.toLowerCase().includes(search.toLowerCase()) ||
          o.subtitle.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filteredValue === 'lifestyle') {
      return (
        sellers.filter(
          (o) =>
            o.category.includes('Lifestyle') &&
            o.name.toLowerCase().includes(search.toLowerCase())
        ) ||
        o.shopName.toLowerCase().includes(search.toLowerCase()) ||
        o.subtitle.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [filteredValue, search]);

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
    console.log(paginate());
    console.log(currentPage);
    setFilteredSellers(paginate());
  }, [sellersToShow, currentPage]);

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
      <SellerSubnav
        subNav={[]}
        changeFilter={changeFilter}
        changeSearch={changeSearch}
      />
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light py-16'>
        <HeadlineMotion>Teacher Marketplace</HeadlineMotion>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-20 pb-24'>
        {filteredSellers.length > 0 &&
          filteredSellers.map((it, i) => (
            <div key={i} className='h-full w-full'>
              <SellerFlexItem
                image={it.image}
                alt={it.shopName}
                headline={it.shopName}
                subheadline={it.name}
                link={it.link}
                subtitle={it.subtitle}
              />
            </div>
          ))}
      </div>
      <div className='flex gap-20 items-center justify-center max-w-4xl mx-auto'>
        <div className='flex justify-center'>
          <motion.div
            className='flex w-16 h-16 rounded-full cursor-pointer bg-gray-900 shadow-lg backdrop-blur-sm justify-center items-center z-40'
            onClick={() => setCurrentPage(currentPage - 1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ArrowLeftIcon className='w-8 h-8 stroke-white stroke-2' />
          </motion.div>
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

      <div className='pt-36 pb-24'>
        <HeyTeachScroller
          items={items}
          headline={'Popularity Contest'}
          itemTextStyle={'uppercase text-gray-500/80 text-base md:text-lg'}
          background={true}
        />
      </div>
    </div>
  );
};

export default Index;
