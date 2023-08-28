import Modal from '@components/modals';
import ModalShareProfile from '@components/modals/share-profile';
import { Button } from '@components/ui/button';
import { useUserContext } from '@store/user-context';
import { COLOURS, MEDIA_MOBILE, OPACITY_40 } from '@utils/app.constants';
import { formatMinutesToHoursMinutes } from '@utils/time-utils';
import { FC, useState } from 'react';
import {
  MdAccountCircle,
  MdInfo,
  MdInfoOutline,
  MdPhotoCamera,
  MdSettings,
} from 'react-icons/md';
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
  flex-basis: 33%;
  gap: 4px;
`;
const SStatWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: fit-content;
`;
const SStatValue = styled.div`
  font-size: 28px;
  line-height: 1.1;
  color: var(--th-primary);
`;
const SStatLabelWrapper = styled.div`
  position: relative;
  display: block;

  :hover {
    .info {
      opacity: 1;
    }
    .info-outline {
      opacity: 0;
    }
  }
`;
const SStatLabel = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  color: ${COLOURS.gray};
`;
const SInfoIconOutline = styled(MdInfoOutline)`
  transition: 250ms;

  ${MEDIA_MOBILE} {
    display: none;
  }
`;
const SInfoIcon = styled(MdInfo)`
  position: absolute;
  right: 0;
  bottom: 4px;
  opacity: 0;

  transition: 250ms;

  ${MEDIA_MOBILE} {
    display: none;
  }
`;
const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

interface IUserProfile {
  settingsClick: () => void;
}

interface UserStatProps {
  show: boolean | undefined;
  stat: number | string | undefined;
  title: string;
  name: string;
}

const UserStat: FC<UserStatProps> = ({ show, stat, title, name }) => {
  if (!show) {
    return null;
  }

  return (
    <SStatWrapper>
      <SStatValue>{stat}</SStatValue>
      <SStatLabelWrapper title={title}>
        <SInfoIcon className="info" />
        <SStatLabel>{name}</SStatLabel>
        <SInfoIconOutline className="info-outline" />
      </SStatLabelWrapper>
    </SStatWrapper>
  );
};

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
          <UserStat
            show={user.preferences?.showDayStreak}
            stat={user.stats.dayStreak}
            name="day streak"
            title="Each day in a row an entry has been added"
          />
          <UserStat
            show={user.preferences?.showWeeklyExcercise}
            stat={formatMinutesToHoursMinutes(user.stats.weeklyExercise)}
            name="weekly excercise"
            title="Shows total excercise time for the past 7 days"
          />
          <UserStat
            show={user.preferences?.showWeeklyWater}
            stat={user.stats.weeklyWater}
            name="weekly water"
            title="Shows total water for the past 7 days"
          />
        </SStatsContainer>
      )}
      <SButtonContainer>
        <Button onClick={shareProfileHandler} fontSize={22} height={50}>
          Share Profile
        </Button>
      </SButtonContainer>
      <Modal show={profileShared} modalWidth={600}>
        <ModalShareProfile onClose={() => setProfileShared(false)} />
      </Modal>
    </>
  );
};

export default UserProfile;
