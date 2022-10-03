import { useTheme } from '@hooks/use-theme';
import { OPACITY_40 } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

interface ISContainer {
  borderTop: string;
}

const SContainer = styled.footer<ISContainer>`
  display: flex;
  border-top: 1px solid ${({ borderTop }) => borderTop};
  justify-content: center;
  align-items: center;

  min-height: 5rem;
  left: 0;
  width: 100%;
  font-size: 14px;
`;

const Footer: FC = () => {
  const theme = useTheme();
  const borderTop = theme.darkMode
    ? theme.backgroundSecondary
    : `${theme.quaternary}${OPACITY_40}`;

  return (
    <SContainer borderTop={borderTop}>
      © 2022 Sean Collings. All rights reserved.
    </SContainer>
  );
};

export default Footer;
