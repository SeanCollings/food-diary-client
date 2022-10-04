import MyProfile from '@components/profile/my-profile';
import ProfileLife from '@components/profile/profile-life';
import { NextPage } from 'next';
import styled from 'styled-components';

const SProfileContainer = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  padding: 20px 0;
`;

const ProilePage: NextPage = () => {
  return (
    <SProfileContainer>
      <MyProfile />
      <ProfileLife />
    </SProfileContainer>
  );
};

export default ProilePage;
