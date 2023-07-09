import { useMutation, useQuery } from 'react-query';
import { getDataWithParams, postDataWithBody } from '../api';
import formClient from '../formClient';
import apiClient from '../apiClient';

/**
 * @description 유저정보 요청을 위한 useQuery. 번역 번호 상태가 null이 아닐 때에만 실행.
 * userAccountNo가 null이 아닐 때에만 실행되도록 설정.
 * retry 3번, 3초 간격으로 재시도.
 * @param resultUserAccountNo : number
 */
export const getUserDataResultsLogin = (resultUserAccountNo: number | null) => {
  const data = useQuery(
    ['getUserDataResultsLogin', resultUserAccountNo],
    () =>
      getDataWithParams(`/user/uid`, {
        uid: resultUserAccountNo,
      }),
    { enabled: resultUserAccountNo !== null, retry: 3, retryDelay: 3000 },
  );
  return data;
};

/**
 * @description 유저정보 요청을 위한 useQuery.
 * refetch에의해서만 실행
 * @param userAccountNo : number
 */
export const getUserDataResultsUpdate = (userAccountNo: number | null) => {
  const data = useQuery(
    ['getUserDataResultsUpdate', userAccountNo],
    () =>
      getDataWithParams(`/user/uid`, {
        uid: userAccountNo,
      }),
    { enabled: false },
  );
  return data;
};

/**
 * @description 로그인 요청을 위한 useMutation
 * @param FormData
 * retry 3번, 1초 간격으로 재시도.
 * @returns tokens + userAccountNo
 */
export const postFormToLogin = () => {
  const data = useMutation(
    (userData: FormData) => postDataWithBody('/user/login', userData),
    { retry: 3, retryDelay: 1000 },
  );
  return data;
};

/**
 * @description 회원가입 요청을 위한 useMutation
 * @param FormData
 * @returns
 */
export const postFormToRegister = () => {
  const data = useMutation((userData: FormData) =>
    formClient.post('/user', userData),
  );
  return data;
};

/**
 * @description 유저 정보 수정을 위한 useMutation
 * @param FormData
 * @returns
 */
export const postFormToUpdate = () => {
  const data = useMutation((userData: FormData) =>
    formClient.patch('/user', userData),
  );
  return data;
};

/**
 * @description username기반 쿼리 요청
 * 실제 백엔드에 유저 리스트를 검색
 * @param debouncedSearchValue
 */
export const getDebounceList = (debouncedSearchValue: string) => {
  const data = useQuery(
    ['getDebounceList', debouncedSearchValue],
    () =>
      getDataWithParams(`/user/list/`, {
        username: debouncedSearchValue,
      }),
    { enabled: debouncedSearchValue !== null && debouncedSearchValue !== '' },
  );
  return data;
};

/**
 * @description username기반 쿼리 요청
 * 실제 백엔드에 특정 유저를 검색
 * @param usernameInput
 */
export const getSelectedUserData = (usernameInput: string) => {
  const data = useQuery(
    ['getSelectUser', usernameInput],
    () =>
      getDataWithParams(`/user/list/`, {
        username: usernameInput,
      }),
    { enabled: false },
  );
  return data;
};

/**
 * @description 해당 유저 삭제
 * 해당 값으로 유저 권한 변경
 * @param userRole
 */
export const deleteUserMutation = () => {
  const deleteUser = async (endpoint: string, userAccountNo: number) => {
    const { data } = await apiClient.delete(
      `${endpoint}/?uid=${userAccountNo}`,
    );
    return data;
  };
  const data = useMutation((userAccountNo: number) =>
    deleteUser('/admin/user', userAccountNo),
  );
  return data;
};
