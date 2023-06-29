import styled from '@emotion/styled';

export const ErrorPanel = styled.div`
  width: 30rem;
  height: 30px;
  color: red;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: ${({ theme }) => theme.Media.mobile}) {
    width: 20rem;
    height: 2rem;
    font-size: 0.5rem;
  }
`;
