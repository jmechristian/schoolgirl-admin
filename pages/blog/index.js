import React from 'react';
import FullWidthQuote from '../../components/shared/FullWidthQuote';
import Hero from '../../components/shared/Hero';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import ScrollerWithHeadline from '../../components/shared/ScrollerWithHeadline';
import RandomScrollerWithHeadline from '../../components/shared/RandoScrollerWithHeadline';
import InstagramGrid from '../../components/shared/InstagramGrid';
import EmailSubscription from '../../components/shared/EmailSubscription';
import { getPostsForBlogHome, getClassroomInspoPosts } from '../../lib/API';

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
      'https://res.cloudinary.com/designadg/image/upload/v1679687639/SGS/enlarge_qd3b7y.webp',
    alt: 'How to Enlarge a Product',
    headline: 'How to Enlarge a Product',
    slug: 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/03/How-to-Enlarge-2023.pdf',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679687639/SGS/print_fdbyrs.webp',
    alt: 'Release to Print Form',
    headline: 'Release to Print Form',
    slug: 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/03/Release-2023.pdf',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679687639/SGS/troubleshooting_whqxpb.webp',
    alt: 'Troubleshooting',
    headline: 'Troubleshooting',
    slug: 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/03/Troubleshooting-2023.pdf',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679687639/SGS/important_info_bu63x7.webp',
    alt: 'Important Information',
    headline: 'Important Information',
    slug: 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/03/Important-Information-2023.pdf',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679687639/SGS/edit_ppt_bn4sxq.webp',
    alt: 'Edit a Powerpoint File',
    headline: 'Edit a Powerpoint File',
    slug: 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/04/How-to-Edit-a-Power-Point-File.pdf',
  },
  {
    image:
      'https://res.cloudinary.com/designadg/image/upload/v1679687639/SGS/edit_pdf_jwoaph.webp',
    alt: 'Edit Your Editable PDF',
    headline: 'Edit Your Editable PDF',
    slug: 'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/04/How-to-Edit-an-Editable-PDF.pdf',
  },
];

const Index = ({ posts, inspo }) => {
  return (
    <main className='relative pb-16' id='home'>
      <InnerPageSubNav subNav={subNav} />
      <Hero
        side='md:bg-gradient-to-l'
        heading='Blog'
        headline='SGS Design'
        subtext='Exciting news! My team and I spent some time at EdSpaces in November, 2022 officially expanding the Schoolgirl Style brand to hold a new branch called SGS Design.'
        buttonText='Read More'
        buttonColor='bg-salmon'
        bg='bg-blog'
        textSide='right-10'
        textColor='text-salmon'
        bodyColor='text-gray-600'
        link='https://schoolgirlstyle.com/blog/introducing-sgs-design/'
      />
      <div className='flex flex-col gap-16 pt-16'>
        <ScrollerWithHeadline
          items={posts?.nodes}
          itemTextStyle='text-gray-700'
          headline='Read The Latest'
        />
        <div id='inspiration' className='scroll-m-16'>
          <Hero
            side='md:bg-gradient-to-r md:from-white/80'
            heading='Blog'
            headline='Good Vibes'
            subtext='From statement-making murals to retro influences and  pretty pastels, see why this collection brings all the smiles!'
            buttonText='Read More'
            buttonColor='bg-salmon'
            bg='bg-blog-goodvibes'
            textSide='left-10'
            textColor='text-salmon'
            bodyColor='text-gray-600'
            link='https://www.schoolgirlstyle.com/blog/good-vibes-collection'
          />
        </div>
        <ScrollerWithHeadline
          items={inspo?.nodes}
          itemTextStyle='text-gray-700'
          headline='More Classroom Inspiration'
          price
        />
        <div className='flex flex-col'>
          <Hero
            side='md:bg-gradient-to-l md:from-white/60'
            heading='About'
            headline='Helping Hand'
            subtext='Welcome to Schoolgirl Style! It’s our mission to inspire teachers worldwide in their classroom decor endeavours.'
            buttonText='Learn More'
            buttonColor='bg-salmon'
            bg='bg-blog-helping'
            textSide='right-10'
            textColor='text-salmon'
            bodyColor='text-gray-600'
            link='https://youtube.com/shorts/TPRwof9Kdnk?feature=share'
          />
          <FullWidthQuote quote=' We believe in the power of classroom decor to turn classrooms into home-away-from-homes.' />
          <div id='dècor' className='scroll-m-16'>
            <Hero
              side='md:bg-gradient-to-r md:from-white/60'
              heading='Shop'
              headline='Style Shop'
              subtext='Feeling inspired? Explore the Schoolgirl Style Shop and find your favorites to start transforming your space!'
              buttonText='Shop Now'
              buttonColor='bg-salmon'
              bg='bg-blog-style'
              textSide='left-10'
              textColor='text-salmon'
              bodyColor='text-gray-600'
              link='https://shopschoolgirlstyle.com/'
            />
          </div>
        </div>
        <div className='scroll-mt-16' id='backtoschool'>
          <RandomScrollerWithHeadline
            items={collectionItems}
            itemTextStyle='text-gray-700'
            headline='Teacher Tips & Tools'
          />
        </div>
        <InstagramGrid />
        <EmailSubscription />
      </div>
    </main>
  );
};

export const getStaticProps = async () => {
  const data = await getPostsForBlogHome();
  const inspo = await getClassroomInspoPosts();

  return {
    props: {
      posts: data,
      inspo: inspo,
    },
    revalidate: 10,
  };
};

export default Index;
