import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { userAtom } from "utils/atoms/userAtom";

const HomePage = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const handleStart = () => {
    if (isAuthenticated) {
      router.push(`/main/${user.id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>HEAT에 오신 것을 환영합니다!</h1>
      <button onClick={handleStart}>시작하기</button>
    </div>
  );
};

export default HomePage;
