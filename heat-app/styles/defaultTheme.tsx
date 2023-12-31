const colors = {
  primary: {
    default: '#003F7F',
    semi_light: '#3182CE',
    light: '#EDF2F7',
    semi_dark: '#2D679B',
  },
  semantic: {
    success_light: '#C6F6D5',
    success_default: 'green',
    warning_light: '#FEEBCB',
    warning_default: 'orange',
    error_light: '#FED7D7',
    error_default: 'red',
  },
  mono: {
    black: '#161616',
    white: '#f9f9f9',
    input_gray: '#EDF2F7',
    gray300: '#777777',
    gray200: '#999999',
    gray100: '#bbbbbb',
  },
  background: '#f9f9f9',
};

const fonts = {
  size: {
    h1: '2.4rem',
    h2: '2.0rem',
    h3: '1.6rem',
    body: '1.4rem',
    caption: '1.1rem',
  },
  weight: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

const zIndex = {
  searchResult: 100,
  absoluteButton: 200,
  overlay: 300,
  navBar: 400,
  modal: 500,
  toast: 600,
};

const radius = {
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  circle: '50%',
};

const Media = {
  mobile: '768px',
  mobile_query: `(max-width : 768px)`,
};

export const defaultTheme = {
  colors,
  fonts,
  zIndex,
  radius,
  Media,
};
