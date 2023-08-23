import { useEffect } from 'react';
import { URI_USER_PROFILE } from '@client/constants';
import { userProfileFetcher } from '@client/fetchers';
import { IUserResponse } from '@client/interfaces/user-data.type';
import { useUserContext } from '@store/user-context';
import useSWR from 'swr';
import { useWellnessEntriesContext } from '@store/wellness-entries-context';

export const useRequestUpdateUser = (shouldFetch: boolean) => {
  const { setInitialUser } = useUserContext();
  const { resetWellnessUpdated } = useWellnessEntriesContext();

  const { data, error, isValidating } = useSWR(
    shouldFetch ? [URI_USER_PROFILE] : null,
    userProfileFetcher<IUserResponse>,
    {},
  );

  useEffect(() => {
    if (!isValidating && data?.user) {
      setInitialUser(data.user);
      resetWellnessUpdated();
    }
  }, [data, isValidating, setInitialUser, resetWellnessUpdated]);

  return {
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
