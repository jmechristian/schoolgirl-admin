import React from 'react';
import FadeInWrapper from './FadeInWrapper';
import HeadlineMotion from './HeadlineMotion';

const FullWidthQuote = ({ quote, author }) => {
  return (
    <div className='w-full h-full py-32 bg-light-grey'>
      <FadeInWrapper>
        <div className='max-w-5xl mx-auto flex flex-col px-12 text-center'>
          <div className='text-brand-red text-4xl lg:text-6xl font-scarlet leading-tight [word-spacing:10px]'>
            {quote}
          </div>
          <div className='text-gray-500 font-sweet tracking-wider mt-12 text-lg uppercase'>
            {author}
          </div>
        </div>
      </FadeInWrapper>
    </div>
  );
};

export default FullWidthQuote;
