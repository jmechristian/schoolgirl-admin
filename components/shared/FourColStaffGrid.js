import React from 'react';
import { StaffItem } from './StaffItem';
import HeadlineMotion from './HeadlineMotion';

const FourColStaffGrid = ({ items, headline, itemTextStyle, background }) => {
  return (
    <div className='w-full flex flex-col items-center gap-8 cursor-pointer'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
        <HeadlineMotion>{headline}</HeadlineMotion>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl px-6 mx-auto gap-9 overflow-hidden'>
        {items &&
          items.map((it, i) => (
            <div key={it.headline}>
              <StaffItem
                image={it.image}
                alt={it.alt}
                headline={it.headline}
                text={itemTextStyle}
                background={background}
                link={it.link}
                job={it.job ? it.job : ''}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FourColStaffGrid;
