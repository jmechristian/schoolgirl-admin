import React from 'react';
import { motion } from 'framer-motion';
import ScrollerItem from '../shared/ScrollerItem';
import NewScroller from '../shared/NewScroller';

const BlogCategoryScroller = ({
  items,
  itemTextStyle,
  headline,
  bookmark,
  background,
  price,
}) => {
  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light max-w-3xl mx-auto w-full flex flex-col gap-3'>
        <div className='flex gap-6'>
          <div className='w-full text-center'>{headline}</div>
        </div>
      </div>
      <div className='flex gap-3 mx-auto max-w-[1440px] px-6 sm:px-0 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.title ? it.title : it.headline}
              >
                <ScrollerItem
                  image={
                    it.featuredImage
                      ? it.featuredImage.node.sourceUrl
                      : it.image
                  }
                  alt={
                    it.featuredImage ? it.featuredImage.node.altText : it.alt
                  }
                  headline={it.title ? it.title : it.headline}
                  text={itemTextStyle}
                  subheadline={it.subheadline}
                  background={background}
                  bookmark={bookmark}
                  price={it.price ? it.price : ''}
                  slug={it.slug ? it.slug : '/#'}
                />
              </motion.div>
            ))}
        </NewScroller>
      </div>
    </div>
  );
};

export default BlogCategoryScroller;
