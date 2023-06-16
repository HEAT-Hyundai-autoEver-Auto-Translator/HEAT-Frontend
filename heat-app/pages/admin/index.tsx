import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { userAtom } from "utils/atoms/userAtom";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);

  // console.log(isAuthenticated);
  const logout = () => {
    setIsAuthenticated(false);
    setUser((prev) => ({ ...prev, role: "User" }));
  };
  return (
    <>
      관리 페이지 입니다. 관리기능이 제공됩니다
      <button onClick={() => logout()}>로그아웃</button>
    </>
  );
};

export default Admin;
