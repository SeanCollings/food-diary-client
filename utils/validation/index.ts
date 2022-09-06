import { TErrors, TValidateProps } from '@utils/validation/validation.types';

export type TInputsValidator = {
  id: string;
  input: string;
  shouldValidate: boolean;
  validators: ((props: TValidateProps) => TValidateProps)[];
};

export function validationCompose<T>(x: T) {
  return (fns: ((args: T) => T)[]) => fns.reduceRight((v, f) => f(v), x);
}

export const runValidation = (inputs: TInputsValidator[]) => {
  const errors = inputs.reduce(
    (acc, { id, input, shouldValidate, validators }) => {
      if (!shouldValidate) {
        return acc;
      }

      const compose = validationCompose<TValidateProps>({
        errors: acc,
        id,
        input,
      });

      const { errors } = compose(validators);

      return errors;
    },
    {} as TErrors
  );

  return errors;
};
