import React, { useState, useMemo } from 'react';
import NewSubnav from '../../components/shared/NewSubnav';
import Image from 'next/image';
import HeadlineMotion from '../../components/shared/HeadlineMotion';
import { FlexGridItem } from '../../components/shared/FlexGridItem';
import { sellers } from '../../data/seller';
import SellerFlexItem from '../../components/shared/SellerFlexItem';
import SellerSubnav from '../../components/shared/SellerSubnav';
import { GridItem } from '../../components/shared/GridItem';
import ScrollerWithHeadline from '../../components/shared/ScrollerWithHeadline';

const Index = () => {
  const [filteredValue, setFilteredValue] = useState('all');
  const [filteredSellers, setFilteredSellers] = useState([]);

  const changeFilter = (val) => {
    setFilteredValue(val);
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
      link: 'https://shopschoolgirlstyle.com/products/fall-collection-uprint',
      headline: 'Fall',
      image:
        'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/08/Fall.jpg',
      background: true,
    },
    {
      link: 'https://shopschoolgirlstyle.com/collections/teacher-lanyards-stylish-teacher-accessories-schoolgirl-style',
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
      link: 'https://shopschoolgirlstyle.com/collections/hey-teach-back-to-school-resources-digital-and-printable',
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
      return sellers;
    } else if (filteredValue === 'curriculum') {
      return sellers.filter((o) => o.category.includes('Curriculum'));
    } else if (filteredValue === 'lifestyle') {
      return sellers.filter((o) => o.category.includes('Lifestyle'));
    }
  }, [filteredValue, sellers]);

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
      <SellerSubnav subNav={[]} changeFilter={changeFilter} />
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light py-16'>
        <HeadlineMotion>Teacher Marketplace</HeadlineMotion>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-16 pb-16'>
        {sellersToShow &&
          sellersToShow.map((it, i) => (
            <div key={i}>
              <SellerFlexItem
                image={it.image}
                alt={it.shopName}
                headline={it.shopName}
                subheadline={it.name}
                link={it.link}
              />
            </div>
          ))}
      </div>
      {/* <div className='w-full flex flex-col items-center gap-8 cursor-pointer'>
        <div className='text-3xl mt-12 md:text-5xl px-6 text-center font-canela text-gray-600 font-light pb-2 mb-2'>
          <HeadlineMotion>Shop the Marketplace</HeadlineMotion>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl px-6 mx-auto gap-9 overflow-hidden mb-24'>
          {items &&
            items.map((it, i) => (
              <div key={i}>
                <GridItem
                  image={it.image}
                  alt={it.headline}
                  headline={it.headline}
                  text='uppercase text-gray-500/80 text-base md:text-lg'
                  link={it.link}
                  background={true}
                />
              </div>
            ))}
        </div>
      </div> */}
      <div className='py-16'>
        <ScrollerWithHeadline
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
