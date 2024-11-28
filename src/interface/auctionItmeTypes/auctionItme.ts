export default interface AuctionItemProps {
  product: {
    id: string;
    imageUrl?:any;
    name: string;
    currentBid: Number | string;
  };
  auctionEndTime?: string | null;
  status: 'live' | 'upcoming' | 'end' | 'sold'|'relisted';
  auctionFormat: string;
  auctionStartTime?:string|null
}
