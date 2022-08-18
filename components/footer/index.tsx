import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.footer`
  display: flex;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  min-height: 5rem;
  left: 0;
  width: 100%;
  font-size: 14px;
`;

const Footer: FC = () => {
  return <SContainer>© 2022 Sean Collings. All rights reserved.</SContainer>;
};

export default Footer;
