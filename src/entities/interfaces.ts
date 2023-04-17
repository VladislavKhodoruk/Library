import { SortDirection, Nullable } from 'entities/types';
import { AllCategories } from './types';
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
  rating: number;
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

export interface Filtration {
  sortDirection: SortDirection;
  sortCategory: AllCategories;
  searchingText: string;
}

export interface MainPageState {
  books: Card[];
  loadingStatus: string;
  filtration: Filtration;
}
export interface SidebarState {
  categories: Category[];
  loadingStatus: string;
}

export interface BookPageState {
  book: Nullable<Book>;
  loadingStatus: string;
}

export interface RegistrationPageState {
  loadingStatus: string;
  errorStatusCode: Nullable<number>;
  errorMessage: Nullable<string>;
}

export interface RegistrationRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthorizationPageState {
  loadingStatus: string;
  errorStatusCode: Nullable<number>;
  errorMessage: Nullable<string>;
}

export interface AuthorizationRequest {
  identifier: string;
  password: string;
}

export interface AuthorizationResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
