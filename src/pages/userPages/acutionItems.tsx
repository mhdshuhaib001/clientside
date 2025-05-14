import React from 'react';
import AuctionItemGrid from '../../components/commen/AuctionGrid';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';

const AuctionItems: React.FC = () => {
  return (
    <>
      {' '}
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <AuctionItemGrid />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuctionItems;
