import React from 'react';

const InnerPageSubNav = ({ subNav }) => {
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
      </div>
    </div>
  );
};

export default InnerPageSubNav;
