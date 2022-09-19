import { APP_THEME_DEFAULT, COLOURS, OPACITY_80 } from '@utils/constants';
import { detectAutofill } from '@utils/document-utils';
import { INPUT_MAX_LENGTH } from '@utils/validation/validation.constants';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SContainer = styled.div`
  position: relative;
`;
const SRequired = styled.span<any>`
  transition: 0.1s;
  position: absolute;
  top: -24px;
  left: 8px;
  font-size: 20px;

  color: ${({ isError }) =>
    isError ? COLOURS.error : APP_THEME_DEFAULT.primary};
  opacity: 1;
`;
const SLabel = styled.label<any>`
  transition: 0.1s;
  position: absolute;
  left: 20px;
  cursor: text;
  opacity: 0.7;

  top: ${({ positionTop, isError }) => (positionTop ? '-24' : '18')}px;
`;
const SInput = styled.input<any>`
  outline: none;
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 18px;
  height: 58px;
  background: ${COLOURS.gray_light};

  border: 1px solid
    ${({ isError }) => (isError ? COLOURS.error : 'transparent')};

  :focus {
    border: 1px solid ${COLOURS.gray_dark};
  }
`;
const SError = styled.div`
  color: ${COLOURS.error}${OPACITY_80};
  font-size: 15px;
  padding-top: 2px;
  padding-left: 4px;
`;

type TInputType = 'text' | 'email' | 'password';

interface IFormInputProps<T> {
  id: T;
  value: string;
  type: TInputType;
  name: string;
  required?: boolean;
  placeholder?: string;
  isError?: string;
  title?: string;
  onChange: ({ id, value }: { id: T; value: string }) => void;
  onBlur?: () => void;
}

const FormInput = <T extends string>({
  id,
  value,
  type,
  name,
  placeholder,
  title,
  required,
  isError,
  onChange,
  onBlur,
}: IFormInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [labelTop, setlabelTop] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  const resetLabel = labelTop && !value && !isFocus;
  const moveLabelToTop = isAutoFilled || (!labelTop && (value || isFocus));

  useEffect(() => {
    const timeout = setTimeout(() => {
      detectAutofill(id, () => setIsAutoFilled(true));
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  useEffect(() => {
    if (moveLabelToTop) {
      setlabelTop(true);
    } else if (resetLabel) {
      setlabelTop(false);
    }
  }, [resetLabel, moveLabelToTop]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    isAutoFilled && setIsAutoFilled(false);
    onChange({ id, value: event.target.value });
  };
  const onBlurHandler = () => {
    setIsFocus(false);
    onBlur?.();
  };

  return (
    <SContainer>
      {required && (
        <SRequired show={labelTop && required} isError={!!isError}>
          *
        </SRequired>
      )}
      <SLabel
        htmlFor={`${id}_form_input`}
        positionTop={labelTop}
        isError={!!isError}
      >
        {name}
      </SLabel>
      <SInput
        ref={inputRef}
        title={title}
        id={`${id}_form_input`}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        isError={!!isError}
        maxLength={INPUT_MAX_LENGTH}
        onChange={onChangeHandler}
        onFocus={() => setIsFocus(true)}
        onBlur={onBlurHandler}
      />
      {isError && <SError>{isError}</SError>}
    </SContainer>
  );
};

FormInput.displayName = 'FormInput';

export default memo(FormInput) as typeof FormInput;
