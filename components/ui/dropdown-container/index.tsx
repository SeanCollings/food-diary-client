import styled from 'styled-components';
import Dropdown, {
  IDropdownProps,
  TDefaultOption,
} from '@components/ui/dropdown';
import { ThemeTextColor } from '@components/ui/style-themed';

const SInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;
const SLabel = styled.label`
  font-size: 22px;
  font-weight: 200;
  pointer-events: none;
  ${ThemeTextColor}
`;

interface IDropdownContainerProps<T, K> extends IDropdownProps<T, K> {
  id: string;
  title: string;
  popup?: string;
}

const DropdownContainer = <T extends string, K extends TDefaultOption>({
  id,
  title,
  popup,
  ...rest
}: IDropdownContainerProps<T, K>) => {
  return (
    <SInputContainer title={popup}>
      <SLabel htmlFor={id}>{title}</SLabel>
      <Dropdown<T, K> id={id} {...rest} />
    </SInputContainer>
  );
};

export default DropdownContainer;
