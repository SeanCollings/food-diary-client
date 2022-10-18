import { IUserModel } from '@store/user-context';
import { EThemeDark, EThemeLight } from '@utils/constants/theme.constants';

export const userMock: IUserModel = {
  id: '123456789',
  name: 'Test Username',
  email: 'test@address.com',
  avatar: '',
  shareLink: '',
  darkMode: false,
  theme: {
    light: EThemeLight.DEFAULT_LIGHT,
    dark: EThemeDark.CUPCAKE_SPRINKLES,
  },
  preferences: {
    showDayStreak: true,
  },
  stats: {
    dayStreak: 5,
    weeklyExercise: '03:25',
    weeklyWater: 32,
  },
};
