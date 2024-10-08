module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended", // Basic ESLint recommended rules
    "plugin:react/recommended", // React-specific linting rules
    "plugin:react-native/all", // React Native-specific linting rules
    "plugin:import/errors", // Helps with import/export errors
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended", // Accessibility rules for JSX
    // 'prettier', // Prettier for code formatting (optional)
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12, // Support for modern ECMAScript syntax
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-native",
    "import",
    "jsx-a11y",
    "prettier", // Optional: if you're using Prettier for code formatting
  ],
  rules: {
    // Add custom rules or override default ones here
    "react/jsx-uses-react": "off", // Disable for React 17+
    "react/react-in-jsx-scope": "off", // Disable for React 17+
    "prettier/prettier": ["error", { endOfLine: "auto" }], // Optional: Prettier integration rules
    "react-native/no-inline-styles": "warn", // Warn for inline styles in React Native components
    "react-native/no-unused-styles": "error", // Disallow unused styles
    "react-native/no-color-literals": "warn", // Warn when color values are not stored in variables
    "react/prop-types": "off", // Disable prop-types as TypeScript is preferred
    "import/order": [
      "error",
      { groups: [["builtin", "external", "internal"]] },
    ], // Ensure a standard import order
    "no-unused-vars": "warn", // Warn on unused variables (useful for development)
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these file types
      },
    },
  },
};
