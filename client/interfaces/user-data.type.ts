import { IUserModel } from '@store/user-context';

export interface IUserResponse {
  ok: boolean;
  user: IUserModel;
  message?: string;
}
