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
import { User } from 'types/schema/User';
import { useDebounce } from 'utils/hooks/useDebounce';
import { Text } from 'components/common/Text';
import { useTheme } from '@emotion/react';
import { Translation } from 'types/schema/Translation';
import DotMenu from 'public/DotMenu.svg';
import Avatar from 'components/common/Avatar';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { Divider } from 'components/common/Divider';
import { TranslationHistoryPanel } from 'components/pages/main/TranslationHistoryPanel';
const dummyUserList: User[] = [
  {
    userAccountNo: 1,
    userEmail: 'user1@example.com',
    userName: 'User 1',
    userRole: 'normal',
    imageUrl: 'https://example.com/user1.jpg',
    languageName: 'korean',
    signupDate: new Date(),
    lastAccessDate: new Date(),
  },
  {
    userAccountNo: 2,
    userEmail: 'user2@example.com',
    userName: 'User 2',
    userRole: 'normal',
    imageUrl: 'https://example.com/user2.jpg',
    languageName: 'english',
    signupDate: new Date(),
    lastAccessDate: new Date(),
  },
  {
    userAccountNo: 3,
    userEmail: 'user3@example.com',
    userName: 'User 3',
    userRole: 'admin',
    imageUrl: 'https://example.com/user3.jpg',
    languageName: 'japanese',
    signupDate: new Date(),
    lastAccessDate: new Date(),
  },
];

const ControlOptions = [
  { label: 'GIVE ADMIN', value: 'admin' },
  { label: 'DELETE USER', value: 'delete' },
];

const SortOptions = [
  { label: 'NEW', value: 'new' },
  { label: 'OLD', value: 'old' },
];

const Admin = () => {
  const [usernameInput, setUsernameInput] = useState('test');
  const [user, setUser] = useAtom(userAtom);
  const theme = useTheme();
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [showControlDropdown, setShowControlDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const debouncedSearchValue = useDebounce(usernameInput, 500);
  const [searchedUser, setSearchedUser] = useState<User | null>(defaultUser);
  const [searchedHistory, setSearchedHistory] = useState<Translation | null>(
    null,
  );
  const [userList, setUserList] = useState<User[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery(theme.Media.mobile_query);
  /**
   * @description username기반 쿼리 요청
   * 실제 백엔드에 유저 리스트를 검색하는 함수
   * @param username
   */
  const SearchUserList = async (username: string) => {
    //TODO: 실제 api와 통신하도록 수정
    // const response = await fetch(`/api/users?username=${username}`);
    // const users = await response.json();
    // return users;
    // return dummyUserList.filter(user => user.userName.includes(username));
  };

  /**
   * @description debounce 된 input 값이 변경되면 작동
   * 1. 검색 쿼리 보내기 -> SearchUserList 이용
   * 2. 드롭다운 보여주기 (결과 리스트 있으면)
   * 3. 드롭다운 닫기 (결과 리스트 없으면)
   */
  useEffect(() => {
    if (debouncedSearchValue !== '') {
      // SearchUserList(usernameInput).then(users => {
      //   setUserList(users);
      //   setShowDropdown(users.length > 0);
      // });
    } else {
      setShowInputDropdown(false);
    }
  }, [SearchUserList, debouncedSearchValue]);

  /**
   * @description input 값 변경시 작동
   * 1. input 값 변경
   * 2. 드롭다운 보여주기
   * @param event
   */
  const handleUsernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
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
    const selectedUser = dummyUserList.find(user => user.userName === userName);
    if (selectedUser) {
      setUsernameInput(selectedUser.userName);
    }
    if (showInputDropdown) {
      setShowInputDropdown(false);
    }
  };

  const handleControlDropdownSelect = (value: string) => {
    console.log(value);
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
      inputRef.current?.blur();
      setShowInputDropdown(false);
    }
  };

  const clearDropdowns = () => {
    setShowInputDropdown(false);
    setShowControlDropdown(false);
    setShowSortDropdown(false);
  };

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
              className={showInputDropdown ? 'show' : ''}
              size={'lg'}
            >
              {/* TODO: 더미 말고 실제 데이터로 바꿔야됨 userList 로 */}
              {dummyUserList
                .filter(user => user.userName !== 'Username')
                .map(user => (
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
              <Avatar
                src={searchedUser?.imageUrl || null}
                size="sm"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  clearDropdowns();
                  setShowControlDropdown(true);
                }}
              />
              <UserDropDownMenu
                className={showControlDropdown ? 'show' : ''}
                size="sm"
              >
                {ControlOptions.map(option => (
                  <DropdownItem
                    key={option.label}
                    onClick={() => handleControlDropdownSelect(option.value)}
                  >
                    <Text color="black" fontSize="lg" mobileFontSize="1rem">
                      {option.label}
                    </Text>
                  </DropdownItem>
                ))}
              </UserDropDownMenu>
            </div>
          </UserStatusWrapper>
          <Divider
            width="88%"
            thickness="2px"
            color={theme.colors.primary.semi_light}
          />
          <HistoryPanelContainer>
            <TranslationHistoryPanel />
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
    top: 5.5em;
  }
`;

const UserDropDownMenu = styled(DropdownMenu)`
  top: 21.5rem;
  width: 15rem;
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
