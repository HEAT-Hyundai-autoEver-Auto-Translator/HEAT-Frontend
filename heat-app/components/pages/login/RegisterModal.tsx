import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'components/common/Button';
import Dropdown from 'components/common/DropDown';
import { ErrorPanel } from 'components/common/ErrorPanel';
import { Modal } from 'components/common/Modal';
import { Spacer } from 'components/common/Spacer';
import { HStack, VStack } from 'components/common/Stack';
import { StyledInput } from 'components/premade/StyledInput';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateUser } from 'types/schema/User';
import { postFormToRegister } from 'utils/api/user/userAPI';
import { languageListAtom } from 'utils/jotai/atoms/languageListAtom';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';
import AvatarUploader from './AvatarUploader';

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  language: string;
  avatar: FileList | string;
}

interface ModalContainerProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}
const RegisterModal = ({ isModalOpen, toggleModal }: ModalContainerProps) => {
  const [, setToast] = useAtom(toastAtom);
  const theme = useTheme();
  const [languageList] = useAtom(languageListAtom);
  // 제출 폼 관련
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Add this line

  /**
   * @description 비밀번호 두개 일치하는지 확인 하는 함수
   * 일치하지 않을 경우 에러 메시지를 출력한다.
   * @param value
   * @returns boolean
   */
  const validatePassword = () => {
    if (getValues().confirmPassword === getValues().password) {
      clearErrors('confirmPassword');
      return true;
    } else {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return false;
    }
  };

  //회원가입 요청 보내주는 부분
  const registerMutation = postFormToRegister(); // 쿼리 요청을 위한 useMutation hook
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    const createUser: CreateUser = {
      userEmail: data.email,
      userName: data.username,
      password: data.password,
      languageName: data.language,
    };

    //기본 정보 추가
    formData.append(
      'createUserDto',
      new Blob([JSON.stringify(createUser)], { type: 'application/json' }),
    );

    // 이미지 파일 정보 추가
    if (selectedFile) {
      formData.append('userProfileImage', selectedFile);
    }
    registerMutation.mutate(formData, {
      onSuccess: data => {
        setToast({
          type: 'success',
          title: 'Register Success',
          message: 'User Register successful',
          isOpen: true,
        });
        toggleModal();
        reset();
      },
      onError: error => {
        setToast({
          type: 'error',
          title: 'Register Failed',
          message: 'User Register failed',
          isOpen: true,
        });
      },
    });
  };

  // 모달이 닫힐 때마다 폼을 리셋해준다.
  useEffect(() => {
    if (!isModalOpen) {
      reset({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        language: '',
        avatar: undefined,
      });
    }
  }, [isModalOpen, reset]);

  const uploaderProps = {
    control: control,
    selectedFile: selectedFile,
    setSelectedFile: setSelectedFile,
  };

  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalContainer spacing="2.5rem">
          <StyledText>Register</StyledText>
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
                <ErrorPanel>
                  {errors.email ? errors.email.message : null}
                </ErrorPanel>
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
                <ErrorPanel>
                  {errors.username ? errors.username.message : null}
                </ErrorPanel>
              </VStack>
              {/* selectBox 부분 */}
              <Controller
                control={control}
                name="language"
                rules={{ required: 'Default language is required' }}
                render={({ field }) => (
                  <HStack>
                    <Dropdown
                      placeholder="Select default language"
                      size={'lg'}
                      options={[
                        { label: 'Select default language', value: '' },
                        ...languageList.map(languageDto => ({
                          label: languageDto.languageName,
                          value: languageDto.languageName,
                        })),
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </HStack>
                )}
              />
              <ErrorPanel>
                {errors.language ? errors.language.message : null}
              </ErrorPanel>
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
                <ErrorPanel></ErrorPanel>
                <StyledInput
                  inputSize="lg"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: validatePassword,
                  })}
                />

                <ErrorPanel style={{ marginBottom: '1rem' }}>
                  {errors.password ? errors.password.message : null}
                  {errors.confirmPassword && !errors.password
                    ? errors.confirmPassword.message
                    : null}
                </ErrorPanel>
              </VStack>

              {/* Avatar image upload */}
              <AvatarUploader {...uploaderProps} />

              <Spacer />
              <HStack w="100%" spacing="1rem" justifyContent="flex-end">
                <Button
                  size="xs"
                  type="submit" // Make this button submit the form->중요!
                  // onClick={toast}
                >
                  Submit
                </Button>
                <Button
                  size="xs"
                  bgColor={theme.colors.mono.input_gray}
                  hoverColor={theme.colors.mono.gray200}
                  fontColor="black"
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </form>
          {/* End of the form */}
        </ModalContainer>
      </Modal>
    </>
  );
};

export default RegisterModal;

const ModalContainer = styled(VStack)`
  width: 50rem;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 25rem;
  }
`;

const StyledText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 2rem;
  }
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
