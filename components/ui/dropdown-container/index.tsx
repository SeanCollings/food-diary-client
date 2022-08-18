import { FC } from 'react';
import styled from 'styled-components';
import Dropdown, { IDropdownProps } from '@components/ui/dropdown';

const SInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;
const SLabel = styled.label`
  font-size: 22px;
  font-weight: 200;
  pointer-events: none;
`;

interface IDropdownContainerProps extends IDropdownProps {
  id: string;
  title: string;
  popup?: string;
}

const DropdownContainer: FC<IDropdownContainerProps> = ({
  id,
  title,
  popup,
  ...rest
}) => {
  return (
    <SInputContainer title={popup}>
      <SLabel htmlFor={id}>{title}</SLabel>
      <Dropdown id={id} {...rest} />
    </SInputContainer>
  );
};

export default DropdownContainer;
