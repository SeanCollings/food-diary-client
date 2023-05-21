import axios, { HeadersDefaults, RawAxiosRequestHeaders } from 'axios';
import { NextApiRequest } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type AxiosHeaders =
  | Partial<HeadersDefaults>
  | Partial<RawAxiosRequestHeaders>
  | { Authorization?: string };

export const createInstance = (
  requiresAuthorization: boolean,
  session?: Session | null,
) => {
  const headers: AxiosHeaders = { Authorization: '' };

  if (requiresAuthorization) {
    headers['Authorization'] = `Bearer ${session?.accessToken}`;
  }

  return axios.create({
    baseURL: process.env.SERVER_HOST,
    timeout: 2000,
    headers,
  });
};

export const apiClient = createInstance(false);

export const createApiClientSecure = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  return createInstance(true, session);
};
