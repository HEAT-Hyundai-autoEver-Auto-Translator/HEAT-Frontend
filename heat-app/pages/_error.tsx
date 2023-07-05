import styled from '@emotion/styled';
import { Button } from 'components/common/Button';
import { NextPageContext } from 'next';
import Link from 'next/link';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

const ErrorMessage = styled.h1`
  color: white;
  margin-bottom: 1rem;
`;

const HomeLink = styled.a`
  color: white;
  cursor: pointer;
`;

type ErrorProps = {
  statusCode: number | undefined;
};

/**
 * @goto https://nextjs.org/docs/pages/building-your-application/routing/custom-error
 * 404 페이지는 따로 제공하는게 더 좋을 수 있다.
 * {errorCode}.tsx 파일이 존재한다면 그 파일을 먼저 랜더링 하고 없다면 여기에서 에러페이지가 랜더링 된다.
 */
const Error = ({ statusCode }: ErrorProps) => {
  return (
    <ErrorWrapper>
      <ErrorMessage>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </ErrorMessage>
      <Button size="lg">
        <Link href="/" passHref>
          <HomeLink>Go to Homepage</HomeLink>
        </Link>
      </Button>
    </ErrorWrapper>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
