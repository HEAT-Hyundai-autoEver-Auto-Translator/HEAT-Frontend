import styled from '@emotion/styled';
import { AxiosError } from 'axios';

const ErrorWrapper = styled.div`
  color: red;
  text-align: center;
  padding: 1rem;
`;

export const ErrorComponent = ({
  error,
  refetch,
}: {
  error: unknown;
  refetch?: Function;
}) => {
  let errorMessage = 'An error occurred';
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data;
  }

  return (
    <ErrorWrapper>
      {errorMessage}
      {refetch && <button onClick={() => refetch()}>Try again</button>}
    </ErrorWrapper>
  );
};
