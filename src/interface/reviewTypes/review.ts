export interface Review {
  _id: string;
  user: { _id: string; name: string; profileImage: string } | null;
  rating: number;
  comment: string;
  avatar: string;
}
