import { css } from "@emotion/react";

export const global = () => css`
  /* Reset CSS */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  ol,
  ul {
    list-style: none;
  }
  img {
    max-width: 100%;
    height: auto;
  }

  /* HTML defaults */
  html {
    font-size: 62.5%;
    font-family: "Inter", "Arial", sans-serif;
    line-height: 1.6;
  }

  /* Accessibility */
  a:focus {
    outline: 2px solid #000;
  }

  /* Body defaults */
  body {
    font-size: 1.6rem;
  }
`;
