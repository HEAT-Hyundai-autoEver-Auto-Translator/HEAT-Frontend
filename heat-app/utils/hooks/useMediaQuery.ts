import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // 브라우저 환경이 아닌 경우 아무 작업도 수행하지 않음
    if (!isBrowser) {
      return (): void => {};
    }

    // MediaQueryList 객체를 불러옴, 기준값은 query값 반영
    const media = window.matchMedia(query);

    // `matches` 값과 `MediaQueryList` 객체의 `matches` 속성이 다른 경우에만 상태를 업데이트
    // 초기에 query 조건에 맞는지 확인해서 matches 값 변경
    // 즉 미디어 쿼리가 현재 상태랑 다른지 확인해서 다르면 matches 값 변경
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (event: MediaQueryListEvent): void => {
      // `MediaQueryList` 객체의 `matches` 값을 사용하여 상태를 업데이트하는 콜백 함수
      // 미디어 크기 변경 감지 해서 matches 값 변경
      setMatches(event.matches);
    };
    // `listener`를 `MediaQueryList` 객체에 추가
    media.addEventListener('change', listener);

    // 컴포넌트가 언마운트될 때 `listener`를 `MediaQueryList` 객체에서 제거하는 함수 반환
    return (): void => media.removeEventListener('change', listener);
  }, [matches, query]);

  // `matches` 값을 반환
  return matches;
};
