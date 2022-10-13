import { FC } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@utils/constants/menu.constants';
import { useRouter } from 'next/router';
import { MEDIA_MAX_DESKTOP } from '@utils/constants';
import Link from 'next/link';
import { useTheme } from '@hooks/use-theme';

interface ISContent {
  isCurrentPath: boolean;
  primary: string;
}

const SContainer = styled.div`
  display: none;
  align-items: center;
  gap: 30px;

  ${MEDIA_MAX_DESKTOP} {
    display: flex;
  }
`;
const SLink = styled.a<ISContent>`
  font-size: 20px;
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;

  ${({ isCurrentPath, primary }) =>
    isCurrentPath && `border-bottom: 3px solid ${primary}`};

  :hover {
    ${({ isCurrentPath }) => !isCurrentPath && `opacity: 0.6`};
  }
`;

const FlatMenu: FC = () => {
  const theme = useTheme();
  const { pathname } = useRouter();

  return (
    <SContainer>
      {MENU_ITEMS.map(({ id, title, href }) => (
        <Link key={id} href={href} passHref>
          <SLink primary={theme.primary} isCurrentPath={pathname === href}>
            {title}
          </SLink>
        </Link>
      ))}
    </SContainer>
  );
};

export default FlatMenu;
