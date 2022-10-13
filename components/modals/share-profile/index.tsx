import {
  ThemeBackgroundTertiary,
  ThemeTextColor,
} from '@components/ui/style-themed';
import Toggle from '@components/ui/toggle';
import { useTheme } from '@hooks/use-theme';
import { useUserContext } from '@store/user-context';
import { COLOURS, MEDIA_MOBILE, OPACITY_40 } from '@utils/constants';
import {
  SHARE_INFORMATION,
  SHARE_PRE_GENERATE,
} from '@utils/constants/profile.constants';
import { createGuid } from '@utils/string-utils';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

interface ISButton {
  isDisabled?: boolean;
  primary?: string;
}
interface ISLink {
  primary: string;
}

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 30px;
  border-radius: 16px;
  ${ThemeTextColor}
  ${ThemeBackgroundTertiary}
`;
const STopContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOURS.gray}${OPACITY_40};
`;
const SHeader = styled.div`
  font-size: 28px;
  padding-bottom: 8px;
`;
const SCloseButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
  }
`;
const SShareableContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 10px;
`;
const SLinkContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  min-width: 0;

  ${MEDIA_MOBILE} {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: end;
  }
`;
const SLink = styled.input<ISLink>`
  user-select: all;
  cursor: default;
  opacity: 0.8;
  width: 100%;
  height: 30px;
  font-size: 15px;
  border-radius: 4px;
  padding: 4px 8px;
  user-select: none;
  border: 1px solid ${COLOURS.gray}${OPACITY_40};
  ${ThemeBackgroundTertiary}
  ${ThemeTextColor}

  &.copied {
    animation: 0.5s copied ease-in none;
  }

  @keyframes copied {
    0% {
      opacity: 1;
      border-color: ${({ primary }) => primary};
      box-shadow: inset 0px 0px 4px 2px ${({ primary }) => primary};
    }
    100% {
      opacity: 0.8;
      border-color: ${COLOURS.gray}${OPACITY_40};
      box-shadow: inset 0px 0px 0px 0px transparent;
    }
  }
`;
const SInformationContainer = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 200;
  font-size: 15px;
`;
const SGenerateButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`;
const SButton = styled.button<ISButton>`
  cursor: pointer;
  transition: 0.2s;
  min-width: 120px;
  max-width: 200px;
  padding: 4px 8px;
  font-size: 18px;
  border: 1px solid;
  border-radius: 4px;

  background-color: ${({ primary }) => primary || 'transparent'};
  ${ThemeTextColor}

  &.subtle {
    border: 0;
    background-color: transparent;
    ${({ primary }) => primary && `color: ${primary}`}
  }

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
  }

  &.disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

interface IModalShareProfileProps {
  onClose: () => void;
}

const getShareLink = (shareLink: string) =>
  `${window?.location.origin}/share/${shareLink}`;

const ModalShareProfile: React.FC<IModalShareProfileProps> = ({ onClose }) => {
  const theme = useTheme();
  const linkRef = useRef<HTMLInputElement>(null);
  const { user, updatePreferences, updateUser } = useUserContext();

  const onToggleChange = () => {
    updatePreferences({ isProfileShared: !user.preferences.isProfileShared });
  };
  const onCreateLinkHandler = () => {
    updatePreferences({ isProfileShared: true });
    updateUser({
      shareLink: createGuid(),
    });
  };
  const copyLinkClicked = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getShareLink(user.shareLink));
    }

    if (linkRef.current) {
      linkRef.current.classList.remove('copied');
      setTimeout(() => {
        linkRef.current?.classList.add('copied');
      }, 100);
    }
  };

  const linkAddress = user.shareLink
    ? getShareLink(user.shareLink)
    : 'No link created';
  const generateButtonText = !user.shareLink
    ? 'Generate link'
    : 'Generate new link';

  return (
    <SContainer>
      <STopContainer>
        <SHeader>Share your profile</SHeader>
        <SCloseButton onClick={onClose}>
          <MdClose size={34} color={COLOURS.gray} />
        </SCloseButton>
      </STopContainer>
      {user.shareLink && (
        <>
          <SShareableContainer>
            Shareable link
            <Toggle
              title={
                user.preferences.isProfileShared
                  ? 'Sharing is on'
                  : 'Sharing is off'
              }
              onChange={onToggleChange}
              checked={user.preferences.isProfileShared}
              disabled={!user.shareLink}
            />
          </SShareableContainer>
          <SLinkContainer>
            <SLink
              ref={linkRef}
              primary={theme.primary}
              value={linkAddress}
              readOnly
            />
            <SButton
              primary={theme.primary}
              disabled={!user.shareLink || !navigator.clipboard}
              className={
                !user.shareLink || !navigator.clipboard ? 'disabled' : ''
              }
              onClick={copyLinkClicked}
            >
              Copy link
            </SButton>
          </SLinkContainer>
        </>
      )}
      <SInformationContainer>
        {user.shareLink ? SHARE_INFORMATION : SHARE_PRE_GENERATE}
      </SInformationContainer>
      <SGenerateButtonContainer>
        <SButton
          onClick={onCreateLinkHandler}
          primary={theme.primary}
          className={user.shareLink ? 'subtle' : ''}
        >
          {generateButtonText}
        </SButton>
      </SGenerateButtonContainer>
    </SContainer>
  );
};

export default ModalShareProfile;
