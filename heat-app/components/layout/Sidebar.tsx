import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { defaultUser, userAtom } from "utils/atoms/userAtom";

const Sidebar = () => {
  const [, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const logout = () => {
    setAuthenticated(false);
    setUser(defaultUser);
    router.push("/login");
  };

  return (
    <div>
      {/* 여기에 다른 사이드바 요소를 추가할 수 있습니다. */}
      사이드바 입니다
      {user && user.role === "admin" ? (
        <button onClick={() => router.push(`/admin/${user.id}`)}>
          관리자 페이지로
        </button>
      ) : null}
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default Sidebar;
