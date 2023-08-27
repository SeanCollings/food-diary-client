import type { GetServerSideProps, NextPage } from 'next';
import DateDisplay from '@components/date-display';
import CardContainer from '@components/meals/meal-card-container';
import WellnessContainer from '@components/wellness/wellness-container';
import styled from 'styled-components';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRequestDiaryEntry } from '@hooks/request/use-request-diary-entry';
import { IUserModel, useUserContext } from '@store/user-context';
import { MEDIA_MOBILE } from '@utils/app.constants';
import { Ellipsis, SpinnerDots } from '@components/ui/loaders';
import { useErrorToast } from '@hooks/use-error-toast';

const SDiaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const STopContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SNameContainer = styled.div`
  display: flex;
  column-gap: 4px;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.8;

  ${MEDIA_MOBILE} {
    display: none;
  }
`;
const SName = styled.span`
  font-weight: 600;
`;
const SCardContainer = styled.div`
  position: relative;

  &.loading {
    opacity: 0.8;
  }
`;
const SSpinnerContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
`;

interface IDiaryPageProps {
  session: { user: IUserModel | null };
}

const Home: NextPage<IDiaryPageProps> = ({ session }) => {
  const { user } = useUserContext();
  const [mounted, setMounted] = useState(false);
  const { isError, isLoading } = useRequestDiaryEntry(!!session && mounted);

  useErrorToast({
    error: !!isError,
    title: 'Error!',
    message:
      'There was an issue getting your diary entries. Please try again later.',
    clear: !!user,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const loading = (!!session && !user) || isLoading;

  return (
    <SDiaryContainer>
      <STopContainer>
        {!!session && (
          <SNameContainer>
            <span>Welcome:</span>
            <SName>{user?.name}</SName>
            {!user && <Ellipsis spacing={6} size={8} />}
          </SNameContainer>
        )}
        <DateDisplay />
      </STopContainer>
      <WellnessContainer />
      <SCardContainer className={loading ? 'loading' : ''}>
        {loading && (
          <SSpinnerContainer>
            <SpinnerDots size={30} />
          </SSpinnerContainer>
        )}
        <CardContainer />
      </SCardContainer>
    </SDiaryContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
};

export default Home;
