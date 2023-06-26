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
import { Select } from 'components/common/Select';
import { StyledSelect } from 'components/premade/StyledSelect';

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  language: string;
  avatar: FileList;
}

const RegisterButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();

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
            <VStack style={{ position: 'relative' }}>
              <VStack>
                <StyledInput
                  inputSize="lg"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
                <div
                  style={{
                    height: '30px',
                    color: 'red',
                  }}
                >
                  {errors.email ? errors.email.message : null}
                </div>
              </VStack>
              <VStack>
                <StyledInput
                  inputSize="lg"
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
                <div style={{ height: '30px', color: 'red' }}>
                  {errors.username ? errors.username.message : null}
                </div>
              </VStack>
              {/* 언어 select box 들어갈곳 */}
              {/* <Controller
                name="language"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <VStack>
                    <Select
                      fontColor={theme.colors.mono.black}
                      bgColor={theme.colors.mono.input_gray}
                      paddingLeft="2.5rem"
                      paddingRight="2.5rem"
                      {...field}
                      inputSize="lg"
                    >
                      <option value="" disabled selected>
                        Select your first language
                      </option>
                      <option value="kor">Korean</option>
                      <option value="eng">English</option>
                      <option value="jap">Japanese</option>
                    </Select>
                    <div style={{ height: '30px', color: 'red' }}>
                      {errors.language ? errors.language.message : null}
                    </div>
                  </VStack>
                )}
                rules={{ required: 'Language is required' }}
              /> */}
              {/* <StyledSelect
                inputSize="lg"
                placeholder="Select your first language"
                {...register('language', {
                  required: 'First language is required',
                })}
              >
                <option value="kor">Korean</option>
                <option value="eng">English</option>
                <option value="jap">Japanese</option>
              </StyledSelect> */}

              <Controller
                control={control}
                name="language"
                rules={{ required: 'First language is required' }}
                render={({ field }) => (
                  <StyledSelect
                    inputSize="lg"
                    placeholder="Select your first language"
                    {...field}
                  >
                    <option value="" disabled>
                      Select your first language
                    </option>
                    <option value="kor">Korean</option>
                    <option value="eng">English</option>
                    <option value="jap">Japanese</option>
                  </StyledSelect>
                )}
              />
              <div
                style={{
                  height: '30px',
                  color: 'red',
                }}
              >
                {errors.language ? errors.language.message : null}
              </div>
              <VStack style={{ marginBottom: '2rem' }}>
                <StyledInput
                  inputSize="lg"
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
                  inputSize="lg"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: validatePassword,
                  })}
                />
                <div
                  style={{
                    color: 'red',
                    height: '30px',
                    width: '400px',
                    marginBottom: '1rem',
                    textAlign: 'center', // Center the error message text
                  }}
                >
                  {errors.password ? errors.password.message : null}
                  {errors.confirmPassword && !errors.password
                    ? errors.confirmPassword.message
                    : null}
                </div>
              </VStack>
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

/*
6/26 정규 표현식

Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
이 정규식은 이메일 주소의 형식을 검사합니다. @ 문자 앞에는 하나 이상의 대문자, 소문자, 숫자, ., _, %, +, - 문자가 올 수 있으며, @ 뒤에는 하나 이상의 대문자, 소문자, 숫자, . 또는 - 문자가 올 수 있고, 마지막에는 점(.)과 뒤이어 2~4개의 알파벳이 오게 됩니다. 대소문자는 구분하지 않습니다(i 플래그).
Username: /^[A-Za-z0-9]+$/i
이 정규식은 사용자 이름이 알파벳 대소문자 또는 숫자로만 구성되어 있는지를 검사합니다. ^는 문자열의 시작을, $는 문자열의 끝을 나타냅니다. 따라서 이 정규식은 문자열 전체가 알파벳이나 숫자로 이루어져 있어야 한다는 의미입니다. 대소문자는 구분하지 않습니다(i 플래그).
Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
이 정규식은 비밀번호가 특정 요구사항을 충족하는지 검사합니다. ^는 문자열의 시작을, $는 문자열의 끝을 나타냅니다. 각각의 (?=.*[조건]) 부분은 문자열이 해당 조건을 충족해야 한다는 것을 의미합니다. 즉, 이 정규식은 문자열이 적어도 하나의 소문자([a-z]), 적어도 하나의 대문자([A-Z]), 적어도 하나의 숫자(\d), 적어도 하나의 특수 문자([@$!%*?&])를 포함하고 있어야 하며, 전체 길이는 8 이상이어야 한다는 의미입니다.
 */

// const ErrorBubble = styled.div`
//   position: absolute;
//   bottom: -20px;
//   left: 0;
//   width: 100%;
//   background-color: red;
//   color: white;
//   padding: 5px;
//   border-radius: 5px;
//   font-size: 0.8rem;
//   text-align: center;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;
