import React from 'react';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';
import RealTimeBidding from '../../components/User/LiveBidding/RealTimeBidding';

const AuctionPage: React.FC = () => {
  return (
    <>
      <div className="mb-5">
        <Header />
      </div>
      <div className="container min-h-screen mx-auto px-4 py-12 font-serif bg-main-bg">
        <RealTimeBidding />
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default AuctionPage;
