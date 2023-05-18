import { protectedSeverSideProps } from '.';
import { getSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('server-props', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('protectedSeverSideProps', () => {
    it('should return props when there is a session', async () => {
      const mockGetSession = jest.fn().mockResolvedValue({ session: 'found' });
      (getSession as jest.Mock).mockImplementation(mockGetSession);

      const props = await protectedSeverSideProps({
        req: { headers: {} },
      } as any);
      expect(props).toMatchInlineSnapshot(`
        {
          "props": {
            "session": {
              "session": "found",
            },
          },
        }
      `);
    });

    it('should return redirect props when no session is found', async () => {
      const mockGetSession = jest.fn().mockResolvedValue(null);
      (getSession as jest.Mock).mockImplementation(mockGetSession);

      const props = await protectedSeverSideProps({
        req: { headers: {} },
      } as any);
      expect(props).toMatchInlineSnapshot(`
        {
          "redirect": {
            "destination": "/",
            "permanent": false,
          },
        }
      `);
    });
  });
});
