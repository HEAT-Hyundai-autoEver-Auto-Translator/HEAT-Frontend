import { useTheme } from '@emotion/react';
import { Button } from 'components/common/Button';
import { Spacer } from 'components/common/Spacer';
import { VStack } from 'components/common/Stack';
import { StyledAutoEverLogo } from 'components/premade/StyledAutoEverLogo';
import { StyledHeatLogo } from 'components/premade/StyledHeatLogo';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/ROUTES';
import { isAuthenticatedAtom } from 'utils/jotai/atoms/isAuthenticatedAtom';
import { userAtom } from 'utils/jotai/atoms/userAtom';

const HomePage = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const theme = useTheme();
  const handleStart = () => {
    if (isAuthenticated) {
      router.push(ROUTES.MAIN(user.userAccountNo));
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
      <StyledHeatLogo fill={theme.colors.mono.white} />
      <Button size="lg" onClick={handleStart}>
        START
      </Button>
      <Spacer />
      <StyledAutoEverLogo fill={theme.colors.mono.white} />
    </VStack>
  );
};

export default HomePage;
