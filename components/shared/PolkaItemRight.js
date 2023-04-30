import React from 'react';

const PolkaItemRight = ({
  heading,
  headline,
  body,
  bodyCallout,
  cta,
  bground,
  button,
  link,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-white md:min-h-[520px]'>
      <div className='flex justify-center items-center gap-4 max-w-[496px] mx-auto'>
        <div className='flex flex-col col-span-1 max-w-screen-xs gap-4 px-6 mx-auto py-12 lg:py-16'>
          <div className='font-sweet-bold uppercase tracking-widest text-xs text-gray-900'>
            {heading}
          </div>
          <div className='font-canela text-5xl lg:text-7xl text-sweet-green leading-none'>
            {headline}
          </div>
          <div className='font-brown text-gray-700 text-sm md:text-base'>
            {body}
          </div>
          <div className='font-brown-bold text-sweet-green text-sm md:text-base'>
            {bodyCallout}
          </div>
          {button ? (
            <div
              className='cursor-pointer font-sweet-bold text-sm md:text-base tracking-widest uppercase py-3 px-5 w-fit bg-sweet-green text-white'
              onClick={() => window.open(link, '_blank')}
            >
              {cta}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        className={`${bground} bg-cover bg-top aspect-square md:aspect-auto`}
      ></div>
    </div>
  );
};

export default PolkaItemRight;
