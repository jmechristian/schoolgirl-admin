import React, { useRef } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  PinterestIcon,
  PinterestShareButton,
} from 'react-share';
import { AnimatePresence, motion, useInView } from 'framer-motion';

const SocialShare = ({ title, desc, slug, media }) => {
  const itemRef = useRef();
  const inView = useInView(itemRef);

  const variants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <div>
        <div className='mx-auto max-w-prose px-6 py-16 lg:py-20 flex flex-col gap-6 items-center justify-between lg:px-8'>
          <motion.div
            className='flex flex-col gap-4 md:gap-6 items-center w-full max-w-7xl mx-auto px-6 md:px-0'
            variants={variants}
            initial='hide'
            animate={inView ? 'show' : 'hide'}
            ref={itemRef}
          >
            <div>
              <h2 className='font-canela text-gray-900 text-5xl text-center'>
                <span className='font-scarlet'>Share</span> the Style!
              </h2>
            </div>
          </motion.div>
          <div className='flex gap-3 items-center justify-center mx-auto'>
            <PinterestShareButton
              media={media}
              description={desc}
              url={`https://schoolgirlstyle.com/${slug}`}
              title={title}
              // onClick={() => socialShareClickHandler('Pinterest')}
              data-click-target='social_share'
              data-click-name='Pinterest'
            >
              <PinterestIcon round size={40} />
            </PinterestShareButton>
            <FacebookShareButton
              url={`https://schoolgirlstyle.com/${slug}`}
              quote={desc ? desc : ''}
              // onClick={() => socialShareClickHandler('facebook')}
              data-click-target='social_share'
              data-click-name='Facebook'
            >
              <FacebookIcon round size={40} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://schoolgirlstyle.com/${slug}`}
              // onClick={() => socialShareClickHandler('twitter')}
            >
              <TwitterIcon round size={40} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={`https://schoolgirlstyle.com/${slug}`}
              title={title}
              source='Schoolgirlstyle.com'
              summary={desc}
              // onClick={() => socialShareClickHandler('linkedin')}
              data-click-target='social_share'
              data-click-name='LinkedIn'
            >
              <LinkedinIcon round size={40} />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SocialShare;
