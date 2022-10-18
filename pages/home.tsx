import { pathnameMapper } from '@utils/constants/menu.constants';
import { MEDIA_MAX_DESKTOP, MEDIA_MOBILE } from '@utils/constants';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const SHomeContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: end;
  gap: 20px;
  max-width: 500px;
  float: right;
  min-height: 50vh;
  justify-content: flex-end;

  ${MEDIA_MOBILE} {
    min-height: 100%;
  }
`;
const SParagraphContainer = styled.aside`
  padding: 20px;
  position: relative;
`;
const SParagraphBackGround = styled.div`
  background: var(--bg-secondary);
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  top: 0;
  left: 0;
  border-radius: 4px;

  ${MEDIA_MAX_DESKTOP} {
    opacity: 0.7;
  }
`;
const SParagraphWrapper = styled.div`
  position: relative;
`;
const SParagraphHeader = styled.div`
  font-size: 28px;
  text-align: right;
  padding-bottom: 12px;
`;
const SParagraphContent = styled.div`
  font-size: 18px;
  font-weight: 200;
  text-align: right;
`;
const SExploreButtonContainer = styled.div``;
const SExploreButton = styled.button`
  outline: none;
  color: var(--bg-secondary);
  background: var(--th-primary);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px;
  font-size: 24px;
  width: 260px;
  cursor: pointer;

  :hover {
    scale: 1.05;
  }

  :active {
    opacity: 0.6;
  }
`;

const HomePage: NextPage = () => {
  const { push } = useRouter();

  const handleExploreClick = () => {
    push(pathnameMapper.my_diary);
  };

  return (
    <SHomeContainer>
      <SParagraphContainer>
        <SParagraphBackGround />
        <SParagraphWrapper>
          <SParagraphHeader>Gasoline is not enough.</SParagraphHeader>
          <SParagraphContent>
            {`Sixty-four bathes in sunlight. The light at the end of the tunnel
          stands upon somebody else's legs. Camouflage paint doesn't like paying
          taxes. A kickingly prodigious profile could please even the most
          demanding follower of Freud.`}
          </SParagraphContent>
        </SParagraphWrapper>
      </SParagraphContainer>
      <SExploreButtonContainer>
        <SExploreButton onClick={handleExploreClick}>Explore</SExploreButton>
      </SExploreButtonContainer>
    </SHomeContainer>
  );
};

export default HomePage;
