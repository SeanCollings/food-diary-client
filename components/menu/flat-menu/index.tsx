import { FC } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@utils/constants/menu.constants';
import { useRouter } from 'next/router';
import { MEDIA_MAX_DESKTOP } from '@utils/constants';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const SContainer = styled.div`
  display: none;
  align-items: center;
  gap: 30px;

  ${MEDIA_MAX_DESKTOP} {
    display: flex;
  }
`;
const SLink = styled.a`
  font-size: 20px;
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;

  &.current-path {
    border-bottom: 3px solid var(--th-primary);
  }

  :hover:not(&.current-path) {
    opacity: 0.6;
  }
`;

const FlatMenu: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const onLogoutClick = async () => {
    localStorage?.removeItem('theme');
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <SContainer>
      {MENU_ITEMS.map(({ id, title, href }) => {
        if (session && id === 'login') {
          return null;
        } else if (!session && (id === 'my_profile' || id === 'summary')) {
          return null;
        }

        return (
          <Link key={id} href={href} passHref>
            <SLink className={router.pathname === href ? 'current-path' : ''}>
              {title}
            </SLink>
          </Link>
        );
      })}
      {session && <SLink onClick={onLogoutClick}>{'Logout'}</SLink>}
    </SContainer>
  );
};

export default FlatMenu;
