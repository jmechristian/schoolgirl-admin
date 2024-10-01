import React from 'react';
import Header from '../nav/Header';
import Footer from '../nav/Footer';
import Banner from '../nav/Banner';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import EditableBanner from '../editable/EditableBanner';

const Layout = ({ children, nav }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='w-full'>
      <Head>
        <title>Schoolgirl Style</title>
        <meta property='og:title' content='Schoolgirl Style' key='title' />
      </Head>
      {user ? <EditableBanner /> : <Banner />}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
