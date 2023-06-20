import { NextPageContext } from "next";

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
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;