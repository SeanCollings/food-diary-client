import { useTheme } from '@hooks/use-theme';
import { COLOURS, OPACITY_50, OPACITY_70 } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

interface ITheme {
  colourOff: string;
  colourOn: string;
}

const SInput = styled.input<ITheme>`
  position: relative;
  appearance: none;
  outline: none;
  width: 50px;
  height: 24px;
  border: 1px solid ${COLOURS.gray};
  border-radius: 50px;
  cursor: pointer;
  margin: 0;
  transition: 0.2s;
  border: 1px solid ${COLOURS.gray}${OPACITY_50};
  background-color: ${COLOURS.white_off};

  :after {
    content: '';
    position: absolute;
    left: 1px;
    width: 20px;
    height: 20px;
    background-color: ${COLOURS.white};
    border-radius: 50%;
    border: 1px solid ${COLOURS.white};
    box-shadow: 0px 1px 6px 1px ${COLOURS.gray}${OPACITY_70};
    transition: 0.2s;
  }

  :checked {
    background-color: ${({ colourOn }) => `${colourOn}${OPACITY_70}`};
    border-color: ${({ colourOn }) => `${colourOn}${OPACITY_70}`};
  }

  :checked:after {
    left: 25px;
    border-color: ${COLOURS.white};
  }

  :active {
    opacity: 0.6;
  }
`;

interface IToggleProps {
  checked?: boolean;
  onChange: () => void;
}

const Toggle: FC<IToggleProps> = ({ checked = false, onChange }) => {
  const theme = useTheme();

  return (
    <SInput
      type={'checkbox'}
      onChange={onChange}
      checked={checked}
      colourOff={theme.backgroundPrimary}
      colourOn={theme.primary}
    />
  );
};

export default Toggle;