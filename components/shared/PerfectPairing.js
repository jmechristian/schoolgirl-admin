import React from 'react';
import HeadlineMotion from './HeadlineMotion';

export const DummyBlock = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-brown text-gray-700 font-medium text-lg'>
        Brand Name
      </div>
      <div className='text-gray-500 font-brown'>Brief Info</div>
    </div>
  );
};

const PerfectPairing = ({ headline, locations }) => {
  return (
    <div className='bg-light-grey w-full h-full py-24'>
      <div className='max-w-6xl px-6 lg:px-0 flex flex-col gap-16 mx-auto'>
        <div>
          <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
            <HeadlineMotion>{headline}</HeadlineMotion>
          </div>
          <div className='max-w-2xl mx-auto text-center'>
            <p>
              Schoolgirl Style is proud to partner with some of the finest
              brands in the business, together creating new ways to inspire and
              empower teachers worldwide.
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
        </div>
      </div>
    </div>
  );
};

export default PerfectPairing;
