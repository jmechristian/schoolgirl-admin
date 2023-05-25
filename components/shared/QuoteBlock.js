import React from 'react';

const QuoteBlock = ({ quote }) => {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='font-scarlet text-brand-red text-4xl pt-3 text-center leading-tight'>
        {quote}
      </div>
      <div className='text-gray-500 font-brown text-xs tracking-wider'>
        SGS FOUNDER, MELANIE
      </div>
    </div>
  );
};

export default QuoteBlock;
