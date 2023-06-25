import { useTheme } from '@emotion/react';
import { Modal } from 'components/common/Modal';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { useState } from 'react';
import { Spacer } from 'components/common/Spacer';

import { StyledInput } from 'components/premade/StyledInput';
import { Button } from 'components/common/Button';

// Import react-hook-form and AvatarUploader
import { useForm } from 'react-hook-form';
import AvatarUploader from './AvatarUploader';

interface FormValues {
  email: string;
  username: string;
  password: string;
  avatar: FileList;
}

const RegisterButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Initialize react-hook-form
  const { register, handleSubmit, control } = useForm<FormValues>();

  // This function will be called when the form is submitted
  const onSubmit = (data: FormValues) => {
    console.log(data);
    // TODO: Send data to the backend
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
        <VStack w="50rem" spacing="2.5rem">
          <Text fontSize="3rem" fontWeight={theme.fonts.weight.bold}>
            Register
          </Text>
          {/* Start of the form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="2.5rem">
              <StyledInput
                inputSize="lg"
                placeholder="Email"
                {...register('email')}
              />
              <StyledInput
                inputSize="lg"
                placeholder="Username"
                {...register('username')}
              />
              <StyledInput
                inputSize="lg"
                placeholder="Password"
                {...register('password')}
                type="password"
              />
              {/* Avatar image upload */}
              <AvatarUploader control={control} />
              <Spacer />
              <HStack w="100%" spacing="1rem" justifyContent="flex-end">
                <Button
                  size="xs"
                  bgColor={theme.colors.primary.semi_light}
                  hoverColor={theme.colors.primary.default}
                  fontColor={theme.colors.mono.white}
                  type="submit" // Make this button submit the form
                >
                  Submit
                </Button>
                <Button
                  size="xs"
                  bgColor={theme.colors.mono.input_gray}
                  hoverColor={theme.colors.mono.gray200}
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </form>
          {/* End of the form */}
        </VStack>
      </Modal>
    </>
  );
};

export default RegisterButton;
