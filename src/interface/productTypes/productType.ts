import { Seller } from '../sellerTypes/sellerApiTypes';

export type ProductImage = any;

export interface ProductType {
  categoryId: any;
  sellerData: Seller;
  productData: any;
  _id?: string;
  itemTitle: string;
  category: any;
  description: string;
  condition: string;
  images: ProductImage[];
  currentBid:any
  auctionFormat: string;
  sold: boolean;
  reservePrice: string;
  shippingType: string;
  shippingCost: string;
  handlingTime: string;
  returnPolicy: string;
  auctionStartDateTime?: any | null;
  auctionEndDateTime?: any | null;
  auctionStatus: "sold" | "ended" | "live" | "upcoming"|'relisted'|'unsold';
}
