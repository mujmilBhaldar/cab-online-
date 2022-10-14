import * as React from "react";

interface IPageNotFoundProps {}

const PageNotFound: React.FunctionComponent<IPageNotFoundProps> = (props) => {
  return (
    <>
      <h2>Page not available</h2>
      <p>The page you are looking for is not available</p>
    </>
  );
};

export default PageNotFound;
