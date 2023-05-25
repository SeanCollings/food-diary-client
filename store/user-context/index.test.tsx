import { render, waitFor } from '@testing-library/react';
import { userService } from '@client/services/user.service';
import { FC, useEffect } from 'react';
import {
  IUserModel,
  UserContextProvider,
  initialState,
  useUserContext,
} from '.';

jest.useFakeTimers();
jest.mock('@client/services/user.service');

const TestComponent = () => <div>Test component</div>;

const DisplayUser: FC<{
  user: IUserModel | null;
  userLoggedIn: boolean;
}> = ({ user, userLoggedIn }) => (
  <div>
    <div>User id: {user?.id}</div>
    <div>User name: {user?.name}</div>
    <div>User email: {user?.email}</div>
    <div>User sharelink: {user?.shareLink}</div>
    <div>User preferences: {JSON.stringify(user?.preferences)}</div>
    <div>User stats: {JSON.stringify(user?.stats)}</div>
    <div>User logged in: {userLoggedIn.toString()}</div>
  </div>
);

const MockInitialUserComponent: FC<{ runInitial?: boolean }> = ({
  runInitial,
}) => {
  const { user, userLoggedIn, setInitialUser } = useUserContext();

  useEffect(() => {
    if (runInitial) {
      setInitialUser({
        id: 'initial_id',
        name: 'Initial Name',
        email: 'initial@email.com',
        preferences: {
          showDayStreak: true,
          isProfileShared: false,
          showWeeklyExcercise: true,
        },
        stats: { dayStreak: 5, weeklyExercise: 12, weeklyWater: 2 },
        shareLink: 'mock_sharelink',
      });
    }
  }, [runInitial, setInitialUser]);

  return <DisplayUser user={user} userLoggedIn={userLoggedIn} />;
};

const MockUpdateUser: FC = ({}) => {
  const {
    user,
    userLoggedIn,
    updateUser,
    updatePreferences,
    updateShareLinkPreference,
  } = useUserContext();

  useEffect(() => {
    updateUser({ name: 'New Mock Name' });
    updatePreferences({
      showDayStreak: false,
      showWeeklyExcercise: false,
      showWeeklyWater: false,
    });
    updateShareLinkPreference({ isProfileShared: false });
  }, [updateUser, updatePreferences, updateShareLinkPreference]);

  jest.runAllTimers();

  return <DisplayUser user={user} userLoggedIn={userLoggedIn} />;
};

const MockUpdatShareLinkUser: FC<{ toggleShare?: boolean }> = ({
  toggleShare = true,
}) => {
  const { user, userLoggedIn, updateShareLink } = useUserContext();

  useEffect(() => {
    updateShareLink({ shareLink: 'updated_share_link', toggleShare });
  }, [toggleShare, updateShareLink]);

  return <DisplayUser user={user} userLoggedIn={userLoggedIn} />;
};

describe('store - user-context', () => {
  const mockUserService = jest.mocked(userService);
  const mockError = jest.fn();

  const mockInitialStateUser: IUserModel = {
    id: 'mock_id',
    name: 'Mock User',
    email: 'test@emal.com',
    preferences: {
      isProfileShared: true,
      showDayStreak: true,
      showWeeklyExcercise: true,
      showWeeklyWater: true,
    },
    stats: { dayStreak: 2, weeklyWater: 12 },
  };

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(mockError);
  });

  beforeEach(() => {
    mockUserService.updateUser.mockResolvedValue({} as any);
    mockUserService.updatePreferences.mockResolvedValue({} as any);
    mockUserService.updateSharePreference.mockResolvedValue({} as any);
    mockUserService.generateLink.mockResolvedValue({} as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const {
      user,
      userLoggedIn,
      setInitialUser,
      updateUser,
      updatePreferences,
      updateShareLinkPreference,
      updateShareLink,
    } = initialState;

    expect(user).toBeNull();
    expect(userLoggedIn).toBeFalsy();
    expect(setInitialUser({} as any)).toBeNull();
    expect(updateUser({} as any)).toBeNull();
    expect(updatePreferences({} as any)).toBeNull();
    expect(updateShareLinkPreference({} as any)).toBeNull();
    expect(updateShareLink({} as any)).toBeNull();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with initial-state', () => {
    const { asFragment } = render(
      <UserContextProvider
        initialState={{
          user: mockInitialStateUser,
          userLoggedIn: true,
        }}
      >
        <MockInitialUserComponent />
      </UserContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set initial user', () => {
    const { asFragment } = render(
      <UserContextProvider>
        <MockInitialUserComponent runInitial />
      </UserContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should update user', async () => {
    const { asFragment } = render(
      <UserContextProvider
        initialState={{
          user: mockInitialStateUser,
        }}
      >
        <MockUpdateUser />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updateUser).toHaveBeenCalled();
      expect(mockUserService.updatePreferences).toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).toHaveBeenCalled();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not update user if user is null', async () => {
    const { asFragment } = render(
      <UserContextProvider
        initialState={{
          user: null,
        }}
      >
        <MockUpdateUser />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updateUser).not.toHaveBeenCalled();
      expect(mockUserService.updatePreferences).not.toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).not.toHaveBeenCalled();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should catch error when updateUser fails', async () => {
    mockUserService.updateUser.mockResolvedValue({
      error: 'mock error occurred',
    });

    render(
      <UserContextProvider
        initialState={{
          user: mockInitialStateUser,
        }}
      >
        <MockUpdateUser />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updatePreferences).toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).toHaveBeenCalled();
      expect(mockUserService.updateUser).toHaveBeenCalled();
    });
    expect(mockError).toHaveBeenCalledWith(
      'Error updating user:',
      'mock error occurred',
    );
  });

  it('should catch error when updatePreferences fails', async () => {
    mockUserService.updatePreferences.mockResolvedValue({
      error: 'mock error occurred',
    });

    render(
      <UserContextProvider
        initialState={{
          user: mockInitialStateUser,
        }}
      >
        <MockUpdateUser />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updatePreferences).toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).toHaveBeenCalled();
      expect(mockUserService.updateUser).toHaveBeenCalled();
    });
    expect(mockError).toHaveBeenCalledWith(
      'Error updating preferences:',
      'mock error occurred',
    );
  });

  it('should catch error when updateSharePreference fails', async () => {
    mockUserService.updateSharePreference.mockResolvedValue({
      error: 'mock error occurred',
    });

    render(
      <UserContextProvider
        initialState={{
          user: mockInitialStateUser,
        }}
      >
        <MockUpdateUser />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updatePreferences).toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).toHaveBeenCalled();
      expect(mockUserService.updateUser).toHaveBeenCalled();
    });
    expect(mockError).toHaveBeenCalledWith(
      'Error updating preferences:',
      'mock error occurred',
    );
  });

  it('should update share-link with toggleShare true and set isProfileShared true', async () => {
    const { asFragment } = render(
      <UserContextProvider
        initialState={{
          user: {
            ...mockInitialStateUser,
            preferences: { isProfileShared: undefined },
          },
        }}
      >
        <MockUpdatShareLinkUser />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updateUser).not.toHaveBeenCalled();
      expect(mockUserService.updatePreferences).not.toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).not.toHaveBeenCalled();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should update share-link if toggleShare is false and not set isProfileShared', async () => {
    const { asFragment } = render(
      <UserContextProvider
        initialState={{
          user: {
            ...mockInitialStateUser,
            preferences: {
              ...mockInitialStateUser.preferences,
              isProfileShared: undefined,
            },
          },
        }}
      >
        <MockUpdatShareLinkUser toggleShare={false} />
      </UserContextProvider>,
    );

    await waitFor(() => {
      expect(mockUserService.updateUser).not.toHaveBeenCalled();
      expect(mockUserService.updatePreferences).not.toHaveBeenCalled();
      expect(mockUserService.updateSharePreference).not.toHaveBeenCalled();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not update sharelink if user is null', async () => {
    const { asFragment } = render(
      <UserContextProvider
        initialState={{
          user: null,
        }}
      >
        <MockUpdatShareLinkUser />
      </UserContextProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
