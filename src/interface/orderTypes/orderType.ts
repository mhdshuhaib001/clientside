export interface IShippingAddress {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}
export interface IOrder {
  companyName: string;
  profileName: string;
  orderId: string;
  description: string;
  productImage: string[];
  productName: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  orderDate: Date;
  bidAmount: number;
  shippingAddress: IShippingAddress;
  addressId: string;
  paymentId: string;
  orderData: any;
  shippingType: 'standard' | 'express' | 'fridge' | 'normal';
  orderStatus: 'pending' | 'completed' | 'canceled';
  trackingNumber?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface OrderResponse {
  status: number;
  map(
    arg0: (order: any) => {
      id: any;
      buyerId: any;
      productId: any;
      sellerId: any;
      orderDate: string;
      orderStatus: any;
      paymentStatus: any;
      shippingAddress: any;
    },
  ): unknown;
  success: boolean;
  message: string;
  orders: IOrder[];
}
