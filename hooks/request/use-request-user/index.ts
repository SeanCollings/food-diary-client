import { useEffect } from 'react';
import { URI_USER_PROFILE } from '@client/constants';
import { userProfileFetcher } from '@client/fetchers';
import { IUserResponse } from '@client/interfaces/user-data.type';
import { useUserContext } from '@store/user-context';
import useSWRImmutable from 'swr/immutable';

export const useRequestUser = (mounted: boolean) => {
  const { user, setInitialUser } = useUserContext();

  const shouldFetch = mounted && !user;

  const { data, error } = useSWRImmutable(
    shouldFetch ? [URI_USER_PROFILE] : null,
    userProfileFetcher<IUserResponse>,
    {},
  );

  useEffect(() => {
    if (data?.user) {
      setInitialUser(data.user);
    }
  }, [data, setInitialUser]);

  return {
    data: data?.user,
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
