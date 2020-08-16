/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = {
  purge: {
    // paths to all of the template files in the project
    content: ["./src/**/*.html", "./src/**/*.tsx", "./public/**/*.html"],

    // default extractor including tailwind's special characters
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
  theme: {
    fontFamily: {
      sans: '"Fira Sans Extra Condensed"',
      hand: '"Yellowtail"',
    },
    extend: {
      colors: {
        primary: "#f0f3fc",
        secondary: "#2b334e",
        ternary: "#999CA4",
        neutral: "#5553df",
        success: "colors.green.500",
        warning: "#5553df",
        danger: "#5553df",
        title: "#242a3d",
        content: "#999CA4",
      },
      gridTemplateColumns: {
        home: "1fr auto",
      },
      gridTemplateRows: {
        home: "1fr auto",
      },
    },
  },
  variants: {},
  plugins: [],
};
