import { userService } from '@client/services/user.service';
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

export type IPartialUserUpdate =
  | { [EUser.NAME]: string }
  | { [EUser.AVATAR]: string };

export type IPartialPreference =
  | { [EPrefences.SHOW_DAY_STREAK]: boolean }
  | { [EPrefences.SHOW_WEEKLY_EXERCISE]: boolean }
  | { [EPrefences.SHOW_WEEKLY_WATER]: boolean }
  | { [EPrefences.IS_PROFILE_SHARED]: boolean };

interface IUpdateShareLinkArgs {
  shareLink: string;
  toggleShare: boolean;
}
export interface IUserContext {
  user: IUserModel | null;
  userLoggedIn: boolean;
  setInitialUser: (user: IUserModel) => void;
  updateUser: (updated: IPartialUserUpdate) => void;
  updatePreferences: (preferences: IPartialPreference) => void;
  updateShareLink: (args: IUpdateShareLinkArgs) => void;
}

const initialState: IUserContext = {
  user: null,
  userLoggedIn: false,
  setInitialUser: () => null,
  updateUser: () => null,
  updatePreferences: () => null,
  updateShareLink: () => null,
};

const UserContext = createContext(initialState);

export const UserContextProvider: FC<{
  children: ReactNode;
  initialState?: Partial<IUserContext>;
}> = ({ children, initialState }) => {
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

      setUpdatedUserFields([]);

      const { error } = await userService.updateUser({
        ...payload,
      });

      if (error) {
        console.log('Error:', error);
      }
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

      setUpdatedPreferences([]);

      const { error } = await userService.updatePreferences({
        ...payload,
      });

      if (error) {
        console.log('Error:', error);
      }
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

  const updateShareLink = useCallback(
    ({ shareLink, toggleShare }: IUpdateShareLinkArgs) => {
      setCurrentUser((curr) => {
        if (!curr) {
          return null;
        }

        return {
          ...getStructuredClone(curr),
          shareLink,
          preferences: {
            ...getStructuredClone(curr.preferences),
            ...(toggleShare ? { isProfileShared: true } : {}),
          },
        };
      });
    },
    []
  );

  const context = useMemo(
    () => ({
      user,
      userLoggedIn: !!user,
      setInitialUser,
      updateUser,
      updatePreferences,
      updateShareLink,
    }),
    [user, setInitialUser, updateUser, updatePreferences, updateShareLink]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext<IUserContext>(UserContext);
