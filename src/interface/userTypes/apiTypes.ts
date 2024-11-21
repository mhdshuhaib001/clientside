export interface Post {
  id: number;
  title: string;
  content: string;
}


export interface User {
  isActive?: string ;
  userData: any;
  _id: string;
  name: string;
  email: string;
  status:string
  role:"user"|"seller"
}

// export interface User {
//     _id: string;
//     name: string;
//     email: string;
//   }

export interface AuthRequest {
  name?: string;
  email: string;
  password: string;
  otp?: string;
}

export interface AuthResponse {
 sellerId:string;
  localStorage: any;
  message:string;
  userData: any;
  _id: string;
  user: any;
  name?:string;
  profileImage?:string;
  accessToken?: string|undefined;
  refreshToken?:string|undefined;
  sellerToken?: string|undefined;
  password: string;
  email: string;
}

export interface ErrorType{
  data:{
    status:string,
    messsage:string
  }
}



export interface Address {
  _id: string
  fullName: string
  phoneNumber: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}