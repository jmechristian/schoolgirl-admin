import React from 'react';

const QuoteBlock = ({ quote }) => {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='font-scarlet text-brand-red text-4xl pt-3'>
        &ldquo;Our hope is to provide an easy and inspirational avenue for
        teachers to create inviting spaces conducive to learning&rdquo;
      </div>
      <div className='text-gray-500 font-brown text-xs tracking-wider'>
        SGS FOUNDER, MELANIE
      </div>
    </div>
  );
};

export default QuoteBlock;
