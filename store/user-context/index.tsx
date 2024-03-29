import { userService } from '@client/services/user.service';
import { useToast } from '@store/toast-context';
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
    weeklyExercise?: number;
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
  | { [EPrefences.SHOW_WEEKLY_WATER]: boolean };
export type IShareLinkPreference = {
  [EPrefences.IS_PROFILE_SHARED]: boolean;
};

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
  updateShareLinkPreference: (args: IShareLinkPreference) => void;
  updateShareLink: (args: IUpdateShareLinkArgs) => void;
}

export const initialState: IUserContext = {
  user: null,
  userLoggedIn: false,
  setInitialUser: () => null,
  updateUser: () => null,
  updatePreferences: () => null,
  updateShareLinkPreference: () => null,
  updateShareLink: () => null,
};

const UserContext = createContext(initialState);

export const UserContextProvider: FC<{
  children: ReactNode;
  initialState?: Partial<IUserContext>;
}> = ({ children, initialState }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState<IUserModel | null>(
    initialState?.user || null,
  );
  const [updatedUserFields, setUpdatedUserFields] = useState<
    IPartialUserUpdate[]
  >([]);
  const [updatedPreferences, setUpdatedPreferences] = useState<
    IPartialPreference[]
  >([]);
  const [updatedSharePreference, setUpdatedSharePreferences] = useState<
    IShareLinkPreference[]
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
        showToast({
          status: 'error',
          title: 'Error!',
          message:
            'Something went wrong when updating your details. Please try again later.',
        });
        return console.error('Error updating user:', error);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedUserFields, showToast]);

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
        showToast({
          status: 'error',
          title: 'Error!',
          message:
            'Something went wrong when updating your preferences. Please try again later.',
        });
        return console.error('Error updating preferences:', error);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedPreferences, showToast]);

  useEffect(() => {
    if (!updatedSharePreference.length) {
      return;
    }

    const timer = setTimeout(async () => {
      const payload = updatedSharePreference.reduce((curr, preference) => {
        return { ...curr, ...preference };
      }, {} as IShareLinkPreference);

      setUpdatedSharePreferences([]);

      const { error } = await userService.updateSharePreference({
        ...payload,
      });

      if (error) {
        showToast({
          status: 'error',
          title: 'Error!',
          message:
            'Something went wrong when updating your preferences. Please try again later.',
        });
        return console.error('Error updating preferences:', error);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedSharePreference, showToast]);

  const setInitialUser = useCallback((initialUser: IUserModel) => {
    setUser(initialUser);
  }, []);

  const updateUser = useCallback((updatedUser: IPartialUserUpdate) => {
    setUser((curr) => {
      if (!curr) {
        return null;
      }

      return {
        ...getStructuredClone(curr),
        ...updatedUser,
      };
    });

    setUpdatedUserFields((curr) => [...curr, updatedUser]);
  }, []);

  const updatePreferences = useCallback((preference: IPartialPreference) => {
    setUser((curr) => {
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

  const updateShareLinkPreference = useCallback(
    (preference: IShareLinkPreference) => {
      setUser((curr) => {
        if (!curr) {
          return null;
        }

        return {
          ...getStructuredClone(curr),
          preferences: {
            ...getStructuredClone(curr.preferences),
            ...preference,
          },
        };
      });

      setUpdatedSharePreferences((curr) => [...curr, preference]);
    },
    [],
  );

  const updateShareLink = useCallback(
    ({ shareLink, toggleShare }: IUpdateShareLinkArgs) => {
      setUser((curr) => {
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
    [],
  );

  const context = useMemo(
    () => ({
      user,
      userLoggedIn: !!user,
      setInitialUser,
      updateUser,
      updatePreferences,
      updateShareLink,
      updateShareLinkPreference,
    }),
    [
      user,
      setInitialUser,
      updateUser,
      updatePreferences,
      updateShareLink,
      updateShareLinkPreference,
    ],
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext<IUserContext>(UserContext);
