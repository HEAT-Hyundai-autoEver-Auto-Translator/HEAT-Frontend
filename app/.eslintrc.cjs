module.exports = {
  // Specifies the environments where your code is designed to run
  env: {
    browser: true, // Browser global variables like window and document
    es2020: true, // Enables all ECMAScript 2020 globals and automatically sets the ecmaVersion parser option to 11
  },
  // A configuration file can extend the set of enabled rules from base configurations
  extends: [
    "eslint:recommended", // This configuration represents a set of best practices and syntax that works in every JavaScript runtime
    "plugin:@typescript-eslint/recommended", // A set of recommended rules for TypeScript from the @typescript-eslint plugin
    "plugin:react-hooks/recommended", // A set of recommended rules for React Hooks from the eslint-plugin-react-hooks
  ],
  // The parser that should be used to parse your source code
  parser: "@typescript-eslint/parser",
  // Parser options help ESLint determine what is a parsing error
  parserOptions: {
    ecmaVersion: "latest", // This option is set to the latest ECMAScript version to enable parsing of modern ECMAScript features
    sourceType: "module", // Indicates that your code is written in ECMAScript modules
  },
  // Plugins contain rules that are not included in the core ESLint rule set
  plugins: ["react-refresh"],
  // Enable or disable rules or set their severity level
  rules: {
    "react-refresh/only-export-components": "warn", // Warns when a module exports something other than a React component
  },
};
