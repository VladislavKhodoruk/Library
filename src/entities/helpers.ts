import { CategoryNamesRus } from './enums';
import { Card } from './interfaces';
import { SortDirection } from './types';

export const sortBooksByDirection = (books: Card[], direction: SortDirection) => {
  if (direction === 'desc') {
    return [...books].sort((a, b) => b.rating - a.rating);
  }
  return [...books].sort((a, b) => (a.rating as number) - (b.rating as number));
};

export const sortBooksByCategory = (books: Card[], category: string) => {
  if (category !== 'all') {
    return books.filter((book: Card) =>
      book.categories?.includes(CategoryNamesRus[category as keyof typeof CategoryNamesRus])
    );
  }
  return books;
};

export const searchBooksByTitle = (books: Card[], text: string) => {
  return books.filter((book: Card) => book.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
};
