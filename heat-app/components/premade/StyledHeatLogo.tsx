import HeatLogo from '@/../public/HeatLogo.svg';
import styled from '@emotion/styled';

export const StyledHeatLogo = styled(HeatLogo)`
  width: 550px;
  height: 200px;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 250px;
    height: 100px;
  }
`;
