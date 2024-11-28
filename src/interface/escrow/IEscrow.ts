export interface IEscrow {
    _id: any
    orderId: any
    buyerId: any
    sellerId: any
    totalAmount: number
    platformFee: number
    sellerEarnings: number
    status: 'held' | 'released' | 'disputed'
    releaseDate?: Date
    createdAt: Date
    updatedAt: Date
  }
  

  export interface EscrowResponse {
    data: IEscrow[];
    totalPages: number;
    page: number;
    summary: number;
  }
  
  export interface EscrowQueryParams {
    page?: number
    limit?: number
    status?: string
    searchTerm?: string
    searchType: any
    startDate?: string
    endDate?: string
  }
 
  
  export interface EscrowSummary {
    totalAmount: number
    platformFee: number
    sellerEarnings: number
    count: number
  }