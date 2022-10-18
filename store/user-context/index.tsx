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
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  AVATAR = 'avatar',
  SHARE_LINK = 'shareLink',
  STATS = 'stats',
  PREFERENCES = 'preferences',
}
export enum EPrefences {
  SHOW_DAY_STREAK = 'showDayStreak',
  SHOW_WEEKLY_EXERCISE = 'showWeeklyExcercise',
  SHOW_WEEKLY_WATER = 'showWeeklyWater',
  IS_PROFILE_SHARED = 'isProfileShared',
}

export interface IUserModel {
  [EUser.ID]: string;
  [EUser.NAME]: string;
  [EUser.EMAIL]: string;
  [EUser.AVATAR]?: string;
  [EUser.SHARE_LINK]?: string;
  [EUser.PREFERENCES]?: {
    [EPrefences.SHOW_DAY_STREAK]?: boolean;
    [EPrefences.SHOW_WEEKLY_EXERCISE]?: boolean;
    [EPrefences.SHOW_WEEKLY_WATER]?: boolean;
    [EPrefences.IS_PROFILE_SHARED]?: boolean;
  };
  [EUser.STATS]?: {
    dayStreak?: number;
    weeklyExercise?: string;
    weeklyWater?: number;
  };
}
export interface IPreferenceModel {}

type IPartialUserUpdate =
  | { [EUser.NAME]: string }
  | { [EUser.EMAIL]: string }
  | { [EUser.AVATAR]: string }
  | { [EUser.SHARE_LINK]: string };

type IPartialPreference =
  | { [EPrefences.SHOW_DAY_STREAK]?: boolean }
  | { [EPrefences.SHOW_WEEKLY_EXERCISE]: boolean }
  | { [EPrefences.SHOW_WEEKLY_WATER]: boolean }
  | { [EPrefences.IS_PROFILE_SHARED]: boolean };

export interface IUserContext {
  user: IUserModel | null;
  setInitialUser: (user: IUserModel) => void;
  updateUser: (updated: IPartialUserUpdate) => void;
  updatePreferences: (preferences: IPartialPreference) => void;
}

const initialState: IUserContext = {
  user: null,
  // user: {
  //   id: '',
  //   name: '',
  //   email: '',
  //   avatar: '',
  //   shareLink: '',
  //   darkMode: false,
  //   theme: {},
  //   preferences: {
  //     showDayStreak: true,
  //   },
  //   stats: {
  //     dayStreak: 5,
  //     weeklyExercise: '03:25',
  //     weeklyWater: 32,
  //   },
  // },
  setInitialUser: () => null,
  updateUser: () => null,
  updatePreferences: () => null,
};

const UserContext = createContext(initialState);

export const UserContextProvider: FC<{
  children: ReactNode;
  initialState?: Partial<IUserContext>;
}> = ({ children, initialState }) => {
  // console.log('initialState ::', initialState?.user);
  const [user, setCurrentUser] = useState<IUserModel | null>(
    initialState?.user || null
  );
  const [updatedUserFields, setUpdatedUserFields] = useState<
    IPartialUserUpdate[]
  >([]);
  const [updatedPreferences, setUpdatedPreferences] = useState<
    IPartialPreference[]
  >([]);

  useEffect(() => {
    if (!updatedUserFields.length) {
      return;
    }

    const timer = setTimeout(async () => {
      const payload = updatedUserFields.reduce((curr, update) => {
        return { ...curr, ...update };
      }, {} as IPartialUserUpdate);

      console.log('USER PATCH:', payload);

      setUpdatedUserFields([]);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedUserFields]);

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

  const setInitialUser = useCallback((unitialUser: IUserModel) => {
    setCurrentUser(unitialUser);
  }, []);

  const updateUser = useCallback((update: IPartialUserUpdate) => {
    setCurrentUser((curr) => {
      if (!curr) {
        return null;
      }

      return {
        ...(getStructuredClone(curr || {}) || {}),
        ...(curr ? update : {}),
      };
    });

    setUpdatedUserFields((curr) => [...curr, update]);
  }, []);

  const updatePreferences = useCallback((preference: IPartialPreference) => {
    setCurrentUser((curr) => {
      if (!curr) {
        return null;
      }

      return {
        ...getStructuredClone(curr),
        preferences: { ...getStructuredClone(curr.preferences), ...preference },
      };
    });
    setUpdatedPreferences((curr) => [...curr, preference]);
  }, []);

  const context = useMemo(
    () => ({
      user,
      setInitialUser,
      updateUser,
      updatePreferences,
    }),
    [user, setInitialUser, updateUser, updatePreferences]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext<IUserContext>(UserContext);
