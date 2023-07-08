import styled from '@emotion/styled';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.mono.white};
  font-size: 3rem;
  text-align: center;
  padding: 1rem;
`;
export const LoadingComponent = () => {
  return <LoadingWrapper>Loading...</LoadingWrapper>;
};
