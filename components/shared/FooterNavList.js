import Link from 'next/link';
import React from 'react';

const FooterNavList = ({ links }) => {
  return (
    <div className='w-full flex flex-col'>
      <div className='text-brand-red font-brown uppercase tracking-wider'>
        <Link href={links[0].link}>
          <span className='text-brand-red font-brown uppercase tracking-wider'>
            {links[0].title}
          </span>
        </Link>
      </div>
      {links[0] &&
        links[0].items.map((it, i) => (
          <div
            className='font-brown-light text-gray-800 py-0.5 cursor-pointer'
            key={it.name}
          >
            <Link href={it.link}>{it.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default FooterNavList;
