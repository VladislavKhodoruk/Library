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

export const loginValidator = (value: string) => {
  const hasNumbers = /\d/.test(value);
  const hasLatin = /^(?=.*[a-zA-Z])/.test(value);
  let errorsString = '';

  if (!hasNumbers) {
    errorsString += ' цифры';
  }
  if (!hasLatin) {
    errorsString += ' латинский алфавит';
  }
  if (errorsString.trim().length) {
    return errorsString.trim();
  }
  return true;
};

export const passwordValidator = (value: string) => {
  const enoughLength = /^(\w{8,})$/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasCapitalizedLatin = /^(?=.*[A-Z])/.test(value);
  let errorsString = '';

  if (!enoughLength) {
    errorsString += ' не менее 8 символов';
  }
  if (!hasNumbers) {
    errorsString += ' цифрой';
  }
  if (!hasCapitalizedLatin) {
    errorsString += ' заглавной буквой';
  }
  if (errorsString.trim().length) {
    return errorsString.trim();
  }
  return true;
};
