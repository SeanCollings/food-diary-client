import MyProfile from '@components/profile/my-profile';
import ProfileLife from '@components/profile/profile-life';
import { NextPage } from 'next';
import styled from 'styled-components';
import { protectedSeverSideProps } from '@lib/server-props';
import { useEffect, useState } from 'react';
import { useRequestUpdateUser } from '@hooks/request/user/use-request-update-user';
import { useWellnessEntriesContext } from '@store/wellness-entries-context';

const SProfileContainer = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  padding: 20px 0;
`;

const ProfilePage: NextPage = () => {
  const { wellnessUpdated } = useWellnessEntriesContext();
  const [shouldFetchUser, setShouldFetchUser] = useState(false);

  useRequestUpdateUser(wellnessUpdated && shouldFetchUser);

  useEffect(() => {
    if (!shouldFetchUser) {
      setShouldFetchUser(true);
    }
  }, [shouldFetchUser]);

  return (
    <SProfileContainer>
      <MyProfile />
      <ProfileLife />
    </SProfileContainer>
  );
};

export const getServerSideProps = protectedSeverSideProps;

export default ProfilePage;
