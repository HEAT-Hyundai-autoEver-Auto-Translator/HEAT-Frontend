import { useMutation, useQuery } from 'react-query';
import { User } from 'types/schema/User';
import { getDataWithParams, postDataWithBody } from '../api';
import apiClient from '../apiClient';

/**
 * @description 번역 요청을 위한 useMutation
 * @param translationData : FormData
 * @returns
 */
export const postFormToTranslation = () => {
  const data = useMutation((translationData: FormData) =>
    postDataWithBody('/translation', translationData),
  );
  return data;
};

/**
 * @description 번역 결과 요청을 위한 useQuery. 번역 번호 상태가 null이 아닐 때에만 실행.
 * @param translationNo : number
 * @returns
 */
export const getTranslationResult = (translationNo: number | null) => {
  const data = useQuery(
    ['getTranslationResult', translationNo],
    () =>
      getDataWithParams(`/translation/translation-no`, {
        'translation-no': translationNo,
      }),
    {
      enabled: translationNo !== null,
      retry: (failureCount, error: { response: { status: number } }) => {
        // HTTP 상태 코드가 202이면 재시도
        return error.response.status === 202 && failureCount <= 10;
      },
      retryDelay: attemptIndex =>
        attemptIndex < 5 ? 1000 : (attemptIndex - 4) * 1000,
    },
  );
  return data;
};

/**
 * @description 드롭다운 메뉴에서 선택시 작동
 * 1. 해당 값으로 input 값 변경
 * 2. 드롭다운 닫기
 * @param searchedUser
 */
export const getSearchedUserHistoryResult = (searchedUser: User | null) => {
  const data = useQuery(
    ['getSearchedUserHistoryResult', searchedUser],
    () =>
      getDataWithParams(`/translation/user-email`, {
        'user-email': searchedUser?.userEmail,
      }),
    { enabled: searchedUser !== null, retry: 5, retryDelay: 5000 },
  );
  return data;
};

/**
 * @description 해당 유저 삭제
 * 해당 값으로 유저 권한 변경
 * @param userRole
 */
export const deleteHistory = () => {
  const deleteHistory = async (endpoint: string, translationNo: number) => {
    const { data } = await apiClient.delete(
      `${endpoint}/?translation-no=${translationNo}`,
    );
    return data;
  };
  const data = useMutation((translationNo: number) =>
    deleteHistory('/translation/translation-no', translationNo),
  );
  return data;
};
