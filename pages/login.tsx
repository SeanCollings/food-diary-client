import LoginForm from '@components/login-form';
import { NextPage } from 'next';
import styled from 'styled-components';

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

export default LoginPage;
