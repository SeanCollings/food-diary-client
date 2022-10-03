import { MEDIA_MOBILE } from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import SettingsProfile from '@components/profile/my-profile/settings-profile';
import UserProfile from '@components/profile/my-profile/user-profile';
import {
  ThemeBackgroundSecondary,
  ThemeBorderBottom,
} from '@components/ui/style-themed';

const SContainer = styled.div`
  position: relative;
  flex: 1;
  border-radius: 12px;
  padding: 40px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 560px;
  min-width: 400px;
  ${ThemeBackgroundSecondary}
  ${ThemeBorderBottom}

  ${MEDIA_MOBILE} {
    padding: 20px;
    min-width: 100%;
  }
`;

const MyProfile: FC = () => {
  const [settingsSelected, setSettingsSelected] = useState(false);

  return (
    <SContainer>
      {!settingsSelected && (
        <UserProfile settingsClick={() => setSettingsSelected(true)} />
      )}
      {settingsSelected && (
        <SettingsProfile onCancel={() => setSettingsSelected(false)} />
      )}
    </SContainer>
  );
};

export default MyProfile;
