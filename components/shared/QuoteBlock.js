import React from 'react';

const QuoteBlock = ({ quote }) => {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='font-scarlet text-brand-red text-4xl pt-3 text-center leading-10'>
        &ldquo;Our&ensp;hope&ensp;is&ensp;to&ensp;provide&ensp;an&ensp;easy&ensp;and
        &ensp;inspirational&ensp;avenue&ensp;for&ensp;teachers&ensp;to&ensp;create&ensp;inviting&ensp;spaces
        &ensp;conducive&ensp;to&ensp;learning&rdquo;
      </div>
      <div className='text-gray-500 font-brown text-xs tracking-wider'>
        SGS FOUNDER, MELANIE
      </div>
    </div>
  );
};

export default QuoteBlock;
