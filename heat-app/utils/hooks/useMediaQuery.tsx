import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // 브라우저 환경이 아닌 경우 아무 작업도 수행하지 않음
    if (!isBrowser) {
      return (): void => {};
    }

    const media = window.matchMedia(query);
    // `matches` 값과 `MediaQueryList` 객체의 `matches` 속성이 다른 경우에만 상태를 업데이트
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (event: MediaQueryListEvent): void => {
      // `MediaQueryList` 객체의 `matches` 값을 사용하여 상태를 업데이트하는 콜백 함수
      // 미디어 크기 변경 감지
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
