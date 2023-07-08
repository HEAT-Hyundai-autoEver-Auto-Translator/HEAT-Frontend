import styled from '@emotion/styled';
import AuthGuard from 'components/auth/AuthGuard';
import { HStack, VStack } from 'components/common/Stack';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/ROUTES';
import { defaultUser, userAtom } from 'utils/jotai/atoms/userAtom';
import BackIcon from 'public/BackIcon.svg';
import { StyledInput } from 'components/premade/StyledInput';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Dropdown, {
  DropdownItem,
  DropdownMenu,
} from 'components/common/DropDown';
import { User, UserRoleType } from 'types/schema/User';
import { useDebounce } from 'utils/hooks/useDebounce';
import { Text } from 'components/common/Text';
import { useTheme } from '@emotion/react';
import { Translation } from 'types/schema/Translation';
import DotMenu from 'public/DotMenu.svg';
import Avatar from 'components/common/Avatar';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { Divider } from 'components/common/Divider';
import { TranslationHistoryPanel } from 'components/pages/main/TranslationHistoryPanel';
import {
  deleteDataWithParams,
  getDataWithParams,
  patchDataWithBody,
} from 'utils/api/api';
import { useMutation, useQuery } from 'react-query';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';
import apiClient from 'utils/api/apiClient';
import { set } from 'react-hook-form';

const ControlOptions = [
  { label: 'GIVE ADMIN', value: 'admin' },
  { label: 'DELETE USER', value: 'delete' },
];

const SortOptions = [
  { label: 'NEW', value: 'new' },
  { label: 'OLD', value: 'old' },
];

const Admin = () => {
  const [, setToast] = useAtom(toastAtom);

  const [usernameInput, setUsernameInput] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const theme = useTheme();
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [showControlDropdown, setShowControlDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const debouncedSearchValue = useDebounce(usernameInput, 500);
  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const [searchedHistory, setSearchedHistory] = useState<Translation | null>(
    null,
  );
  const [userList, setUserList] = useState<User[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery(theme.Media.mobile_query);

  /**
   * @description username기반 쿼리 요청
   * 실제 백엔드에 유저 리스트를 검색
   * @param debouncedSearchValue
   */
  const {
    data: debounceList,
    isLoading: debounceIsLoading,
    isError: debounceIsError,
    error: debounceError,
    refetch: debounceRefetch,
  } = useQuery(
    ['getDebounceList', debouncedSearchValue],
    () =>
      getDataWithParams(`/user/list/`, {
        username: debouncedSearchValue,
      }),
    { enabled: debouncedSearchValue !== null && debouncedSearchValue !== '' },
  );

  /**
   * @description username기반 쿼리 요청
   * 실제 백엔드에 특정 유저를 검색
   * @param usernameInput
   */
  const {
    data: userDataResult,
    isLoading: userDataIsLoading,
    isError: userDataIsError,
    error: useDataError,
    refetch: userDataRefetch,
  } = useQuery(
    ['getSelectUser', usernameInput],
    () =>
      getDataWithParams(`/user/list/`, {
        username: usernameInput,
      }),
    { enabled: false },
  );

  /**
   * @description 드롭다운 메뉴에서 선택시 작동
   * 1. 해당 값으로 input 값 변경
   * 2. 드롭다운 닫기
   * @param searchedUser
   */
  const {
    data: searchedUserHistoryResult,
    isLoading: searchedUserHistoryIsLoading,
    isError: searchedUserHistoryIsError,
    error: searchedUserHistoryError,
    refetch: searchedUserHistoryRefetch,
  } = useQuery(
    ['getSearchedUserHistoryResult', searchedUser],
    () =>
      getDataWithParams(`/translation/user-email`, {
        'user-email': searchedUser?.userEmail,
      }),
    { enabled: searchedUser !== null, retry: 5, retryDelay: 5000 },
  );

  const deleteUser = async (endpoint: string, userAccountNo: number) => {
    const { data } = await apiClient.delete(
      `${endpoint}/?uid=${userAccountNo}`,
    );
    return data;
  };
  /**
   * @description 해당 유저 삭제
   * 해당 값으로 유저 권한 변경
   * @param userRole
   */
  const deleteUserMutation = useMutation((userAccountNo: number) =>
    // deleteDataWithParams('/admin/user', userAccountNo),
    deleteUser('/admin/user', userAccountNo),
  );

  /**
   * @description 유저 권한 변경
   * 해당 값으로 유저 권한 변경
   * @param userRole
   */
  const patchUserRole = useMutation((userRole: UserRoleType) =>
    patchDataWithBody('/admin/user', {
      userAccountNo: searchedUser?.userAccountNo,
      userRole: userRole,
    }),
  );

  /**
   * @description debounce 된 input 값이 변경되면 작동
   * 1. 검색 쿼리 보내기 -> SearchUserList 이용
   * 2. 드롭다운 보여주기 (결과 리스트 있으면)
   * 3. 드롭다운 닫기 (결과 리스트 없으면)
   */
  useEffect(() => {
    if (!debouncedSearchValue || debouncedSearchValue === '') {
      setShowInputDropdown(false);
    }
  }, [debouncedSearchValue]);

  /**
   * @description input 값 변경시 작동
   * 1. input 값 변경
   * 2. 드롭다운 보여주기
   * @param event
   */
  const handleUsernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
    if (debounceList && debounceList.length > 0)
      setShowInputDropdown(!!event.target.value);
  };

  /**
   * @description 드롭다운 메뉴에서 선택시 작동
   * 1. 해당 값으로 input 값 변경
   * 2. 드롭다운 닫기
   * @param userName
   */
  const handleInputDropdownSelect = (userName: string) => {
    //TODO: 이부분도 실제데이터로 바꿔야됨 userList 로
    const selectedUser = debounceList.find(
      (user: User) => user.userName === userName,
    );
    if (selectedUser) {
      setUsernameInput(selectedUser.userName);
      userDataRefetch();
    }
    if (showInputDropdown) {
      setShowInputDropdown(false);
    }
  };

  const handleControlDropdownSelect = (value: string) => {
    if (value === 'delete' && searchedUser) {
      deleteUserMutation.mutate(searchedUser?.userAccountNo, {
        onSuccess: data => {
          console.log(data);
          setToast({
            type: 'success',
            title: 'Delete Success',
            message: 'User deleted successfully',
            isOpen: true,
          });
          userDataRefetch();
        },
        onError: error => {
          setToast({
            type: 'error',
            title: 'Delete Failed',
            message: 'User Delete failed',
            isOpen: true,
          });
        },
      });
    }
    if (value === 'admin' || value === 'user') {
      patchUserRole.mutate(value as UserRoleType, {
        onSuccess: data => {
          setToast({
            type: 'success',
            title: 'Update Success',
            message: 'User role updated successfully',
            isOpen: true,
          });
        },
        onError: error => {
          setToast({
            type: 'error',
            title: 'Update Failed',
            message: 'User role update failed',
            isOpen: true,
          });
        },
      });
    }
    if (showControlDropdown) {
      setShowControlDropdown(false);
    }
  };

  const handleSortDropdownSelect = (value: string) => {
    console.log(value);
    if (showSortDropdown) {
      setShowSortDropdown(false);
    }
  };

  /**
   * @description input focus
   * 입력 값이 있었으면 focus 유지
   */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [usernameInput]);

  /**
   * @description 엔터키 입력시 작동
   * 1. 검색 쿼리 보내기(특정 유저 검색) -> searchedUser에 저장, searchedHistory에 저장
   * 2. 드롭다운 닫기
   * 3. input Focus -> blur
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(usernameInput);
      userDataRefetch();
      inputRef.current?.blur();
      setShowInputDropdown(false);
    }
  };

  const clearDropdowns = () => {
    setShowInputDropdown(false);
    setShowControlDropdown(false);
    setShowSortDropdown(false);
  };

  useEffect(() => {
    console.log('queryed user!!', userDataResult);
    if (userDataResult && userDataResult.length > 0) {
      setSearchedUser(userDataResult[0]);
      console.log('Avatar', userDataResult[0].avatar);
    } else {
      setSearchedUser(null);
      setUsernameInput('');
    }
  }, [userDataResult]);

  return (
    <AuthGuard adminOnly>
      <AdminPageContainer onClick={e => clearDropdowns()}>
        <AdminPanelContainer>
          <StyledTitle>ADMIN PAGE</StyledTitle>
          <StyledBackIcon
            onClick={() => router.push(ROUTES.MAIN(user.userAccountNo))}
          />
          <VStack>
            <StyledInput
              ref={inputRef}
              inputSize="lg"
              placeholder="Username"
              onChange={handleUsernameInputChange}
              onKeyDown={handleKeyDown}
              value={usernameInput}
              style={{ backgroundColor: theme.colors.mono.white }}
            />
            <InputDropDownMenu
              className={
                showInputDropdown && debounceList?.length > 0 ? 'show' : ''
              }
              size={'lg'}
            >
              {/* TODO: 더미 말고 실제 데이터로 바꿔야됨 userList 로 */}
              {debounceList &&
                debounceList.length > 0 &&
                debounceList
                  .filter((user: User) => user.userName !== 'Username')
                  .map((user: User) => (
                    <DropdownItem
                      key={user.userAccountNo}
                      onClick={() => handleInputDropdownSelect(user.userName)}
                    >
                      <Text color="black" fontSize="lg" mobileFontSize="sm">
                        {user.userName}
                      </Text>
                    </DropdownItem>
                  ))}
            </InputDropDownMenu>
          </VStack>
          <UserStatusWrapper>
            {isMobile ? (
              <VStack
                w="50%"
                style={{
                  alignItems: 'flex-start',
                }}
              >
                <StyledText>SELECTD</StyledText>
                <StyledText>{searchedUser?.userName}</StyledText>
              </VStack>
            ) : (
              <HStack
                w="70%"
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <StyledText>SELECTD : {searchedUser?.userName}</StyledText>
              </HStack>
            )}
            <div>
              {searchedUser && (
                <Avatar
                  src={searchedUser?.profileImageUrl || null}
                  size="sm"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    clearDropdowns();
                    setShowControlDropdown(true);
                  }}
                />
              )}
              <UserDropDownMenu
                className={showControlDropdown ? 'show' : ''}
                size="sm"
              >
                {searchedUser?.userRole !== 'admin' ? (
                  ControlOptions.map(option => {
                    return (
                      <DropdownItem
                        key={option.label}
                        onClick={() =>
                          handleControlDropdownSelect(option.value)
                        }
                      >
                        <Text
                          color={'black'}
                          fontSize="lg"
                          mobileFontSize="1rem"
                        >
                          {option.label}
                        </Text>
                      </DropdownItem>
                    );
                  })
                ) : (
                  <DropdownItem
                    onClick={() => handleControlDropdownSelect('remove')}
                  >
                    <Text color={'black'} fontSize="lg" mobileFontSize="1rem">
                      {'REMOVE ADMIN'}
                    </Text>
                  </DropdownItem>
                )}
              </UserDropDownMenu>
            </div>
          </UserStatusWrapper>
          <Divider
            width="88%"
            thickness="2px"
            color={theme.colors.primary.semi_light}
          />
          <HistoryPanelContainer>
            <TranslationHistoryPanel
              historyList={searchedUserHistoryResult}
              isLoading={searchedUserHistoryIsLoading}
              refetch={searchedUserHistoryRefetch}
            />
          </HistoryPanelContainer>
        </AdminPanelContainer>
      </AdminPageContainer>
    </AuthGuard>
  );
};

export default Admin;

const AdminPageContainer = styled(VStack)`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary.semi_light};
`;

const AdminPanelContainer = styled(VStack)`
  position: relative;
  width: 75rem;
  justify-content: flex-start;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.primary.default};
  @media ${({ theme }) => theme.Media.mobile_query} {
    width: 100%;
  }
`;

const StyledTitle = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: 3.5rem;
  color: white;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 2.5rem;
  }
`;

const StyledText = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};

  width: 100%;
  font-size: 3rem;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    font-size: 1.5rem;
  }
`;

const StyledBackIcon = styled(BackIcon)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const InputDropDownMenu = styled(DropdownMenu)`
  top: 14.7rem;
  width: 40rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    top: 6.3em;
  }
`;

const UserDropDownMenu = styled(DropdownMenu)`
  top: 21.5rem;
  width: 16rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    top: 10em;
    width: 11rem;
  }
`;

const UserStatusWrapper = styled(HStack)`
  width: 80%;
  margin: 2rem;
  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    margin: 1rem;
  }
`;

export const HistoryPanelContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
