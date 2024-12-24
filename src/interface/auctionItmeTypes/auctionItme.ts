export default interface AuctionItemProps {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    currentBid: number;
    auctionStatus?: "sold" | "ended" | "live" | "upcoming" | "relisted" | "unsold";
  };
  auctionEndTime?: string;
  auctionStartTime?: string;
  auctionFormat?: string;
}
