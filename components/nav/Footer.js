import React from 'react';
import FooterNavList from '../shared/FooterNavList';
import Logo from '../shared/Logo';
import QuoteBlock from '../shared/QuoteBlock';
import { SocialIcon } from 'react-social-icons';

const listOne = [
  {
    title: 'shop',
    link: '/shop',
    items: [
      {
        name: 'New Arrivals',
        link: 'https://shopschoolgirlstyle.com/',
      },
      {
        name: 'Furniture',
        link: 'https://shopschoolgirlstyle.com/collections/furniture',
      },
      {
        name: 'Rugs',
        link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-classroom-area-rugs',
      },
      {
        name: 'Decor',
        link: 'https://shopschoolgirlstyle.com/pages/classroom-decor',
      },
      {
        name: 'Accessories',
        link: 'https://shopschoolgirlstyle.com/collections/classroom-accessories',
      },
      {
        name: 'Storage',
        link: 'https://shopschoolgirlstyle.com/pages/classroom-storage',
      },
      {
        name: 'Sale',
        link: 'https://shopschoolgirlstyle.com/collections/sale-items',
      },
      {
        name: "Mel's Picks",
        link: '/shop#melspicks',
      },
    ],
  },
];

const listTwo = [
  {
    title: 'watch',
    link: '/watch',
    items: [
      {
        name: 'Makeovers',
        link: '/watch#makeovers',
      },
      {
        name: 'Behind The Scenes',
        link: '/watch#sgs',
      },
    ],
  },
];

const listThree = [
  {
    title: 'visit',
    link: '/visit',
    items: [
      {
        name: 'Michigan Store',
        link: 'https://shopschoolgirlstyle.com/pages/the-schoolgirl-style-store',
      },
      {
        name: 'Itinerary',
        link: '/visit#store',
      },
      {
        name: 'Events',
        link: '/visit#events',
      },
      {
        name: 'Store Directory',
        link: '/visit#store',
      },
    ],
  },
];

const listFour = [
  {
    title: 'blog',
    link: '/blog',
    items: [
      {
        name: 'Makeovers',
        link: '/blog',
      },
      {
        name: 'Inspiration',
        link: '/blog#inspiration',
      },
    ],
  },
];

const listFive = [
  {
    title: 'Giving Back',
    link: '/giving',
    items: [
      {
        name: 'Makeovers',
        link: '/giving#makeovers',
      },
      {
        name: 'Gift Registry',
        link: '/giving#registry',
      },
      {
        name: 'Scholarships',
        link: '/giving#scholarships',
      },
      {
        name: 'SGS Stylist',
        link: '#/giving',
      },
    ],
  },
];

const listSix = [
  {
    title: 'about',
    link: '/about',
    items: [
      {
        name: 'Founder Melanie',
        link: '/about',
      },
      {
        name: 'SGS Team',
        link: '/about#team',
      },
    ],
  },
];

const listSeven = [
  {
    title: 'help',
    link: '/about',
    items: [
      {
        name: 'Contact Us',
        link: 'https://shopschoolgirlstyle.com/pages/contact',
      },
      {
        name: 'Account',
        link: 'https://shopschoolgirlstyle.com/account/login',
      },
      {
        name: 'Order Status',
        link: 'https://shopschoolgirlstyle.com/account/login',
      },
      {
        name: 'FAQ',
        link: 'https://shopschoolgirlstyle.com/pages/faqs',
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className='relative w-full h-full flex bg-light-grey overflow-hidden'>
      <div className='max-w-7xl mx-auto w-full px-6 py-16 relative'>
        <div
          className='absolute -z-1 left-0 -bottom-40 md:bottom-0 w-[400px] h-[400px] bg-contain bg-no-repeat'
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/designadg/image/upload/v1679260347/SGS/heart_kzo1y8.png')",
          }}
        ></div>
        <div className='flex flex-col gap-12'>
          <div className='grid md:grid-cols-6 overflow-hidden'>
            <div className='col-span-1'>
              <div>
                <FooterNavList links={listOne} />
              </div>
            </div>
            <div className='col-span-1 flex flex-col gap-5 md:justify-between md:gap-0'>
              <div>
                <FooterNavList links={listTwo} />
              </div>
              <div>
                <FooterNavList links={listThree} />
              </div>
            </div>
            <div className='col-span-1 flex flex-col gap-5 md:justify-between md:gap-0'>
              <div>
                <FooterNavList links={listFour} />
              </div>
              <div>
                <FooterNavList links={listFive} />
              </div>
            </div>
            <div className='col-span-1 flex flex-col gap-5 md:justify-between md:gap-0'>
              <div>
                <FooterNavList links={listSix} />
              </div>
              <div>
                <FooterNavList links={listSeven} />
              </div>
            </div>
            <div className='col-span-2 mt-8 md:mt-0'>
              <QuoteBlock />
            </div>
          </div>
          <div className='border border-t-gray-300' />
          <div className='flex flex-col items-center gap-24'>
            <div className='flex flex-col gap-2'>
              <div className='text-gray-500 text-sm uppercase tracking-widest font-brown'>
                Connect with @schoolgirlstyle
              </div>
              <div className='flex gap-2 justify-center'>
                <SocialIcon
                  url='https://www.instagram.com/schoolgirlstyle/'
                  fgColor='#6b7280'
                  bgColor='transparent'
                />
                <SocialIcon
                  url='https://www.facebook.com/schoolgirlstyledecor/'
                  fgColor='#6b7280'
                  bgColor='transparent'
                />
                <SocialIcon
                  url='https://www.pinterest.com/schoolgirlstyle/_shop/'
                  fgColor='#6b7280'
                  bgColor='transparent'
                />
                <SocialIcon
                  url='https://www.youtube.com/channel/UCKe1Rh72xwhUnt49x8Lc37A?view_as=subscriber'
                  fgColor='#6b7280'
                  bgColor='transparent'
                />
              </div>
            </div>
            <div className='w-full flex flex-col items-center gap-5 z-10'>
              <div className=' fill-brand-red stroke-brand-red  max-w-md w-full'>
                <Logo />
              </div>
              <div
                className='text-gray-500 font-brown text-xs cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://shopschoolgirlstyle.com/policies/terms-of-service'
                  )
                }
              >
                © 2023 SCHOOLGIRL STYLE • PRIVACY POLICY • TERMS • ACCESSIBILITY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
