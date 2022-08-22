export enum EMenuItems {
  MY_DIARY = 'my_diary',
  MY_PROFILE = 'my_profile',
  LOGIN = 'login',
}

interface IMenuItem {
  id: EMenuItems;
  title: string;
  href: string;
}

export const MENU_ITEMS: IMenuItem[] = [
  {
    id: EMenuItems.MY_DIARY,
    title: 'My Diary',
    href: '/',
  },
  {
    id: EMenuItems.MY_PROFILE,
    title: 'My Profile',
    href: '/profile',
  },
  {
    id: EMenuItems.LOGIN,
    title: 'Login',
    href: '/login',
  },
];
