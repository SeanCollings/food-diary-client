import { IUserModel } from '@store/user-context';

export const userMock: IUserModel = {
  id: '123456789',
  name: 'Test Username',
  email: 'test@address.com',
  avatar: '',
  shareLink: '',
  preferences: {
    showDayStreak: true,
  },
  stats: {
    dayStreak: 5,
    weeklyExercise: '03:25',
    weeklyWater: 32,
  },
};
