import { ProductType } from "../productTypes/productType";
export interface SellerCreationRequest {
  userId?: string;
  companyName?: string;
  contactInfo?: string;
  about?: string;
  image?:string
}

export interface Seller {
  _id: string;
  sellerId?:string
  userId: string;
  companyName: string;
  profile:string;
  isBlocked: boolean;
  about?: string;
  address?: string;
  phone?: string;
  email?: string;
  sellerToken:string
}

export interface SellerResponse {
  sellerToken:string
  sellerId:string
  status: number;
  message: string;
  seller: Seller;
}


// export interface ProductType {
//   _id?: string;
//   itemTitle: string;
//   category: string;
//   description: string;
//   condition: string;
//   images: File[] | string[];
//   auctionFormat: string;
//   auctionDuration: string;
//   reservePrice: string;
//   shippingType: string;
//   shippingCost: string;
//   handlingTime: string;
//   returnPolicy: string;
//   currentBid?:number;
//   auctionStatus: 'live' | 'upcoming' | 'ended' | 'sold';
//   auction_start_time?: Date;
//   auctionEndDateTime?: string;
// }


export interface AddProductResponse {
  success: boolean;
  message: string;
}

export interface ProductsResponse {
  products: ProductType[];
}
export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  currentBid: number;
}

export interface SellerInfo {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  image: string;
}