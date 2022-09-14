import { APP_THEME_DEFAULT, COLOURS } from '@utils/constants';
import { NextPage } from 'next';
import { MdAccountCircle, MdPhotoCamera } from 'react-icons/md';
import styled from 'styled-components';

const SProfileContainer = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
const SMyProfile = styled.div`
  background: ${COLOURS.white};
  flex: 1;
  border-radius: 20px;
  padding: 40px;
  min-width: 400px;
`;
const SAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const SCameraContainer = styled.div`
  position: absolute;
  transform: translateX(34px) translateY(-30px);
  opacity: 0.5;
`;
const SAvatar = styled(MdAccountCircle)`
  opacity: 0.7;
  cursor: pointer;

  :active {
    opacity: 0.5;
  }
`;
const SProfileLife = styled.div`
  background: ${COLOURS.white};
  flex: 2;
  border-radius: 20px;
  padding: 40px;
  min-width: 700px;
`;

enum EProfileLife {
  MY_STATS = 'my_stats',
  FOOD_TRENDS = 'food_trends',
}

const ProilePage: NextPage = () => {
  return (
    <SProfileContainer>
      <SMyProfile>
        <SAvatarContainer>
          <SAvatar
            size={100}
            color={APP_THEME_DEFAULT.primary}
            title="Change avatar"
          />
          <SCameraContainer>
            <MdPhotoCamera size={24} />
          </SCameraContainer>
        </SAvatarContainer>
        <div>My Profile</div>
        <div>Name Surname</div>
        <div>email@address.com</div>
        <div>Share Profile</div>
      </SMyProfile>
      <SProfileLife>1</SProfileLife>
    </SProfileContainer>
  );
};

export default ProilePage;
