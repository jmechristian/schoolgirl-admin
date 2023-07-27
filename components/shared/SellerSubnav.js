import { Fragment, useState } from 'react';
import { Listbox } from '@headlessui/react';
import {
  CheckIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import SearchPanel from './SearchPanel';

const filter = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'curriculum',
    name: 'Curriculum',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
  },
];

const SellerSubnav = ({ subNav, search, changeFilter }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className='w-full flex justify-center gap-12 py-3 md:py-8 bg-khaki sticky top-0 z-50 drop-shadow-sm'>
      <div
        className='flex lg:justify-center items-center gap-12 w-full max-w-7xl mx-auto px-6 overflow-auto'
        id='scrollers'
      >
        <div className='font-sm font-brown text-gray-600 uppercase text-sm'>
          <a href='#top'>Top</a>
        </div>
        <div className='flex gap-2 items-end relative'>
          <div className='font-sm font-brown text-gray-600 uppercase text-sm'>
            <div>Sort By</div>
          </div>
          <select
            name='filter'
            id='filter'
            className='bg-transparent text-sm font-brown text-center uppercase border-b border-b-gray-500 pb-1'
            onChange={(e) => changeFilter(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='curriculum'>Curriculum</option>
            <option value='lifestyle'>Lifestyle</option>
          </select>
        </div>

        {search && (
          <div
            className='flex gap-2 items-center cursor-pointer'
            onClick={() => setSearchOpen(true)}
          >
            <MagnifyingGlassIcon className='w-5 h-5' />
            <div className='text-gray-600 uppercase text-sm'>Search</div>
          </div>
        )}
      </div>
      <SearchPanel open={searchOpen} setClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default SellerSubnav;
