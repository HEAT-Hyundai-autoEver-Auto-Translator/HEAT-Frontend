import { useTheme } from '@emotion/react';
import { Modal } from 'components/common/Modal';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { useState } from 'react';
import { Spacer } from 'components/common/Spacer';

import { StyledInput } from 'components/premade/StyledInput';
import { Button } from 'components/common/Button';

// Import react-hook-form and AvatarUploader
import { Controller, useForm } from 'react-hook-form';
import AvatarUploader from './AvatarUploader';
import styled from '@emotion/styled';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import Dropdown from 'components/common/DropDown';

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  language: string;
  avatar: FileList;
}

const RegisterModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.Media.mobile);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState,
    reset,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      language: '',
      avatar: undefined,
    },
  });
  const { errors } = formState;
  // This function will be called when the form is submitted

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    reset();
  };

  const validatePassword = (value: string) => {
    if (value === getValues().password) {
      return true;
    } else {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return false;
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('email', data.email);
    console.log('username', data.username);
    console.log('password', data.password);
    console.log('avatar', data.avatar);
    console.log('language', data.language);
    // TODO: Send data to the backend
  };

  //TODO: 백엔드 통신 되면 이런 방식으로 바꾸기
  // const onSubmit = async (data :FormValues) => {
  //   const formData = new FormData();

  //   // "avatar" is the name of the field for the file
  //   formData.append('avatar', data.avatar[0]);

  //   // Append other form data
  //   formData.append('email', data.email);
  //   formData.append('username', data.username);
  //   formData.append('password', data.password);

  //   try {
  //     const response = await axios.post('your-api-url', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <Text
        fontSize={isMobile ? '1.5rem' : '2rem'}
        color={theme.colors.primary.default}
        onClick={toggleModal}
        style={{ cursor: 'pointer' }}
      >
        Register
      </Text>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <VStack w={isMobile ? '25rem' : '50rem'} spacing="2.5rem">
          <Text
            fontSize={isMobile ? '2rem' : '3rem'}
            fontWeight={theme.fonts.weight.bold}
          >
            Register
          </Text>
          {/* Start of the form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack style={{ position: 'relative' }}>
              <VStack>
                <StyledInput
                  inputSize={isMobile ? 'sm' : 'lg'}
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
                <ErrorPanel isMobile={isMobile}>
                  {errors.email ? errors.email.message : null}
                </ErrorPanel>
              </VStack>
              <VStack>
                <StyledInput
                  inputSize={isMobile ? 'sm' : 'lg'}
                  placeholder="Username"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 5,
                      message: 'Username must have at least 5 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Username must not exceed 20 characters',
                    },
                    pattern: {
                      value: /^[A-Za-z0-9]+$/i,
                      message:
                        'Username can only contain alphanumeric characters',
                    },
                  })}
                />
                <ErrorPanel isMobile={isMobile}>
                  {errors.username ? errors.username.message : null}
                </ErrorPanel>
              </VStack>
              {/* selectBox 부분 */}
              <Controller
                control={control}
                name="language"
                rules={{ required: 'First language is required' }}
                render={({ field }) => (
                  <HStack>
                    <Dropdown
                      placeholder="Select your first language"
                      size={isMobile ? 'sm' : 'lg'}
                      options={[
                        { label: 'Select your first language', value: '' },
                        { label: 'Korean', value: 'kor' },
                        { label: 'English', value: 'eng' },
                        { label: 'Japanese', value: 'jap' },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </HStack>
                )}
              />
              <div
                style={{
                  height: '30px',
                  color: 'red',
                }}
              >
                <ErrorPanel isMobile={isMobile}>
                  {errors.language ? errors.language.message : null}
                </ErrorPanel>
              </div>
              <VStack style={{ marginBottom: '2rem' }}>
                <StyledInput
                  inputSize={isMobile ? 'sm' : 'lg'}
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Must have one uppercase, one lowercase, one number and one special character',
                    },
                  })}
                />
                <div
                  style={{
                    color: 'red',
                    height: '30px',
                    marginBottom: '1rem',
                    textAlign: 'center', // Center the error message text
                  }}
                ></div>
                <StyledInput
                  inputSize={isMobile ? 'sm' : 'lg'}
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: validatePassword,
                  })}
                />

                <ErrorPanel
                  isMobile={isMobile}
                  style={{ marginBottom: '1rem' }}
                >
                  {errors.password ? errors.password.message : null}
                  {errors.confirmPassword && !errors.password
                    ? errors.confirmPassword.message
                    : null}
                </ErrorPanel>
              </VStack>

              {/* Avatar image upload */}

              <AvatarUploader control={control} />
              <Spacer />
              <HStack
                w={isMobile ? '70%' : '100%'}
                spacing="1rem"
                justifyContent="flex-end"
              >
                <Button
                  size={isMobile ? 'xxs' : 'xs'}
                  bgColor={theme.colors.primary.semi_light}
                  hoverColor={theme.colors.primary.default}
                  fontColor={theme.colors.mono.white}
                  type="submit" // Make this button submit the form
                >
                  Submit
                </Button>
                <Button
                  size={isMobile ? 'xxs' : 'xs'}
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

export default RegisterModal;

interface ErrorPanelProps {
  isMobile: boolean;
}

const ErrorPanel = styled.div<ErrorPanelProps>`
  width: ${({ isMobile }) => (isMobile ? '20rem' : '30rem')};
  height: 30px;
  color: red;
  text-align: center;
  font-size: ${({ isMobile }) => (isMobile ? '0.5rem' : '1.5rem')};
`;
/*
6/26 정규 표현식

Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
이 정규식은 이메일 주소의 형식을 검사합니다. @ 문자 앞에는 하나 이상의 대문자, 소문자, 숫자, ., _, %, +, - 문자가 올 수 있으며, @ 뒤에는 하나 이상의 대문자, 소문자, 숫자, . 또는 - 문자가 올 수 있고, 마지막에는 점(.)과 뒤이어 2~4개의 알파벳이 오게 됩니다. 대소문자는 구분하지 않습니다(i 플래그).
Username: /^[A-Za-z0-9]+$/i
이 정규식은 사용자 이름이 알파벳 대소문자 또는 숫자로만 구성되어 있는지를 검사합니다. ^는 문자열의 시작을, $는 문자열의 끝을 나타냅니다. 따라서 이 정규식은 문자열 전체가 알파벳이나 숫자로 이루어져 있어야 한다는 의미입니다. 대소문자는 구분하지 않습니다(i 플래그).
Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
이 정규식은 비밀번호가 특정 요구사항을 충족하는지 검사합니다. ^는 문자열의 시작을, $는 문자열의 끝을 나타냅니다. 각각의 (?=.*[조건]) 부분은 문자열이 해당 조건을 충족해야 한다는 것을 의미합니다. 즉, 이 정규식은 문자열이 적어도 하나의 소문자([a-z]), 적어도 하나의 대문자([A-Z]), 적어도 하나의 숫자(\d), 적어도 하나의 특수 문자([@$!%*?&])를 포함하고 있어야 하며, 전체 길이는 8 이상이어야 한다는 의미입니다.
 */
