import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SearchPanel from './SearchPanel';

const InnerPageSubNav = ({ subNav, search }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className='w-full flex justify-center gap-12 py-3 md:py-8 bg-khaki sticky top-0 z-50 drop-shadow-sm'>
      <div
        className='flex justify-center items-center gap-12 w-full max-w-7xl mx-auto px-6 overflow-auto'
        id='scrollers'
      >
        {subNav.map((item, i) => (
          <div
            className='font-sm font-brown text-gray-600 uppercase text-sm'
            key={item.name}
          >
            <a href={item.link}>{item.name}</a>
          </div>
        ))}
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

export default InnerPageSubNav;
