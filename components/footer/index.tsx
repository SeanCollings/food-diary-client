import { useTheme } from '@hooks/use-theme';
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
  const { darkMode } = useTheme();
  const borderTop = darkMode
    ? 'var(--bg-secondary)'
    : `var(--th-quaternary__40)`;

  return (
    <SContainer borderTop={borderTop}>
      © 2022 Sean Collings. All rights reserved.
    </SContainer>
  );
};

export default Footer;
