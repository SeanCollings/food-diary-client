export enum EMenuItems {
  MY_DIARY = 'my_diary',
  MY_PROFILE = 'my_profile',
  LOGIN = 'login',
  HOME = 'home',
  SUMMARY = 'summary',
}
export type TMenuItems = `${EMenuItems}`;

export const pathnameMapper: { [key in EMenuItems]: string } = {
  [EMenuItems.MY_DIARY]: '/',
  [EMenuItems.MY_PROFILE]: '/profile',
  [EMenuItems.LOGIN]: '/login',
  [EMenuItems.HOME]: '/home',
  [EMenuItems.SUMMARY]: '/summary',
};

interface IMenuItem {
  id: TMenuItems;
  title: string;
  href: string;
}

export const MENU_ITEMS: IMenuItem[] = [
  {
    id: EMenuItems.MY_DIARY,
    title: 'My Diary',
    href: pathnameMapper.my_diary,
  },
  {
    id: EMenuItems.SUMMARY,
    title: 'My Summary',
    href: pathnameMapper.summary,
  },
  {
    id: EMenuItems.MY_PROFILE,
    title: 'My Profile',
    href: pathnameMapper.my_profile,
  },
  {
    id: EMenuItems.LOGIN,
    title: 'Login',
    href: pathnameMapper.login,
  },
];
