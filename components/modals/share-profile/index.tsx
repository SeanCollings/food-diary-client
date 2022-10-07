import styled from 'styled-components';

const SContainer = styled.div``;
const SButton = styled.button``;

interface IModalShareProfileProps {
  onClose: () => void;
}

const ModalShareProfile: React.FC<IModalShareProfileProps> = ({ onClose }) => {
  return (
    <SContainer>
      <SButton onClick={onClose}>Cancel</SButton>
    </SContainer>
  );
};

export default ModalShareProfile;
