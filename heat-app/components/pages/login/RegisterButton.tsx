import { useTheme } from '@emotion/react';
import { Modal } from 'components/common/Modal';
import { VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { useState } from 'react';
import CloseIcon from '@/../public/closeIcon.svg';
import { Spacer } from 'components/common/Spacer';

import { StyledInput } from 'components/premade/StyledInput';

const RegisterButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Text
        fontSize="2rem"
        color={theme.colors.primary.default}
        onClick={toggleModal}
        style={{ cursor: 'pointer' }}
      >
        Register
      </Text>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <VStack w="25vw" spacing="2.5rem">
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              height: '12',
            }}
          >
            <CloseIcon
              width="12"
              height="12"
              onClick={toggleModal}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <Text fontSize="3rem" fontWeight={theme.fonts.weight.bold}>
            Register
          </Text>
          <StyledInput inputSize="lg" placeholder="Email" />
          <StyledInput inputSize="lg" placeholder="Username" />
          <StyledInput inputSize="lg" placeholder="Password" />

          <Spacer />
        </VStack>
      </Modal>
    </>
  );
};

export default RegisterButton;
