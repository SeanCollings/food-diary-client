import Toggle from '@components/ui/toggle';
import { useUserContext } from '@store/user-context';
import { COLOURS, OPACITY_40 } from '@utils/app.constants';
import { FC } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import ThemeDisplay from '@components/profile/my-profile/theme-display';
import EditInput from '@components/profile/my-profile/edit-input';
import { useTheme } from '@hooks/use-theme';

const SContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  height: 100%;
`;
const STopContainer = styled.div``;
const SHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 28px;
  line-height: 1;
  height: 40px;
`;
const SCancelButton = styled.button`
  display: flex;
  padding: 0;
  font-size: 16px;
  border: 0px;
  cursor: pointer;
  background: transparent;

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
  }
`;
const SPreferenceContainer = styled.div``;
const SPreferenceHeader = styled.div`
  font-size: 20px;
  height: 40px;
`;
const SPanel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  font-weight: 200;
  border-bottom: 1px solid ${COLOURS.gray}${OPACITY_40};
`;

interface ISettingsProfile {
  onCancel: () => void;
}

const SettingsProfile: FC<ISettingsProfile> = ({ onCancel }) => {
  const { theme, darkMode, setTheme } = useTheme();
  const { user, updateUser, updatePreferences } = useUserContext();

  const updateDarkMode = () => {
    const newTheme = !theme ? 'light_1' : darkMode ? 'light_1' : 'dark_1';
    setTheme(newTheme);
  };
  const updatePreferenceStreak = () => {
    updatePreferences({
      showDayStreak: !user?.preferences?.showDayStreak,
    });
  };
  const updatePreferenceExcercise = () => {
    updatePreferences({
      showWeeklyExcercise: !user?.preferences?.showWeeklyExcercise,
    });
  };
  const updatePreferenceWater = () => {
    updatePreferences({
      showWeeklyWater: !user?.preferences?.showWeeklyWater,
    });
  };
  const updateUsername = (name: string) => {
    updateUser({ name });
  };

  return (
    <SContainer>
      <STopContainer>
        <SHeader>
          Settings
          <SCancelButton onClick={onCancel} title="cancel" tabIndex={0}>
            <MdClose size={34} color={COLOURS.gray} />
          </SCancelButton>
        </SHeader>
        <SPanel>
          Dark mode
          <Toggle onChange={updateDarkMode} checked={darkMode} />
        </SPanel>
        <SPanel>
          Theme
          <ThemeDisplay />
        </SPanel>
        <SPanel>
          <EditInput value={user?.name || ''} onSave={updateUsername} />
        </SPanel>
      </STopContainer>
      <SPreferenceContainer>
        <SPreferenceHeader>Preferences</SPreferenceHeader>
        <SPanel>
          Show day streak
          <Toggle
            onChange={updatePreferenceStreak}
            checked={user?.preferences?.showDayStreak}
          />
        </SPanel>
        <SPanel>
          Show weekly excercise
          <Toggle
            onChange={updatePreferenceExcercise}
            checked={user?.preferences?.showWeeklyExcercise}
          />
        </SPanel>
        <SPanel>
          Show weekly water
          <Toggle
            onChange={updatePreferenceWater}
            checked={user?.preferences?.showWeeklyWater}
          />
        </SPanel>
      </SPreferenceContainer>
    </SContainer>
  );
};

export default SettingsProfile;
