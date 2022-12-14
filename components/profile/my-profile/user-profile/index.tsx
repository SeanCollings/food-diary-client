import Modal from '@components/modals';
import ModalShareProfile from '@components/modals/share-profile';
import { useUserContext } from '@store/user-context';
import { COLOURS, OPACITY_40 } from '@utils/constants';
import { formatMinutesToHoursMinutes } from '@utils/time-utils';
import { FC, useState } from 'react';
import { MdAccountCircle, MdPhotoCamera, MdSettings } from 'react-icons/md';
import styled from 'styled-components';

const SLine = styled.div`
  border-bottom: 1px solid ${COLOURS.gray}${OPACITY_40};
`;
const STopContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;
const SAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const SSettingsButton = styled.button`
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  border: 0px;
  background: transparent;
  transform: rotate(0deg);
  transition: transform 0.1s;

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
    transform: rotate(90deg);
  }
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
const SStatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const SStatWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SStatValue = styled.div`
  font-size: 28px;
  line-height: 1.1;
  color: var(--th-primary);
`;
const SStatLabel = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  color: ${COLOURS.gray};
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
  transition: 0.2s;
  color: var(--text);
  background-color: var(--th-primary);

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
  }
`;

interface IUserProfile {
  settingsClick: () => void;
}

const UserProfile: FC<IUserProfile> = ({ settingsClick }) => {
  const { user } = useUserContext();
  const [profileShared, setProfileShared] = useState(false);

  const shareProfileHandler = () => {
    setProfileShared(true);
  };

  return (
    <>
      <STopContainer>
        <SSettingsButton onClick={settingsClick} title="settings">
          <MdSettings size={34} color={COLOURS.gray} />
        </SSettingsButton>
        <SAvatarContainer>
          <SAvatar
            size={100}
            color={'var(--th-primary)'}
            title="Change avatar"
          />
          <SCameraContainer>
            <MdPhotoCamera size={24} />
          </SCameraContainer>
        </SAvatarContainer>
        <SEmail>{user?.email}</SEmail>
      </STopContainer>
      <SLine />
      <div>
        <SProfileHeader>My Profile</SProfileHeader>
        <SName>{user?.name}</SName>
      </div>
      <SLine />
      {!!user?.stats && (
        <SStatsContainer>
          {user.preferences?.showDayStreak && (
            <SStatWrapper title="Latest streak where each day in a row an entry has been added">
              <SStatValue>{user.stats.dayStreak}</SStatValue>
              <SStatLabel>day streak</SStatLabel>
            </SStatWrapper>
          )}
          {user?.preferences?.showWeeklyExcercise && (
            <SStatWrapper title="Shows total excercise for the past 7 days">
              <SStatValue>
                {formatMinutesToHoursMinutes(user.stats.weeklyExercise)}
              </SStatValue>
              <SStatLabel>weekly excercise</SStatLabel>
            </SStatWrapper>
          )}
          {user?.preferences?.showWeeklyWater && (
            <SStatWrapper title="Shows total water for the past 7 days">
              <SStatValue>{user.stats.weeklyWater}</SStatValue>
              <SStatLabel>weekly water</SStatLabel>
            </SStatWrapper>
          )}
        </SStatsContainer>
      )}
      <SButtonContainer>
        <SShareButton onClick={shareProfileHandler}>Share Profile</SShareButton>
      </SButtonContainer>
      <Modal show={profileShared} modalWidth={600}>
        <ModalShareProfile onClose={() => setProfileShared(false)} />
      </Modal>
    </>
  );
};

export default UserProfile;
