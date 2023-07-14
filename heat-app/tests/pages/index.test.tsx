import HomePage from '@/index';
import { fireEvent, render } from '@testing-library/react';
import { Provider, useAtom } from 'jotai';
import { useEffect } from 'react';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { defaultUser, userAtom } from 'utils/jotai/atoms/userAtom';

// mock Next.js의 useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const TestComponent = () => {
  const [_, setUser] = useAtom(userAtom);
  const [__, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    setUser(defaultUser);
    setIsAuthenticated(true);
  }, []);

  return <HomePage />;
};

test('HomePage renders and navigates correctly', () => {
  const mockRouter = require('next/router'); // Next.js Router를 모킹

  const { getByText } = render(
    <Provider>
      <TestComponent />
    </Provider>,
  );

  // "START" 버튼을 찾아서 클릭
  const startButton = getByText('START');
  fireEvent.click(startButton);

  // push 함수가 호출되었는지와 올바른 경로로 이동하는지 확인
  expect(mockRouter.useRouter().push).toHaveBeenCalledTimes(1);
  expect(mockRouter.useRouter().push).toHaveBeenCalledWith('/login'); // 이 경로는 당신의 ROUTES.MAIN 함수에 따라 달라질 수 있습니다.
});
