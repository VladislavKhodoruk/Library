export interface Book {
  id: string;
  images: string[];
  category: string;
  author: string;
  title: string;
  rating: number;
  year: number;
  bookingStatus: number;
  bookedTill: string;
  description?: string;
  publisher: string;
  pageAmount: number;
  binding: string;
  format: string;
  weight: number;
  isbn: string;
  manufacturer: string;
  comments: Comment[];
}

export interface Comment {
  date: string;
  author: string;
  text?: string;
  rating: number;
  image: string;
}
