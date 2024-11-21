import React from 'react';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';
import LiveAuction from '../../components/User/LiveAuction';
const AuctionPage: React.FC = () => {
  return (
    <>
      <Header />

      <div className=" container min-h-screen mx-auto px-4 py-8 font-serif bg-main-bg ">
        <LiveAuction />
      </div>
      <Footer />
    </>
  );
};
export default AuctionPage;
