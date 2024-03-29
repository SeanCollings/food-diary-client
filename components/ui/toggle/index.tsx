import { useTheme } from '@hooks/use-theme';
import { COLOURS, OPACITY_50, OPACITY_70 } from '@utils/app.constants';
import { FC } from 'react';
import styled from 'styled-components';

interface ITheme {
  boxShadow: string;
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
  opacity: 1;

  :after {
    content: '';
    position: absolute;
    left: 1px;
    width: 20px;
    height: 20px;
    background-color: ${COLOURS.white};
    border-radius: 50%;
    border: 1px solid ${COLOURS.white};
    box-shadow: 0px 1px 6px 1px ${({ boxShadow }) => boxShadow}${OPACITY_70};
    transition: 0.2s;
  }

  :checked {
    background-color: var(--th-primary__80);
    border-color: var(--th-primary__80);
    background-image: linear-gradient(
      to right,
      var(--th-primary),
      var(--th-tertiary)
    );
  }

  :checked:after {
    left: 25px;
    border-color: ${COLOURS.white};
  }

  :active {
    opacity: 0.6;
  }

  &.disabled {
    opacity: 0.4;
  }
`;

interface IToggleProps {
  title?: string;
  checked?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  onChange: () => void;
}

const Toggle: FC<IToggleProps> = ({
  title,
  checked = false,
  tabIndex,
  disabled,
  onChange,
}) => {
  const { darkMode } = useTheme();

  return (
    <SInput
      tabIndex={tabIndex}
      type={'checkbox'}
      title={title}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      boxShadow={darkMode ? COLOURS.black : COLOURS.gray}
      className={disabled ? 'disabled' : ''}
    />
  );
};

export default Toggle;
