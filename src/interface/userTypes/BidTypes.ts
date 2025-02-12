export type Bid = {
    id?: string;
    bidder: string;
    amount: number;
    time: Date | string;
    avatar: string | undefined;
  };