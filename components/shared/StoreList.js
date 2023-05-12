import React from 'react';
import HeadlineMotion from './HeadlineMotion';

const locationsOne = [
  {
    name: 'Ace Educational Supply',
    location: '1701 South State Rd 7',
    locationTwo: 'North Lauderdale, Fl 33068',
  },
  {
    name: 'CM School Supply',
    location: '4155 Van Buren Blvd.',
    locationTwo: 'Riverside, CA 92503',
  },
  {
    name: 'Fun Company',
    location: '136 S Main St',
    locationTwo: 'Bellefontaine, OH 43311',
  },
  {
    name: 'GW School Supply',
    location: '5626 E Belmont Ave',
    locationTwo: 'Fresno, CA 93727',
  },
  {
    name: 'Mardel',
    location: 'Multiple Locations',
    locationTwo: '',
  },
  {
    name: 'Parent Teacher Store',
    location: '3320 Partner Place',
    locationTwo: 'Ste. 104 Lexington, KY 40503',
  },
  {
    name: 'Scholars Choice',
    location: 'Canada',
  },
  {
    name: 'School Box',
    location: '1257 Kennestone Circle',
    locationTwo: 'Marietta, GA 30066',
  },
  {
    name: 'The Teachers Lounge',
    location: '21 Ronnies Plz',
    locationTwo: 'St. Louis, MO. 63126',
  },
  {
    name: 'The Teach Me Store',
    location: '3520 Spring Forest Road',
    locationTwo: 'Raleigh, NC 27616',
  },
  {
    name: 'World of Wonder',
    location: '7902 Towne Center Pkwy',
    locationTwo: 'Ste 117 Papillion,  NE 68046',
  },
];

export const DummyBlock = ({ locations }) => {
  return locations.map((loc, index) => (
    <div className='flex flex-col gap-1' key={loc.name}>
      <div className='text-gray-500 font-brown-bold'>{loc.name}</div>
      <div className='flex flex-col'>
        <div className='text-gray-500 font-brown'>{loc.address}</div>
        <div className='text-gray-500 font-brown'>{loc.address_extra}</div>
      </div>
    </div>
  ));
};

const StoreList = ({ headline, locations }) => {
  return (
    <div className='bg-light-grey w-full h-full py-16 md:py-24'>
      <div className='max-w-6xl px:6 lg:px-0 flex flex-col gap-16 mx-auto'>
        <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
          <HeadlineMotion>{headline}</HeadlineMotion>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-16'>
          <DummyBlock locations={locations} />
        </div>
      </div>
    </div>
  );
};

export default StoreList;
