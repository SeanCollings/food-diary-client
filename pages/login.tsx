import LoginForm from '@components/login-form';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { getSession } from 'next-auth/react';

const SLoginContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

//https://nextjs.org/docs/authentication

const LoginPage: NextPage = () => {
  return (
    <SLoginContainer>
      <LoginForm />
    </SLoginContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
