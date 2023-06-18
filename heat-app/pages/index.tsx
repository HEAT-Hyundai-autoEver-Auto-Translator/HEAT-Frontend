import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ROUTES } from "utils/ROUTES";
import { isAuthenticatedAtom } from "utils/atoms/isAuthenticatedAtom";
import { userAtom } from "utils/atoms/userAtom";

const HomePage = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const handleStart = () => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.id));
    } else {
      router.push(ROUTES.LOGIN);
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
