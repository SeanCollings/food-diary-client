import { FC } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@components/menu/menu.constants';
import { useRouter } from 'next/router';
import { APP_THEME_DEFAULT, MEDIA_MAX_DESKTOP } from '@utils/constants';
import Link from 'next/link';

interface ISContent {
  isCurrentPath: boolean;
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

  ${({ isCurrentPath }) =>
    isCurrentPath && `border-bottom: 3px solid ${APP_THEME_DEFAULT.primary}`};

  :hover {
    ${({ isCurrentPath }) => !isCurrentPath && `opacity: 0.6`};
  }
`;

const FlatMenu: FC = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <SContainer>
      {MENU_ITEMS.map(({ id, title, href }) => (
        <Link key={id} href={href} passHref>
          <SLink isCurrentPath={pathname === href}>{title}</SLink>
        </Link>
      ))}
    </SContainer>
  );
};

export default FlatMenu;
