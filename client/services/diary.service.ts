import { URI_MEAL, URI_WELLNESS } from '@client/constants';
import { IWellnessEntries } from '@lib/interfaces/wellness.interface';
import { IMealContent, TMealType } from '@utils/interfaces';
import axios, { AxiosError } from 'axios';

interface IResponse {
  ok?: boolean;
  error?: string;
}
interface ICreateMealArgs {
  date: string;
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
        body
      );

      return {};
    } catch (err) {
      console.log('err ::', err);
      return {
        error: (err as AxiosError).message,
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
        body
      );

      return {};
    } catch (err) {
      return {
        error: (err as AxiosError).message,
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
        }
      );

      return {};
    } catch (err) {
      return {
        error: (err as AxiosError).message,
      };
    }
  };

  const updateWellnessEntries = async ({
    body,
  }: IUpdateWellnessArgs): Promise<IResponse> => {
    try {
      const { data } = await axios.put<IResponse>(`${URI_WELLNESS}`, body);

      return {};
    } catch (err) {
      return {
        error: (err as AxiosError).message,
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
