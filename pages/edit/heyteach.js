import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createClient } from '@supabase/supabase-js';
import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';

import HeadlineMotion from '../../components/shared/HeadlineMotion';
import EditableScroller from '../../components/editable/EditableScroller';
import SellersGrid from '../../components/editable/SellersGrid';
import TextInput from '../../components/shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const rowID = '926b329e-07ea-4959-97e7-3e3b002bc667';

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

const Page = ({ pageData, rowData, sellerHeader, heroes }) => {
  const { user } = useSelector((state) => state.auth);
  const [isUpdateItems, setIsUpdatedItems] = useState(undefined);
  const [isHeadlineHover, setIsHeadlineHover] = useState(false);
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSellerHeadline, setIsSellerHeadline] = useState(
    sellerHeader && sellerHeader.data[0].text
  );
  const [isHeroImage, setIsHeroImage] = useState(heroes.data[0].image);
  const [isMobileHeroImage, setIsMobileHeroImage] = useState(
    heroes.data[0].mobileImage
  );
  const [isHeroLink, setIsHeroLink] = useState(heroes && heroes.data[0].link);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
    }

    supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'row_items' },
        () => {
          getAndSetNewSubNav();
        }
      )
      .subscribe();
  });

  const getAndSetNewSubNav = async () => {
    const newItems = await supabase
      .from('row_items')
      .select('grid_item(*)')
      .eq('row_id', rowID);
    setIsUpdatedItems(newItems.data);
  };

  const gridItemSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await supabase
      .from('rando_inputs')
      .update({
        text: isSellerHeadline,
      })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setIsEditingHeadline(false);
    }
    console.log('data', data);
  };

  const heroImageHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { data, error } = await supabase
      .from('hey_teach_row')
      .update({
        image: isHeroImage,
        mobileImage: isMobileHeroImage,
        link: isHeroLink,
      })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='max-w-7xl w-full mx-auto relative'>
        <div
          onClick={() => setIsEditing(!isEditing)}
          className='absolute right-3 top-3 bg-white rounded-full cursor-pointer w-12 shadow h-12 flex items-center justify-center'
        >
          <PencilSquareIcon className='w-7 h-7 fill-black' />
        </div>
        {isEditing ? (
          <div className='w-full h-[600px] bg-neutral-200 justify-center items-center'>
            <form
              className='flex flex-col gap-12 justify-center items-center h-full w-[full] max-w-7xl mx-auto'
              onSubmit={(e) => heroImageHandler(e)}
            >
              <div className='flex flex-col w-full max-w-3xl gap-3'>
                <div className='font-brown-bold text-lg'>Hero Image</div>
                <TextInput
                  type='text'
                  id='image'
                  value={isHeroImage}
                  changeHandler={(val) => setIsHeroImage(val)}
                />
                <div>1800x800 px</div>
              </div>
              <div className='flex flex-col w-full max-w-3xl gap-3'>
                <div className='font-brown-bold text-lg'>Mobile Hero Image</div>
                <TextInput
                  type='text'
                  id='image'
                  value={isHeroImage}
                  changeHandler={(val) => setIsHeroImage(val)}
                />
                <div>1200x800 px</div>
              </div>
              <div className='flex flex-col w-full max-w-3xl gap-3'>
                <div className='font-brown-bold text-lg'>Link</div>
                <TextInput
                  type='text'
                  id='link'
                  value={isHeroLink}
                  changeHandler={(val) => setIsHeroLink(val)}
                />
              </div>
              <button
                type='submit'
                className={`${
                  isSubmitted ? 'bg-green-700' : 'bg-black'
                } rounded-lg text-white font-medium text-sm p-2 font-brown`}
              >
                {isLoading
                  ? 'Sending....'
                  : isSubmitted
                  ? 'Updated!'
                  : 'Update'}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className='w-full h-auto hidden md:block'>
              <Image
                width={'1800'}
                height={'800'}
                alt='Hey, Teach! Marketplace'
                src={isHeroImage}
              />
            </div>
            <div className='w-full h-auto md:hidden'>
              <Image
                width={'1200'}
                height={'800'}
                alt='Hey, Teach! Marketplace'
                src={isMobileHeroImage}
              />
            </div>
          </>
        )}
      </div>
      <div className='pt-36 pb-24'>
        <EditableScroller
          items={isUpdateItems ? isUpdateItems : pageData && pageData.data}
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
      <div
        className=' max-w-5xl w-full mx-auto text-3xl md:text-5xl px-6 mb-12 text-center font-canela text-gray-600 font-light hover:bg-neutral-100 hover:py-2 transition-all ease-in relative'
        onMouseEnter={() => setIsHeadlineHover(true)}
        onMouseLeave={() => setIsHeadlineHover(false)}
      >
        <div
          className={`absolute ${
            isHeadlineHover || isEditingHeadline ? 'flex' : 'hidden'
          } items-center top-1/2 mr-3 -translate-y-1/2 right-0 transition-all ease-in`}
        >
          {isEditingHeadline ? (
            <div onClick={gridItemSubmitHandler}>
              <CloudArrowUpIcon
                className={`w-9 h-9 fill-black cursor-pointer bg-white rounded-full ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              />
            </div>
          ) : (
            <div onClick={() => setIsEditingHeadline(true)}>
              <PencilSquareIcon className='w-7 h-7 fill-black cursor-pointer' />
            </div>
          )}
          <div>
            <CheckCircleIcon
              className={`w-8 h-8 ${
                isSubmitted ? 'fill-green-700' : 'fill-neutral-300'
              } ${isSubmitting ? 'animate-bounce' : ''}`}
            />
          </div>
        </div>
        {isEditingHeadline ? (
          <div>
            <input
              type='text'
              id='newHeadline'
              name='newHeadline'
              placeholder={
                isSellerHeadline ? isSellerHeadline : 'Enter Headline'
              }
              className='placeholder:text-gray-400 p-1.5 w-full max-w-4xl text-center'
              value={isSellerHeadline}
              onChange={(e) => setIsSellerHeadline(e.target.value)}
            />
          </div>
        ) : (
          <HeadlineMotion>{isSellerHeadline}</HeadlineMotion>
        )}
      </div>
      {/* <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light py-16'>
        <HeadlineMotion>{sellerHeader.data[0].text}</HeadlineMotion>
      </div> */}
      <SellersGrid />
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

  return {
    props: {
      pageData,
      rowData,
      sellerHeader,
      heroes,
    },
  };
}

export default Page;
