import { TErrors, TValidateProps } from '@utils/validation/validation.types';

export type TValidators = ((props: TValidateProps) => TValidateProps)[];

export interface IInputsValidator {
  id: string;
  value: string;
  shouldValidate?: boolean;
  validators: TValidators;
}
export interface TSingleInputValidator extends IInputsValidator {
  errors: TErrors;
}

function validationCompose<T>(x: T) {
  return (fns: ((args: T) => T)[]) => fns.reduceRight((v, f) => f(v), x);
}

export const runValidations = (inputs: IInputsValidator[]) =>
  inputs.reduce(
    (acc, input) =>
      runSingleValidation({
        errors: acc,
        ...input,
      }),
    {} as TErrors,
  );

export const runSingleValidation = ({
  id,
  value,
  shouldValidate,
  validators,
  errors = {},
}: TSingleInputValidator) => {
  if (shouldValidate === false) {
    return errors;
  }

  const compose = validationCompose<TValidateProps>({
    errors,
    id,
    value,
  });

  return compose(validators).errors;
};
