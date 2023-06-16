import { useSetAtom } from "jotai";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";

const Home = () => {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

  return (
    <>
      홈페이지
      <button onClick={() => setIsAuthenticated(false)}>로그아웃</button>
    </>
  );
};

export default Home;
