import React from 'react';
import HeadlineMotion from './HeadlineMotion';

const InstagramGrid = () => {
  return (
    <div className='w-full px-6 md:px-0 flex flex-col items-center gap-8'>
      {/* <div
        className='text-4xl text-center md:text-left md:text-5xl font-canela text-gray-600 font-light cursor-pointer'
        onClick={() =>
          window.open('https://www.instagram.com/schoolgirlstyle/', '_blank')
        }
      >
        <HeadlineMotion>Join the @schoolgirlstyle Club!</HeadlineMotion>
      </div> */}
      {/* <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl px-6 mx-auto gap-3 md:gap-9 overflow-hidden'>
        <div className='aspect-square bg-slate-500'></div>
        <div className='aspect-square bg-slate-500'></div>
        <div className='aspect-square bg-slate-500'></div>
        <div className='aspect-square bg-slate-500'></div>
      </div> */}
    </div>
  );
};

export default InstagramGrid;
