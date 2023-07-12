import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import AuthGuard from 'components/auth/AuthGuard';
import Avatar from 'components/common/Avatar';
import { Divider } from 'components/common/Divider';
import { DropdownItem, DropdownMenu } from 'components/common/DropDown';
import { HStack, VStack } from 'components/common/Stack';
import { Text } from 'components/common/Text';
import { TranslationHistoryPanel } from 'components/pages/main/TranslationHistoryPanel';
import { StyledInput } from 'components/premade/StyledInput';
import { deleteCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import BackIcon from 'public/BackIcon.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { User, UserRoleType } from 'types/schema/User';
import { ROUTES } from 'utils/ROUTES';
import { getSearchedUserHistoryResult } from 'utils/api/translation/translationAPI';
import {
  deleteUserMutation,
  getDebounceList,
  getSelectedUserData,
  patchUserRole,
} from 'utils/api/user/userAPI';
import eventBus from 'utils/eventBus';
import { useDebounce } from 'utils/hooks/useDebounce';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { toastAtom } from 'utils/jotai/atoms/toastAtom';
import { defaultUser, userAtom } from 'utils/jotai/atoms/userAtom';

const ControlOptions = [
  { label: 'GIVE ADMIN', value: 'admin' },
  { label: 'DELETE USER', value: 'delete' },
];

const Admin = () => {
  const [, setToast] = useAtom(toastAtom);
  const [usernameInput, setUsernameInput] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const theme = useTheme();
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [showControlDropdown, setShowControlDropdown] = useState(false);
  const [, setShowSortDropdown] = useState(false);
  const debouncedSearchValue = useDebounce(usernameInput, 500);
  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery(theme.Media.mobile_query);

  //debounce 된 input 값에 따라 유저 리스트 검색 쿼리 요청
  const { data: debounceList } = getDebounceList(debouncedSearchValue);

  //debounce 된 input 값에 따라 특정 유저 검색 쿼리 요청 (리스트중 최상위 유저가 특정됨)
  const { data: userDataResult, refetch: userDataRefetch } =
    getSelectedUserData(usernameInput);

  // 특정 유저의 번역 히스토리 검색 쿼리 요청
  const {
    data: searchedUserHistoryResult,
    isLoading: searchedUserHistoryIsLoading,
    refetch: searchedUserHistoryRefetch,
  } = getSearchedUserHistoryResult(searchedUser);

  /**
   * @description 유저 권한 변경
   * 해당 값으로 유저 권한 변경
   * @param userRole
   */
  const patchUserRoleMutation = patchUserRole(searchedUser?.userAccountNo);

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
    const selectedUser = debounceList.find(
      (user: User) => user.userName === userName,
    );
    if (selectedUser) {
      setUsernameInput(selectedUser.userName);
    }
    if (showInputDropdown) {
      setShowInputDropdown(false);
    }
  };

  // 유저 삭제를 위한 mutation
  const deleteUser = deleteUserMutation();

  // 드롭다운 메뉴에서 선택시 작동하는 함수 (유저 권한 변경, 유저 삭제)
  const handleControlDropdownSelect = (value: string) => {
    if (!searchedUser) return;
    if (value === 'delete') {
      deleteUser.mutate(searchedUser?.userAccountNo, {
        onSuccess: data => {
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
      patchUserRoleMutation.mutate(value as UserRoleType, {
        onSuccess: data => {
          setToast({
            type: 'success',
            title: 'Update Success',
            message: 'User role updated successfully',
            isOpen: true,
          });
          userDataRefetch();
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
      userDataRefetch();
      inputRef.current?.blur();
      setShowInputDropdown(false);
    }
  };

  // 모든 드롭다운 닫기 (다른 곳 클릭시)
  const clearDropdowns = () => {
    setShowInputDropdown(false);
    setShowControlDropdown(false);
    setShowSortDropdown(false);
  };

  // 유저 검색 쿼리 결과가 있으면 searchedUser에 저장
  useEffect(() => {
    if (userDataResult && userDataResult.length > 0) {
      if (userDataResult[0].userName === usernameInput) {
        setSearchedUser(userDataResult[0]);
      }
    }
  }, [userDataResult]);

  //리프래시 만료시 error감지해서 로그아웃
  useEffect(() => {
    const logout = () => {
      setIsAuthenticated(false);
      setUser(defaultUser);
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      router.push(ROUTES.LOGIN);
    };
    eventBus.on('logout', () => logout());
    return () => {
      eventBus.off('logout', logout);
    };
  }, [setIsAuthenticated, setUser, router]);
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
            {/* 자동완성 뜨는 부분 */}
            <InputDropDownMenu
              className={
                showInputDropdown && debounceList?.length > 0 ? 'show' : ''
              }
              size={'lg'}
            >
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
                    if (
                      searchedUser &&
                      user.userAccountNo !== searchedUser.userAccountNo
                    ) {
                      setShowControlDropdown(true);
                    }
                  }}
                />
              )}
              {/* 컨트롤메뉴 뜨는 부분  */}
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
                    onClick={() => handleControlDropdownSelect('user')}
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
