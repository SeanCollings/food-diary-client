import {
  APP_THEME_DEFAULT,
  COLOURS,
  MEDIA_MOBILE,
  OPACITY_40,
} from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';
import { MdAccountCircle, MdPhotoCamera } from 'react-icons/md';

const SContainer = styled.div`
  position: relative;
  background: ${COLOURS.white};
  flex: 1;
  border-radius: 12px;
  padding: 40px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid gainsboro;
  height: 540px;

  ${MEDIA_MOBILE} {
    padding: 20px;
  }
`;
const STopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOURS.gray}${OPACITY_40};
  margin-bottom: 16px;
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
const SEmail = styled.div`
  line-height: 1.02em;
  color: ${COLOURS.gray};
  font-size: 15px;
`;
const SProfileHeader = styled.div`
  line-height: 1.02em;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 8px;
`;
const SName = styled.div`
  font-size: 16px;
  padding-bottom: 8px;
`;
const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
const SShareButton = styled.button`
  outline: none;
  cursor: pointer;
  font-size: 22px;
  padding: 8px 12px;
  border: 1px solid;
  border-radius: 8px;
  height: 50px;
  background: ${APP_THEME_DEFAULT.primary};
  color: ${APP_THEME_DEFAULT.textLight};
`;

const MyProfile: FC = () => {
  return (
    <SContainer>
      <STopContainer>
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
        <SEmail>email@address.com</SEmail>
      </STopContainer>
      <SProfileHeader>My Profile</SProfileHeader>
      <SName>Name Surname</SName>
      <SButtonContainer>
        <SShareButton>Share Profile</SShareButton>
      </SButtonContainer>
    </SContainer>
  );
};

export default MyProfile;
