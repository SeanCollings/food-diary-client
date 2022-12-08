import { AxiosError } from 'axios';

export type CustomAxiosError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;
