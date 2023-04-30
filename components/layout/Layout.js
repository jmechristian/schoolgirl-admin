import React from 'react';
import Header from '../nav/Header';
import Footer from '../nav/Footer';
import Banner from '../nav/Banner';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className='w-full'>
      <Head>
        <title>Schoolgirl Style</title>
        <meta property='og:title' content='Schoolgirl Style' key='title' />
      </Head>
      <Banner />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
