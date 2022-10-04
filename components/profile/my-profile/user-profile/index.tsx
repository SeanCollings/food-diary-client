import { useTheme } from '@hooks/use-theme';
import { useUserContext } from '@store/user-context';
import { COLOURS, OPACITY_40 } from '@utils/constants';
import { FC } from 'react';
import { MdAccountCircle, MdPhotoCamera, MdSettings } from 'react-icons/md';
import styled from 'styled-components';

interface ISStatValue {
  primary: string;
}
interface ISShareButton {
  colour: string;
  background: string;
}

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
const SStatValue = styled.div<ISStatValue>`
  font-size: 28px;
  line-height: 1.1;
  color: ${({ primary }) => primary};
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
const SShareButton = styled.button<ISShareButton>`
  outline: none;
  cursor: pointer;
  font-size: 22px;
  padding: 8px 12px;
  border: 1px solid;
  border-radius: 8px;
  height: 50px;
  background: ${({ background }) => background};
  color: ${({ colour }) => colour};
`;

interface IUserProfile {
  settingsClick: () => void;
}

const UserProfile: FC<IUserProfile> = ({ settingsClick }) => {
  const theme = useTheme();
  const { user } = useUserContext();

  return (
    <>
      <STopContainer>
        <SSettingsButton onClick={settingsClick} title="settings">
          <MdSettings size={34} color={COLOURS.gray} />
        </SSettingsButton>
        <SAvatarContainer>
          <SAvatar size={100} color={theme.primary} title="Change avatar" />
          <SCameraContainer>
            <MdPhotoCamera size={24} />
          </SCameraContainer>
        </SAvatarContainer>
        <SEmail>{user.email}</SEmail>
      </STopContainer>
      <SLine />
      <div>
        <SProfileHeader>My Profile</SProfileHeader>
        <SName>{user.name}</SName>
      </div>
      <SLine />
      {!!user.stats && (
        <SStatsContainer>
          {user.preferences.showDayStreak && (
            <SStatWrapper>
              <SStatValue primary={theme.primary}>
                {user.stats.dayStreak}
              </SStatValue>
              <SStatLabel>day streak</SStatLabel>
            </SStatWrapper>
          )}
          {user.preferences.showWeeklyExcercise && (
            <SStatWrapper>
              <SStatValue primary={theme.primary}>
                {user.stats.weeklyExercise}
              </SStatValue>
              <SStatLabel>weekly excercise</SStatLabel>
            </SStatWrapper>
          )}
          {user.preferences.showWeeklyWater && (
            <SStatWrapper>
              <SStatValue primary={theme.primary}>
                {user.stats.weeklyWater}
              </SStatValue>
              <SStatLabel>weekly water</SStatLabel>
            </SStatWrapper>
          )}
        </SStatsContainer>
      )}
      <SButtonContainer>
        <SShareButton colour={theme.text} background={theme.primary}>
          Share Profile
        </SShareButton>
      </SButtonContainer>
    </>
  );
};

export default UserProfile;
