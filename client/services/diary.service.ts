import {
  DEFAULT_AXIOS_ERROR_MSG,
  URI_MEAL,
  URI_WELLNESS,
} from '@client/constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';
import { IWellnessEntries } from '@lib/interfaces/wellness.interface';
import { IMealContent, TMealType } from '@utils/interfaces';
import axios, { AxiosError } from 'axios';

interface IResponse {
  ok?: boolean;
  error?: string;
}
interface ICreateMealArgs {
  date: string | Date;
  body: {
    mealId: TMealType;
    content: IMealContent;
  };
}
interface IUpdateMealArgs {
  date: string;
  body: {
    content: IMealContent;
    newMealId: TMealType;
    oldMealId: TMealType;
  };
}
interface IDeleteMealArgs {
  date: string;
  body: {
    mealId: TMealType;
    id: string;
  };
}
interface IUpdateWellnessArgs {
  body: IWellnessEntries;
}

const createService = () => {
  const createMealEntry = async ({
    date,
    body,
  }: ICreateMealArgs): Promise<IResponse> => {
    try {
      const { data } = await axios.post<IResponse>(
        `${URI_MEAL}?date=${date}`,
        body,
      );

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const updateMealEntry = async ({
    date,
    body,
  }: IUpdateMealArgs): Promise<IResponse> => {
    try {
      const { data } = await axios.put<IResponse>(
        `${URI_MEAL}?date=${date}`,
        body,
      );

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const deleteMealEntry = async ({
    date,
    body,
  }: IDeleteMealArgs): Promise<IResponse> => {
    try {
      const { data } = await axios.delete<IResponse>(
        `${URI_MEAL}?date=${date}`,
        {
          data: body,
        },
      );

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const updateWellnessEntries = async ({
    body,
  }: IUpdateWellnessArgs): Promise<IResponse> => {
    try {
      const { data } = await axios.put<IResponse>(`${URI_WELLNESS}`, body);

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  return {
    createMealEntry,
    updateMealEntry,
    deleteMealEntry,
    updateWellnessEntries,
  };
};

export const diaryService = createService();
