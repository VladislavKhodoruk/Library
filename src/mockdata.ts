import defaultAvatar from './assets/defaultAvatar.png';
import { HeaderProps } from './components/header/interfaces';

export const defaultUser: HeaderProps = { username: 'Иван', imgLink: defaultAvatar };

export const MOCK_DATA = [
  {
    id: 1,
    name: 'heloo world',
    description: 'wddwdwdw',
    price: 12,
    date: new Date(22, 3, 2022),
  },
  {
    id: 2,
    name: 'heloo world',
    description: 'wddwdwdw',
    price: 14,
    date: new Date(22, 3, 2022),
  },
  {
    id: 3,
    name: 'heloo world',
    description: 'wddwdwdw',
    price: 123,
    date: new Date(22, 4, 2022),
  },
];
