import { EThemeDark, EThemeLight } from '@utils/constants/theme.constants';
import { getStructuredClone } from '@utils/get-structured-clone';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';

export enum EUser {
  NAME = 'name',
  EMAIL = 'email',
  AVATAR = 'avatar',
  SHARE_LINK = 'shareLink',
  DARK_MODE = 'darkMode',
  THEME = 'theme',
  STATS = 'stats',
  PREFERENCES = 'preferences',
}
export enum EPrefences {
  SHOW_DAY_STREAK = 'showDayStreak',
  SHOW_WEEKLY_EXERCISE = 'showWeeklyExcercise',
  SHOW_WEEKLY_WATER = 'showWeeklyWater',
  IS_PROFILE_SHARED = 'isProfileShared',
}

export interface IUserTheme {
  light: EThemeLight | null;
  dark: EThemeDark | null;
}

export interface IUserModel {
  [EUser.NAME]: string;
  [EUser.EMAIL]: string;
  [EUser.AVATAR]: string;
  [EUser.DARK_MODE]: boolean;
  [EUser.THEME]: IUserTheme;
  [EUser.SHARE_LINK]: string;
  [EUser.PREFERENCES]: {
    [EPrefences.SHOW_DAY_STREAK]?: boolean;
    [EPrefences.SHOW_WEEKLY_EXERCISE]?: boolean;
    [EPrefences.SHOW_WEEKLY_WATER]?: boolean;
    [EPrefences.IS_PROFILE_SHARED]?: boolean;
  };
  [EUser.STATS]?: {
    dayStreak: number;
    weeklyExercise: string;
    weeklyWater: number;
  };
}
export interface IPreferenceModel {}

type IPartialUserUpdate =
  | { [EUser.NAME]: string }
  | { [EUser.EMAIL]: string }
  | { [EUser.AVATAR]: string }
  | { [EUser.DARK_MODE]: boolean }
  | { [EUser.SHARE_LINK]: string };

type IPartialPreference =
  | { [EPrefences.SHOW_DAY_STREAK]?: boolean }
  | { [EPrefences.SHOW_WEEKLY_EXERCISE]: boolean }
  | { [EPrefences.SHOW_WEEKLY_WATER]: boolean }
  | { [EPrefences.IS_PROFILE_SHARED]: boolean };

type IPartialTheme = { light: EThemeLight } | { dark: EThemeDark };

export interface IUserContext {
  user: IUserModel;
  updateUser: (updated: IPartialUserUpdate) => void;
  updatePreferences: (preferences: IPartialPreference) => void;
  updateTheme: (theme: IPartialTheme) => void;
}

const initialState: IUserContext = {
  user: {
    name: 'Test Username',
    email: 'test@address.com',
    avatar: '',
    shareLink: '',
    darkMode: true,
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
  },
  updateUser: () => null,
  updatePreferences: () => null,
  updateTheme: () => null,
};

const UserContext = createContext(initialState);

export const UserContextProvider: FC<{
  children: ReactNode;
  initialState?: IUserContext;
}> = ({ children }) => {
  const [updatedFields, setUpdatedFields] = useState<IPartialUserUpdate[]>([]);
  const [updatedPreferences, setUpdatedPreferences] = useState<
    IPartialPreference[]
  >([]);
  const [updatedTheme, setUpdatedTheme] = useState<IPartialTheme[]>([]);
  const [user, setCurrentUser] = useState<IUserModel>(initialState?.user || {});

  useEffect(() => {
    if (!updatedFields.length) {
      return;
    }

    const timer = setTimeout(async () => {
      const payload = updatedFields.reduce((curr, update) => {
        return { ...curr, ...update };
      }, {} as IPartialUserUpdate);

      console.log('USER PATCH:', payload);

      setUpdatedFields([]);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedFields]);

  useEffect(() => {
    if (!updatedPreferences.length) {
      return;
    }

    const timer = setTimeout(async () => {
      const payload = updatedPreferences.reduce((curr, preference) => {
        return { ...curr, ...preference };
      }, {} as IPartialPreference);

      console.log('PREFERENCES PATCH:', payload);

      setUpdatedPreferences([]);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedPreferences]);

  useEffect(() => {
    if (!updatedTheme.length) {
      return;
    }

    const timer = setTimeout(async () => {
      const payload = updatedTheme.reduce((curr, theme) => {
        return { ...curr, ...theme };
      }, {} as IPartialTheme);

      console.log('THEME PATCH:', payload);

      setUpdatedTheme([]);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedTheme]);

  const updateUser = useCallback((update: IPartialUserUpdate) => {
    setCurrentUser((curr) => ({ ...getStructuredClone(curr), ...update }));
    setUpdatedFields((curr) => [...curr, update]);
  }, []);

  const updatePreferences = useCallback((preference: IPartialPreference) => {
    setCurrentUser((curr) => ({
      ...getStructuredClone(curr),
      preferences: { ...getStructuredClone(curr.preferences), ...preference },
    }));
    setUpdatedPreferences((curr) => [...curr, preference]);
  }, []);

  const updateTheme = useCallback((theme: IPartialTheme) => {
    setCurrentUser((curr) => ({
      ...getStructuredClone(curr),
      theme: { ...getStructuredClone(curr.theme), ...theme },
    }));
    setUpdatedTheme((curr) => [...curr, theme]);
  }, []);

  const context = useMemo(
    () => ({ user, updateUser, updatePreferences, updateTheme }),
    [user, updateUser, updatePreferences, updateTheme]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext<IUserContext>(UserContext);
