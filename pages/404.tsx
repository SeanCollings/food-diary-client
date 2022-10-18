import { NextPage } from 'next';
import styled from 'styled-components';

const SContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const SHeader = styled.h1`
  display: inline-block;
  margin: 0;
  margin-right: 20px;
  padding: 0 23px 0 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
  line-height: 49px;
  border-right: 1px solid var(--text);
`;
const SDescriptionContainer = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
`;
const SDescription = styled.h1`
  font-size: 14px;
  font-weight: normal;
  line-height: 49px;
  margin: 0;
  padding: 0;
`;

const FourOhFour: NextPage = () => {
  return (
    <SContainer>
      <SHeader>404</SHeader>
      <SDescriptionContainer>
        <SDescription>This page could not be found.</SDescription>
      </SDescriptionContainer>
    </SContainer>
  );
};

export default FourOhFour;
