import { COLOURS, MEDIA_MOBILE } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  menuWidth: number;
}
const SContainer = styled.div<ISContainer>`
  position: fixed;
  right: 0;
  background: white;
  height: 100%;
  width: ${({ menuWidth }) => menuWidth}px;
  box-shadow: 0px 0px 20px 1px ${COLOURS.gray};

  ${MEDIA_MOBILE} {
    // width: 100%;
  }
`;
const SContents = styled.div`
  position: relative;
  top: 110px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SContent = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const MenuDisplay: FC = () => {
  return (
    <SContainer menuWidth={0}>
      <SContents>
        <SContent>Profile</SContent>
        <SContent>Log out</SContent>
      </SContents>
    </SContainer>
  );
};

export default MenuDisplay;
