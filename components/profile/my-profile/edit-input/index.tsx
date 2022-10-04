import { useTheme } from '@hooks/use-theme';
import { COLOURS, OPACITY_50 } from '@utils/constants';
import { runSingleValidation } from '@utils/validation';
import {
  ERROR_EMPTY_INPUT,
  INPUT_MAX_LENGTH,
} from '@utils/validation/validation.constants';
import { TErrors } from '@utils/validation/validation.types';
import { nonEmptyInputValidators } from '@utils/validation/validators';
import { useState, FC, ChangeEvent, KeyboardEvent } from 'react';
import { MdClose, MdEdit, MdDone } from 'react-icons/md';
import styled from 'styled-components';

interface ISInput {
  background: string;
  colour: string;
  border: string;
  errorColour: string;
}

const SContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;
const SName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SInput = styled.input<ISInput>`
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 200;
  padding: 4px;
  color: ${({ colour }) => colour};
  background-color: ${({ background }) => `${background}${OPACITY_50}`};
  border: 1px solid
    ${({ border, errorColour }) => (errorColour ? errorColour : border)};
`;
const SIconButton = styled.button`
  outline: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
  border: none;

  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.4;
  }
`;
const SChoiceContainer = styled.div`
  display: flex;
  gap: 10px;
`;

interface IEditInputProps {
  value: string;
  onSave: (value: string) => void;
}

const EditInput: FC<IEditInputProps> = ({ value, onSave }) => {
  const theme = useTheme();
  const [editableValue, setEditableValue] = useState(value);
  const [editEnabled, setEditEnabled] = useState(false);
  const [inputErrors, setInputErrors] = useState<TErrors>({});
  const id = 'edit-name-input';

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableValue(event.target.value);
  };
  const handleHideInput = () => {
    setEditEnabled(false);
    setInputErrors({});
    setEditableValue(value);
  };
  const saveInputHandler = () => {
    const errors = runSingleValidation({
      value: editableValue,
      id,
      validators: nonEmptyInputValidators,
      errors: {},
    });

    if (Object.keys(errors).length) {
      return setInputErrors(errors);
    }

    setInputErrors({});
    onSave(editableValue);
    setEditEnabled(false);
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveInputHandler();
    } else if (event.key === 'Escape') {
      handleHideInput();
    }
  };

  return (
    <SContainer>
      {!editEnabled && <SName>{value}</SName>}
      {editEnabled && (
        <SInput
          type={'text'}
          value={editableValue}
          background={theme.backgroundPrimary}
          border={theme.quaternary}
          colour={theme.text}
          maxLength={INPUT_MAX_LENGTH}
          errorColour={(!!inputErrors[id] && theme.error) || ''}
          title={inputErrors[id] || ''}
          placeholder={!!inputErrors[id] ? ERROR_EMPTY_INPUT : 'Enter name'}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
      )}
      {editEnabled && (
        <SChoiceContainer>
          <SIconButton onClick={saveInputHandler} title="Save name">
            <MdDone color={COLOURS.gray} size={28} />
          </SIconButton>
          <SIconButton onClick={handleHideInput} title="Cancel">
            <MdClose color={COLOURS.gray} size={28} />
          </SIconButton>
        </SChoiceContainer>
      )}
      {!editEnabled && (
        <SIconButton
          onClick={() => setEditEnabled(true)}
          title="Update your name"
        >
          <MdEdit color={COLOURS.gray} size={28} />
        </SIconButton>
      )}
    </SContainer>
  );
};

export default EditInput;
