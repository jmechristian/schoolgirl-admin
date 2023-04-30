import React from 'react';
import { FlexGridItem } from './FlexGridItem';
import HeadlineMotion from './HeadlineMotion';

const ThreeColumWithHeadline = ({ items, itemTextStyle, headline }) => {
  return (
    <div className='w-full flex flex-col gap-8 justify-center items-center'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
        <HeadlineMotion>{headline}</HeadlineMotion>
      </div>
      <div className='grid md:grid-cols-3 w-full max-w-7xl px-6 sm:px-0 mx-auto gap-12 overflow-hidden'>
        {items &&
          items.map((it, i) => (
            <div key={it.headline}>
              <FlexGridItem
                image={it.image}
                alt={it.alt}
                headline={it.headline}
                text={itemTextStyle}
                subheadline={it.subheadline}
                link={it.link}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ThreeColumWithHeadline;
