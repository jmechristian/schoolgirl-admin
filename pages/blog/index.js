import React from 'react';
import FullWidthQuote from '../../components/shared/FullWidthQuote';
import Hero from '../../components/shared/Hero';
import InnerPageSubNav from '../../components/shared/InnerPageSubNav';
import ScrollerWithHeadline from '../../components/shared/ScrollerWithHeadline';
import RandomScrollerWithHeadline from '../../components/shared/RandoScrollerWithHeadline';
import InstagramGrid from '../../components/shared/InstagramGrid';
import EmailSubscription from '../../components/shared/EmailSubscription';
import BlogCategoryScroller from '../../components/shared/BlogCategoryScroller';
import { getPostsForBlogHome, getClassroomInspoPosts } from '../../lib/API';
import { getPostCategories } from '../../lib/API';
import { supabase } from '../../lib/API';
import NewSubnav from '../../components/shared/NewSubnav';

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
    name: 'Decor',
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

const Index = ({ posts, inspo, pageData, subnav, categories }) => {
  return (
    <main className='relative pb-16' id='one'>
      <NewSubnav subNav={subnav.data} search={true} />
      <Hero
        side='md:bg-gradient-to-l'
        heading={pageData.data[0].hero_main.heading}
        headline={pageData.data[0].hero_main.headline}
        subtext={pageData.data[0].hero_main.subheadline}
        buttonText={pageData.data[0].hero_main.cta_text}
        buttonColor='bg-salmon'
        bg={pageData.data[0].hero_main.image}
        textSide='right-10'
        textColor='text-salmon'
        bodyColor='text-gray-600'
        link={pageData.data[0].hero_main.cta_link}
        theme={pageData.data[0].hero_main.theme}
      />
      <div className='flex flex-col gap-16 pt-16 scroll-mt-16' id='two'>
        <ScrollerWithHeadline
          items={posts?.nodes}
          itemTextStyle='text-gray-700'
          headline='Read The Latest'
        />
        <div id='three' className='scroll-m-16'>
          <Hero
            side='md:bg-gradient-to-r md:from-white/80'
            heading={pageData.data[0].hero_two.heading}
            headline={pageData.data[0].hero_two.headline}
            subtext={pageData.data[0].hero_two.subheadline}
            buttonText={pageData.data[0].hero_two.cta_text}
            buttonColor='bg-salmon'
            bg={pageData.data[0].hero_two.image}
            textSide='left-10'
            textColor='text-salmon'
            bodyColor='text-gray-600'
            link={pageData.data[0].hero_two.cta_link}
            theme={pageData.data[0].hero_two.theme}
          />
        </div>
        <div className='scroll-mt-16' id='four' />
        <BlogCategoryScroller
          // items={inspo?.nodes}
          itemTextStyle='text-gray-700'
          headline={pageData.data[0].category_headline}
          category={pageData.data[0].category}
          categories={categories}
          price
        />
        <div className='flex flex-col'>
          <div className='scroll-mt-16' id='five' />
          <Hero
            side='md:bg-gradient-to-l md:from-white/60'
            heading={pageData.data[0].hero_three.heading}
            headline={pageData.data[0].hero_three.headline}
            subtext={pageData.data[0].hero_three.subheadline}
            buttonText={pageData.data[0].hero_three.cta_text}
            buttonColor='bg-salmon'
            bg={pageData.data[0].hero_three.image}
            textSide='right-10'
            textColor='text-salmon'
            bodyColor='text-gray-600'
            link={pageData.data[0].hero_three.cta_link}
            theme={pageData.data[0].hero_three.theme}
          />
          <FullWidthQuote
            quote={pageData.data[0].blog_quote}
            author={pageData.data[0].quote_author}
          />
          <div id='six' className='scroll-m-16'>
            <Hero
              side='md:bg-gradient-to-r md:from-white/60'
              heading={pageData.data[0].hero_four.heading}
              headline={pageData.data[0].hero_four.headline}
              subtext={pageData.data[0].hero_four.subheadline}
              buttonText={pageData.data[0].hero_four.cta_text}
              buttonColor='bg-salmon'
              bg={pageData.data[0].hero_four.image}
              textSide='left-10'
              textColor='text-salmon'
              bodyColor='text-gray-600'
              link={pageData.data[0].hero_four.cta_link}
              theme={pageData.data[0].hero_four.theme}
            />
          </div>
        </div>
        <div className='scroll-mt-16' id='seven'>
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
  const pageData = await supabase
    .from('blog')
    .select(
      '*, hero_main:blog_hero_main_fkey(*), hero_two:blog_hero_two_fkey(*), hero_three:blog_hero_three_fkey(*), hero_four:blog_hero_four_fkey(*))'
    );

  const data = await getPostsForBlogHome();
  const inspo = await getClassroomInspoPosts('Classroom Inspiration');
  const categories = await getPostCategories();
  const subnav = await supabase.from('blog_subnav').select('*');

  return {
    props: {
      posts: data,
      inspo: inspo,
      pageData,
      categories,
      subnav,
    },
    revalidate: 10,
  };
};

export default Index;
