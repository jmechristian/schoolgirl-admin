import React, { useState, useMemo } from 'react';
import NewSubnav from '../../components/shared/NewSubnav';
import Image from 'next/image';
import HeadlineMotion from '../../components/shared/HeadlineMotion';
import { FlexGridItem } from '../../components/shared/FlexGridItem';
import { sellers } from '../../data/seller';
import SellerFlexItem from '../../components/shared/SellerFlexItem';
import SellerSubnav from '../../components/shared/SellerSubnav';
import { GridItem } from '../../components/shared/GridItem';

const Index = () => {
  const [filteredValue, setFilteredValue] = useState('all');
  const [filteredSellers, setFilteredSellers] = useState([]);

  const changeFilter = (val) => {
    setFilteredValue(val);
  };

  const items = [
    {
      link: 'https://shopschoolgirlstyle.com/pages/hey-teach-teacher-lifestyle-marketplace',
      headline: 'Teacher Life Style',
      image:
        'https://www.schoolgirlstyle.com/_next/image?url=https%3A%2F%2Fschoolgirlstyle.purveu.a2hosted.com%2Fwp-content%2Fuploads%2F2023%2F07%2FIT9A1703-2-2.jpg&w=384&q=75',
      background: true,
    },
    {
      link: 'https://shopschoolgirlstyle.com/collections/hey-teach-drinkware-coasters-coffee-sleeves-glass-cans-koozies-mugs',
      headline: 'Stay Hydrated, Teach!',
      image:
        'https://www.schoolgirlstyle.com/_next/image?url=https%3A%2F%2Fschoolgirlstyle.purveu.a2hosted.com%2Fwp-content%2Fuploads%2F2023%2F07%2FIT9A1943-e1688655598683.jpg&w=384&q=75',
      background: true,
    },
    {
      link: 'https://shopschoolgirlstyle.com/pages/hey-teach-teacher-curriculum-marketplace',
      headline: 'Curriculum',
      image:
        'https://www.schoolgirlstyle.com/_next/image?url=https%3A%2F%2Fschoolgirlstyle.purveu.a2hosted.com%2Fwp-content%2Fuploads%2F2023%2F07%2Fschoolgirlstyle_sugarpop_classroomdecor78.jpg&w=384&q=75',
      background: true,
    },
    {
      link: 'https://shopschoolgirlstyle.com/collections/hey-teach-back-to-school-resources-digital-and-printable',
      headline: 'Back To School',
      image:
        'https://www.schoolgirlstyle.com/_next/image?url=https%3A%2F%2Fschoolgirlstyle.purveu.a2hosted.com%2Fwp-content%2Fuploads%2F2023%2F07%2FIT9A1665-2.jpg&w=384&q=75',
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
        <div className='w-full h-auto'>
          <Image
            width={'1800'}
            height={'800'}
            alt='Hey, Teach! Marketplace'
            src={
              'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/07/Hey-Teach-2023-MM-1800x800-1.jpg'
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
      <div className='w-full flex flex-col items-center gap-8 cursor-pointer'>
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
      </div>
    </div>
  );
};

export default Index;
