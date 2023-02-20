import { Nullable } from 'entities/types';

export interface Category {
  name: string;
  path: string;
  id: number;
}

export interface Card {
  authors: Nullable<string[]>;
  booking: Nullable<Booking>;
  categories: Nullable<string[]>;
  delivery: Nullable<Delivery>;
  histories: History[] | null;
  id: number;
  image: Nullable<{
    url: string;
  }>;
  issueYear: Nullable<string>;
  rating: Nullable<number>;
  title: string;
}

export interface Book {
  ISBN: Nullable<string>;
  authors: Nullable<string[]>;
  booking: Nullable<Booking>;
  categories: Nullable<string[]>;
  comments: Nullable<Comment[]>;
  cover: Nullable<string>;
  delivery: Nullable<Delivery>;
  description: Nullable<string>;
  format: Nullable<string>;
  histories: History[] | null;
  id: number;
  images: Array<{
    url: string;
  }>;
  issueYear: Nullable<string>;
  pages: Nullable<string>;
  producer: Nullable<string>;
  publish: Nullable<string>;
  rating: Nullable<number>;
  title: string;
  weight: Nullable<string>;
}

export interface Comment {
  createdAt: string;
  id: Nullable<number>;
  rating: number;
  text: Nullable<string>;
  user: User;
}

export interface User {
  avatarUrl: Nullable<string>;
  commentUserId: number;
  firstName: string;
  lastName: string;
}

export interface History {
  id: Nullable<number>;
  userId: Nullable<number>;
}

export interface Booking {
  id: number;
  order: boolean;
  dateOrder: Nullable<string>;
  customerId: Nullable<number>;
  customerFirstName: Nullable<string>;
  customerLastName: Nullable<string>;
}

export interface Delivery {
  id: number;
  handled: boolean;
  dateHandedFrom: Nullable<string>;
  dateHandedTo: Nullable<string>;
  recipientId: Nullable<number>;
  recipientFirstName: Nullable<string>;
  recipientLastName: Nullable<string>;
}
