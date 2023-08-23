import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import ShopScrollerItem from './ShopScrollerItem';
import HeadlineMotion from './HeadlineMotion';
import NewScroller from './NewScroller';

const HeyTeachScroller = ({
  items,
  headline,
  itemTextStyle,
  background,
  bookmark,
}) => {
  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
        <HeadlineMotion>{headline}</HeadlineMotion>
      </div>
      <div className='flex gap-3 max-w-[1440px] mx-auto px-6 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.id}
              >
                <ShopScrollerItem
                  image={it.images ? it.images[0].src : ''}
                  alt={
                    it.featuredImage ? it.featuredImage.node.altText : it.alt
                  }
                  headline={it.title ? it.title : it.headline}
                  text={itemTextStyle}
                  subheadline={it.subheadline}
                  background={background}
                  price={it.variants[0].price.amount}
                  slug={it.onlineStoreUrl}
                />
              </motion.div>
            ))}
        </NewScroller>
      </div>
    </div>
  );
};

export default HeyTeachScroller;
