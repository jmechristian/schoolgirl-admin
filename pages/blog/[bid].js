import React from 'react';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import ScrollerWithHeadline from '../../components/shared/ScrollerWithHeadline';
import SocialShare from '../../components/shared/SocialShare';
import HeadlineWithSpan from '../../components/shared/HeadlineWithSpan';
import EmailSubscription from '../../components/shared/EmailSubscription';
import {
  getAllPostsWithSlug,
  getPostBySlug,
  getPostsForBlogHome,
} from '../../lib/API';
import Head from 'next/head';

const subNav = [
  {
    name: 'Top',
    link: '#home',
  },
  {
    name: 'Inspiration',
    link: '#inspiration',
  },
  {
    name: 'Dècor',
    link: '#dècor',
  },
  {
    name: 'Back To School',
    link: '#backtoschool',
  },
];

const collectionItems = [
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_1_pksyrm.webp',
    alt: 'Shop Rugs',
    headline: 'Rugs',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_2_rsktoz.webp',
    alt: 'Shop Borders',
    headline: 'Borders',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_3_i4gea7.webp',
    alt: 'Shop Pillows',
    headline: 'Pillows',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_4_airqen.webp',
    alt: 'Shop Décor',
    headline: 'Décor1',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_4_airqen.webp',
    alt: 'Shop Décor',
    headline: 'Décor2',
  },
  {
    image:
      'https://res.cloudinary.com/jmechristian/image/upload/v1675819579/shop_4_airqen.webp',
    alt: 'Shop Décor',
    headline: 'Décor3',
  },
];

const Index = ({ post, latest }) => {
  const formattedDate = new Date(post.dateGmt).toDateString();

  return (
    <>
      <Head>
        <title>
          {post && post.title ? post.title : 'School Girl Style Blog'}
        </title>
        <meta
          name='image'
          property='og:image'
          content={
            post && post.featuredImage
              ? post.featuredImage.node.sourceUrl
              : 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2024/02/sgs-defaultogimg.png'
          }
          key='image'
        />
        <meta
          property='og:title'
          content={post && post.title ? post.title : 'School Girl Style Blog'}
          key='title'
        />
        <meta
          property='og:description'
          content={
            post && post.excerpt
              ? post.excerpt
              : 'Founded in 2011 by Melanie Ralbusky, the Schoolgirl Style brand has since become synonymous with trend-setting classroom décor. Infusing an element of fashion in every design, Schoolgirl Style invites teachers and students alike to tap into their creativity and enjoy the fun of learning.'
          }
          key='desc'
        />
        <meta
          name='description'
          content={
            post && post.excerpt
              ? post.excerpt
              : 'Founded in 2011 by Melanie Ralbusky, the Schoolgirl Style brand has since become synonymous with trend-setting classroom décor. Infusing an element of fashion in every design, Schoolgirl Style invites teachers and students alike to tap into their creativity and enjoy the fun of learning.'
          }
          key='desc'
        />
      </Head>
      <main className='relative pb-16' id='home'>
        <div className='flex flex-col pt-20'>
          <div className='lg:max-w-6xl w-full mx-auto flex flex-col gap-16 overflow-hidden'>
            <div className='flex flex-col gap-3 max-w-3xl mx-auto px-6 lg:px-0'>
              <div className='font-sweet-bold text-sm uppercase tracking-wider'>
                {formattedDate && formattedDate}
              </div>
              <div className='font-canela text-sweet-green text-5xl lg:text-6xl'>
                {post.title}
              </div>
              <div
                className='text-xl md:text-xl mt-4 leading-normal max-w-full overflow-hidden'
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              ></div>
            </div>
          </div>
          {post.featuredImage && (
            <div
              className='aspect-video bg-slate-800 w-full bg-cover my-24'
              style={{
                backgroundImage: `url(${post.featuredImage.node.sourceUrl})`,
              }}
            ></div>
          )}
          <div className='max-w-3xl px-6 lg:px-0 mx-auto flex flex-col gap-16'>
            <div
              className='blogContent prose prose-gray: lg:prose-lg'
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <SocialShare
            title={post.title}
            slug={post.slug}
            desc={post.excerpt}
            media={post?.featuredImage?.node.sourceUrl}
          />
          <hr className='my-24' />
          <div className='flex flex-col gap-16'>
            <ScrollerWithHeadline
              items={latest?.nodes}
              itemTextStyle='text-gray-700'
              headline='Read The Latest'
              bookmark={true}
            />
            <EmailSubscription />
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const data = await getPostBySlug(params && params.bid);
  const latest = await getPostsForBlogHome();

  if (!data.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data.post,
      latest: latest,
    },
    // revalidate: 10,
  };
};

export default Index;
