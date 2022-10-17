import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export const protectedSeverSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
