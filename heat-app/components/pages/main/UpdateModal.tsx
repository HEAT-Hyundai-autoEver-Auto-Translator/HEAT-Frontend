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
import {
  getUserDataResultsUpdate,
  postFormToUpdate,
} from 'utils/api/user/userAPI';
import { languageListAtom } from 'utils/jotai/atoms/languageListAtom';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';
import { userAtom } from 'utils/jotai/atoms/userAtom';
import AvatarUploader from '../login/AvatarUploader';

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
const UpdateModal = ({ isModalOpen, toggleModal }: ModalContainerProps) => {
  const [languageList] = useAtom(languageListAtom);
  const theme = useTheme();
  const [user, setUser] = useAtom(userAtom);
  const [, setToast] = useAtom(toastAtom);
  const [changePassword, setChangePassword] = useState(false);

  //제출 폼 관련
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
      email: user.userEmail,
      username: user.userName,
      password: '',
      confirmPassword: '',
      language: user.languageName,
      avatar: user.profileImageUrl,
    },
  });
  const { errors } = formState;
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Add this line
  const validatePassword = (value: string) => {
    if (value === getValues().password) {
      return true;
    } else {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return false;
    }
  };

  // 업데이트 후 유저 정보 다시 불러오기
  const { data: userResultData, refetch: refetchUserResult } =
    getUserDataResultsUpdate(user.userAccountNo);

  // 정보 수정 요청하는 부분
  const updateMutation = postFormToUpdate();
  const onSubmit = (data: FormValues) => {
    console.log('email', data.email);
    console.log('username', data.username);
    console.log('password', data.password);
    console.log('avatar', data.avatar);
    console.log('language', data.language);
    const formData = new FormData();

    const updateUserDto = {
      userAccountNo: user.userAccountNo,
      password: data.password,
      userName: data.username,
      languageName: data.language,
    };
    formData.append(
      'updateUserDto',
      new Blob([JSON.stringify(updateUserDto)], { type: 'application/json' }),
    );
    console.log('data.avatar', data.avatar);
    if (selectedFile) {
      formData.append('userProfileImage', selectedFile);
    }
    updateMutation.mutate(formData, {
      onSuccess: data => {
        setToast({
          type: 'success',
          title: 'Update Success',
          message: 'User Updated successfully',
          isOpen: true,
        });
        toggleModal();
        reset();
        refetchUserResult();
      },
      onError: error => {
        setToast({
          type: 'error',
          title: 'Update Failed',
          message: 'User Update failed',
          isOpen: true,
        });
      },
    });
  };

  // 모달이 닫힐 때마다 폼을 리셋해준다.
  useEffect(() => {
    if (!isModalOpen) {
      reset({
        email: user.userEmail,
        username: user.userName,
        password: '',
        confirmPassword: '',
        language: user.languageName,
        avatar: user.profileImageUrl,
      });
    }
  }, [isModalOpen]);

  // refetch를 통해 유저 정보 업데이트 되면 상태저장하기
  useEffect(() => {
    if (userResultData) {
      console.log('userResultData', userResultData);
      setUser(userResultData);
      setToast({
        type: 'success',
        title: 'Status Updated',
        message: 'Status Updated successfully',
        isOpen: true,
      });
    }
  }, [userResultData]);

  const uploaderProps = {
    control: control,
    defaultAvatar: user.profileImageUrl,
    selectedFile: selectedFile,
    setSelectedFile: setSelectedFile,
  };
  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalContainer spacing="2.5rem">
          <StyledText>Update</StyledText>
          {/* Start of the form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack style={{ position: 'relative' }}>
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
                rules={{ required: 'First language is required' }}
                render={({ field }) => (
                  <HStack>
                    <Dropdown
                      placeholder="Select your first language"
                      size={'lg'}
                      options={[
                        { label: 'Select your first language', value: '' },
                        ...languageList,
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
              {/* 패스워드 부분 */}
              <CheckboxContainer>
                Change password
                <input
                  type="checkbox"
                  checked={changePassword}
                  onChange={() => setChangePassword(!changePassword)}
                />
                <span className="checkmark"></span>
              </CheckboxContainer>
              {changePassword && (
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
              )}

              {/* Avatar image upload */}

              <AvatarUploader {...uploaderProps} />
              <Spacer />
              <HStack w="100%" spacing="1rem" justifyContent="flex-end">
                <Button
                  size="xs"
                  type="submit" // Make this button submit the form
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

export default UpdateModal;

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

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 14px;

    .checkmark {
      height: 15px;
      width: 15px;
    }

    .checkmark:after {
      top: 6px;
      left: 6px;
      width: 4px;
      height: 4px;
    }
  }

  input {
    opacity: 0;
    height: 0;
    width: 0;
    margin-right: 10px;
  }

  .checkmark {
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
    position: relative;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  & input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & .checkmark:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
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
