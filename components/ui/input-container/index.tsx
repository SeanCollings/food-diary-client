import { FC } from 'react';
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
  type?: TInputType;
  popup?: string;
}

const InputContainer: FC<IInputContainerProps> = ({
  title,
  type = 'input',
  popup,
  id,
  ...rest
}) => {
  const InputType = type === 'input' ? Input : TextArea;

  return (
    <SInputContainer title={popup}>
      <SLabel htmlFor={id}>{title}</SLabel>
      <InputType id={id} {...rest} />
    </SInputContainer>
  );
};

export default InputContainer;
