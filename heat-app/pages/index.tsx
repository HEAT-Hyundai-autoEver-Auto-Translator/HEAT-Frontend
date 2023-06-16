import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { userAtom } from "utils/atoms/userAtom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  // console.log(isAuthenticated);
  const logout = () => {
    setIsAuthenticated(false);
    setUser((prev) => ({ ...prev, role: "User" }));
  };
  return (
    <>
      홈페이지입니다. 번역기능이 제공됩니다
      <button onClick={() => logout()}>로그아웃</button>
      {user.role === "Admin" ? (
        <button onClick={() => router.push("admin")}>
          관리자 페이지로 이동
        </button>
      ) : null}
    </>
  );
};

export default Home;
