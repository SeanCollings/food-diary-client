export type TErrors = { [key: string]: string };

export type TValidateProps = {
  id: string;
  value: string;
  errors: TErrors;
};
