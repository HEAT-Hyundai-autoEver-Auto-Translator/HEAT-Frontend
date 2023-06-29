import AutoEverLogo from '@/../public/AutoEverLogo.svg';
import styled from '@emotion/styled';

export const StyledAutoEverLogo = styled(AutoEverLogo)`
  width: 150px;
  height: 50px;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 100px;
    height: 30px;
  }
`;
