import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import Input, { IInputProps } from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { MEDIA_MOBILE } from '@utils/app.constants';
import { MdInfo, MdInfoOutline } from 'react-icons/md';

const SInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;

  ${MEDIA_MOBILE} {
    flex-direction: column;
  }
`;
const SLabelWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  :hover {
    .info {
      opacity: 1;
    }
    .info-outline {
      opacity: 0;
    }
  }
`;
const SLabel = styled.label`
  font-size: 22px;
  font-weight: 200;
  flex: 1;
`;
const SInfoIconOutline = styled(MdInfoOutline)`
  transition: 250ms;

  ${MEDIA_MOBILE} {
    display: none;
  }
`;
const SInfoIcon = styled(MdInfo)`
  position: absolute;
  right: 0;
  opacity: 0;

  transition: 250ms;

  ${MEDIA_MOBILE} {
    display: none;
  }
`;

type TInputType = 'input' | 'textarea';

interface IInputContainerProps extends IInputProps {
  title: string;
  inputType?: TInputType;
  popup?: string;
  required?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    <SInputContainer>
      <SLabelWrapper title={popup}>
        {popup && <SInfoIcon className="info" />}
        <SLabel htmlFor={id}>
          {title}
          {required ? ' *' : ''}
        </SLabel>
        {popup && <SInfoIconOutline className="info-outline" />}
      </SLabelWrapper>
      <InputType id={id} {...rest} />
    </SInputContainer>
  );
};

export default InputContainer;
