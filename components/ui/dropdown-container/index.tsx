import styled from 'styled-components';
import Dropdown, {
  IDropdownProps,
  TDefaultOption,
} from '@components/ui/dropdown';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { MEDIA_MOBILE } from '@utils/app.constants';

const SInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
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
  pointer-events: none;
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
    <SInputContainer>
      <SLabelWrapper title={popup}>
        {popup && <SInfoIcon className="info" />}
        <SLabel htmlFor={id}>{title}</SLabel>
        {popup && <SInfoIconOutline className="info-outline" />}
      </SLabelWrapper>
      <Dropdown<T, K> id={id} {...rest} />
    </SInputContainer>
  );
};

export default DropdownContainer;
