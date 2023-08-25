import { userService } from '@client/services/user.service';
import Toggle from '@components/ui/toggle';
import { useToast } from '@store/toast-context';
import { useUserContext } from '@store/user-context';
import { COLOURS, MEDIA_MOBILE, OPACITY_40 } from '@utils/app.constants';
import {
  SHARE_INFORMATION,
  SHARE_PRE_GENERATE,
} from '@utils/constants/profile.constants';
import { getClassNames } from '@utils/string-utils';
import { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

interface ISButton {
  isDisabled?: boolean;
}
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 30px;
  border-radius: 16px;
  background-color: var(--bg-tertiary);
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
const SLink = styled.input`
  user-select: text;
  cursor: default;
  opacity: 0.8;
  width: 100%;
  height: 30px;
  font-size: 15px;
  border-radius: 4px;
  padding: 4px 8px;
  border: 1px solid ${COLOURS.gray}${OPACITY_40};
  background-color: var(--bg-tertiary);
  color: var(--text);

  &.copied {
    animation: 0.5s copied ease-in none;
  }

  @keyframes copied {
    0% {
      opacity: 1;
      border-color: var(--th-primary);
      box-shadow: inset 0px 0px 4px 2px var(--th-primary);
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
  color: var(--text);

  background-color: var(--th-primary);

  &.subtle {
    border: 0;
    background-color: transparent;
    color: var(--th-primary);
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

const getShareLink = (shareLink?: string) => {
  if (!shareLink) {
    return '';
  }

  return `${window?.location.origin}/share/${shareLink}`;
};

const ModalShareProfile: React.FC<IModalShareProfileProps> = ({ onClose }) => {
  const { showToast } = useToast();
  const linkRef = useRef<HTMLInputElement>(null);
  const { user, updateShareLinkPreference, updateShareLink } = useUserContext();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const generateLink = async () => {
      const { shareLink, error } = await userService.generateLink();

      if (error) {
        showToast({
          status: 'error',
          title: 'Error!',
          message:
            'Something went wrong when generating a new link. Please refresh and try again.',
        });
      }

      const toggleShare = !user?.shareLink;

      if (!error && shareLink) {
        updateShareLink({ shareLink, toggleShare });
      }

      setIsFetching(false);
    };

    if (isFetching) {
      generateLink();
    }
  }, [isFetching, updateShareLink, user?.shareLink, showToast]);

  const onToggleChange = () => {
    updateShareLinkPreference({
      isProfileShared: !user?.preferences?.isProfileShared,
    });
  };
  const onCreateLinkHandler = async () => {
    setIsFetching(true);
  };
  const copyLinkClicked = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getShareLink(user?.shareLink));
    }

    if (linkRef.current) {
      linkRef.current.classList.remove('copied');
      setTimeout(() => {
        linkRef.current?.classList.add('copied');
      }, 100);
    }
  };

  const onInputClick = () => {
    if (linkRef.current) {
      linkRef.current.select();
    }
  };

  const linkAddress = user?.shareLink
    ? getShareLink(user.shareLink)
    : 'No link created';
  const generateButtonText = !user?.shareLink
    ? 'Generate link'
    : 'Generate new link';

  const generateButtonClassNames = getClassNames({
    subtle: !!user?.shareLink,
    disabled: isFetching,
  });

  return (
    <SContainer>
      <STopContainer>
        <SHeader>Share your profile</SHeader>
        <SCloseButton onClick={onClose}>
          <MdClose size={34} color={COLOURS.gray} />
        </SCloseButton>
      </STopContainer>
      {user?.shareLink && (
        <>
          <SShareableContainer>
            Shareable link
            <Toggle
              title={
                user?.preferences?.isProfileShared
                  ? 'Sharing is on'
                  : 'Sharing is off'
              }
              onChange={onToggleChange}
              checked={user?.preferences?.isProfileShared}
              disabled={!user.shareLink}
            />
          </SShareableContainer>
          <SLinkContainer>
            <SLink
              ref={linkRef}
              value={linkAddress}
              readOnly
              onClick={onInputClick}
            />
            <SButton
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
        {user?.shareLink ? SHARE_INFORMATION : SHARE_PRE_GENERATE}
      </SInformationContainer>
      <SGenerateButtonContainer>
        <SButton
          onClick={onCreateLinkHandler}
          className={generateButtonClassNames}
          disabled={isFetching}
        >
          {generateButtonText}
        </SButton>
      </SGenerateButtonContainer>
    </SContainer>
  );
};

export default ModalShareProfile;
