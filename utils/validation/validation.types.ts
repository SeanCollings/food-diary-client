export type TErrors = { [key: string]: string };

export type TValidateProps = {
  id: string;
  input: string;
  errors: TErrors;
};
