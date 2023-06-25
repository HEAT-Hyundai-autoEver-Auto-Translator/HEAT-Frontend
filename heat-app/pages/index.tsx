import { useTheme } from '@emotion/react';
import { VStack } from 'components/common/Stack';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/atoms/userAtom';
import HeatLogo from '@/../public/HeatLogo.svg';
import AutoEverLogo from '@/../public/AutoEverLogo.svg';
import { Spacer } from 'components/common/Spacer';
import { Button } from 'components/common/Button';

const HomePage = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const theme = useTheme();
  const handleStart = () => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.id));
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <VStack
      w="100vw"
      h="100vh"
      spacing="5rem"
      style={{ backgroundColor: theme.colors.primary.default }}
    >
      <Spacer />
      <HeatLogo fill={theme.colors.mono.white} width="550" height="200" />
      <Button
        size="lg"
        fontColor={theme.colors.mono.white}
        bgColor={theme.colors.primary.semi_light}
        onClick={handleStart}
      >
        START
      </Button>
      <Spacer />
      <AutoEverLogo
        fill={theme.colors.mono.white}
        width="150"
        height="50"
        style={{ marginBottom: '2rem' }}
      />
    </VStack>
  );
};

export default HomePage;
