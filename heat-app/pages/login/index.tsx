import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { userAtom } from "utils/atoms/userAtom";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    if (role === "Admin") {
      setUser((prev) => ({ ...prev, role: "Admin" }));
    }
    router.push("/"); // 로그인 후 이동할 경로 지정
  };

  return (
    <>
      로그인 페이지
      <button onClick={() => handleLogin("User")}>일반 로그인 버튼</button>
      <button onClick={() => handleLogin("Admin")}>관리자 로그인 버튼</button>
    </>
  );
};

export default Login;
