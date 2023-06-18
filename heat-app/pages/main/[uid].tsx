import AuthGuard from "components/auth/AuthGuard";
import { useRouter } from "next/router";

const MainPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  return (
    <AuthGuard>
      <>
        <div>main page</div>
        <div>{uid}</div>
      </>
    </AuthGuard>
  );
};

export default MainPage;
