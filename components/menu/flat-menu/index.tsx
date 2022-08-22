import { FC } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@components/menu/menu.constants';
import { useRouter } from 'next/router';
import { APP_THEME_DEFAULT, MEDIA_MAX_DESKTOP } from '@utils/constants';

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
const SContent = styled.div<ISContent>`
  font-size: 20px;
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;

  ${({ isCurrentPath }) =>
    isCurrentPath && `border-bottom: 3px solid ${APP_THEME_DEFAULT.primary}`}
`;

const FlatMenu: FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <SContainer>
      {MENU_ITEMS.map(({ id, title, href }) => (
        <SContent
          key={id}
          onClick={() => handleMenuClick(href)}
          isCurrentPath={pathname === href}
        >
          {title}
        </SContent>
      ))}
    </SContainer>
  );
};

export default FlatMenu;
