export interface AdminLoginRequest {
  email: string;
  password: string;
}
export interface AdminLoginResponse {
  status: number;
  message: string;
  adminToken: string;
}

export interface Category {
  items: any;
  _id: string;
  id: string; 
  name: string; 
  imageUrl: string;
  iconUrl: string; 
}

export interface UploadCategory {
  name: string;
  image:string | File | null; 
  icon: string | File | null; 
}

export interface FetchCategoriesResponse {
  success: boolean;
  categories: Category[];
  totalPages:number
}

export interface AddCategoryRequest {
  name: string;
  image: File; 
  icon: File; 
}

export interface AddReportRequest {
  sellerId:string|undefined
  reason: string;
  details: string;
  reportedBy: string;  
}

export interface AddReportResponse {
  success: boolean;
  message: string;
  report?: any;  
}

interface Report {
  id: string; 
  sellerId: string; 
  sellerName: string;
  reportedBy: { _id: string; name: string };
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}



export interface FetchReportsResponse {
  map(arg0: (report: any) => { id: any; sellerId: any; sellerName: any; reportedBy: any; reason: any; details: any; status: "pending" | "resolved" | "dismissed"; createdAt: any; }): Report[];
  reports: Report[]; 
}
