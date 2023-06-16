import { useSetAtom } from "jotai";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";

const Login = () => {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  return (
    <>
      로그인페이지
      <button onClick={() => setIsAuthenticated(true)}>로그인 버튼</button>
    </>
  );
};

export default Login;
