const colors = {
  primary: {
    default: "#003F7F",
    semi_light: "#2D679B",
    light: "#EDF2F7",
  },
  semantic: {
    success_light: "#C6F6D5",
    success_default: "green/500",
    warning_light: "#FEEBCB",
    warning_default: "orange/500",
    error_light: "#FED7D7",
    error_default: "red/500",
  },
  mono: {
    black: "#161616",
    white: "#f9f9f9",
    gray300: "#777777",
    gray200: "#999999",
    gray100: "#bbbbbb",
  },
  background: "#f9f9f9",
};

const fonts = {
  size: {
    h1: "2.4rem",
    h2: "2.0rem",
    h3: "1.6rem",
    body: "1.4rem",
    caption: "1.1rem",
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
};

const radius = {
  xs: "0.5rem",
  sm: "1rem",
  md: "2rem",
  circle: "50%",
};

export const defaultTheme = {
  colors,
  fonts,
  zIndex,
  radius,
};
