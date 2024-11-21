import React from "react";
import SellerProfile from "../../components/Seller/SellerProfile";
import Header from "../../components/User/Header";
import Footer from "../../components/User/Footer";


const SellerProfilePage:React.FC=()=>{
    return(
        <>
        <Header/>
        <div className="flex flex-col min-h-screen bg-amber-50">
            <SellerProfile/>
        </div>
        <Footer/>
        </>
    )
}


export default SellerProfilePage