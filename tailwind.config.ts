import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      th: "#616161",
      controlsBtn: "#575757",
      tableContent: "#1C1C1C",
      detailsLabel: "#929292",
      placeholder: "#959595",
      detailsHeader: "#787878",
      detailsText: "#000000",
      gray: "#F5F5F5",
      inputBorder: "#E0E0DF",
      boxBorder: "#F0F0F0",
      white: "#FFFFFF",
      detailsBorder: "#DFDFDF",
      loading: "#F8F8F8",
    },
    extend: {
      spacing: {
        "12": "47rem",
      },
    },
  },
  plugins: [],
};
export default config;
