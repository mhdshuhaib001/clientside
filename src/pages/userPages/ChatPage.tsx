import React from 'react';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';
import Chat from '../../components/User/Chat';

const ChatPage: React.FC = () => {
    return (
        <>
        <Header />
        <div className="container mx-auto px-4 py-8 font-serif bg-main-bg ">
            <Chat />
        </div>
        <Footer />
        </>
    )
};
export default ChatPage;
