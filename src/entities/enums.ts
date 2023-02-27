export enum LoadingStatus {
  Default = 'default',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

export enum ViewModes {
  Table = 'table',
  List = 'list',
}

export enum CategoryNamesRus {
  'all' = 'Все книги',
  'business' = 'Бизнес',
  'psychology' = 'Психология',
  'parents' = 'Родителям',
  'non-fiction' = 'Нон-фикшн',
  'fiction' = 'Художественная литература',
  'programming' = 'Программирование',
  'hobby' = 'Хобби',
  'design' = 'Дизайн',
  'childish' = 'Детские',
  'other' = 'Другое',
}

export enum ErrorText {
  NoError = '',
  CategoryError = 'В этой категории книг ещё нет',
  RequestError = 'По запросу ничего не найдено',
  ApiError = 'Что-то пошло не так. Обновите страницу через некоторое время.',
}
