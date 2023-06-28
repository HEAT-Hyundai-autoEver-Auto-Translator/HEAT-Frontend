import '@emotion/react';

type Colors = {
  primary: {
    default: string;
    semi_light: string;
    light: string;
    semi_dark: string;
  };
  semantic: {
    success_light: string;
    success_default: string;
    warning_light: string;
    warning_default: string;
    error_light: string;
    error_default: string;
  };
  mono: {
    black: string;
    white: string;
    input_gray: string;
    gray300: string;
    gray200: string;
    gray100: string;
  };
  background: string;
};

type Fonts = {
  size: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    caption: string;
  };
  weight: {
    thin: number;
    // extralight: number;
    // light: number;
    regular: number;
    medium: number;
    // semibold: number;
    bold: number;
    // extrabold: number;
    // black: number;
  };
};

type ZIndex = {
  searchResult: number;
  absoluteButton: number;
  overlay: number;
  navBar: number;
  modal: number;
};

type Radius = {
  xs: string;
  sm: string;
  md: string;
  circle: string;
};

type Media = {
  mobile: string;
};

declare module '@emotion/react' {
  export interface Theme extends Theme {
    colors: Colors;
    fonts: Fonts;
    zIndex: ZIndex;
    radius: Radius;
    Media: Media;
  }
}
