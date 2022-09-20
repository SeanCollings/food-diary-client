import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import Input, { IInputProps } from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { MEDIA_MOBILE } from '@utils/constants';

const SInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  ${MEDIA_MOBILE} {
    flex-direction: column;
  }
`;
const SLabel = styled.label`
  font-size: 22px;
  font-weight: 200;
`;

type TInputType = 'input' | 'textarea';

interface IInputContainerProps extends IInputProps {
  title: string;
  inputType?: TInputType;
  popup?: string;
  required?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputContainer: FC<IInputContainerProps> = ({
  title,
  inputType = 'input',
  popup,
  id,
  required,
  ...rest
}) => {
  const InputType = inputType === 'input' ? Input : TextArea;

  return (
    <SInputContainer title={popup}>
      <SLabel htmlFor={id}>
        {title}
        {required ? ' *' : ''}
      </SLabel>
      <InputType id={id} {...rest} />
    </SInputContainer>
  );
};

export default InputContainer;
