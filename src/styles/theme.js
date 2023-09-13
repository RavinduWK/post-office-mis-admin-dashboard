import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          //Dark brown
          100: "#d9d6d6",
          200: "#b2aeac",
          300: "#8c8583",
          400: "#655d59",
          500: "#3f3430",
          600: "#322a26",
          700: "#261f1d",
          800: "#191513",
          900: "#0d0a0a",
        },
        cream: {
          100: "#fefef6",
          200: "#fdfdee",
          300: "#fdfde5",
          400: "#fcfcdd",
          500: "#fbfbd4",
          600: "#c9c9aa",
          700: "#97977f",
          800: "#646455",
          900: "#32322a",
        },
        brown: {
          100: "#eadedc",
          200: "#d4bdb8",
          300: "#bf9c95",
          400: "#a97b71",
          500: "#945a4e",
          600: "#76483e",
          700: "#59362f",
          800: "#3b241f",
          900: "#1e1210",
        },
        lightBrown: {
          100: "#f7f3ed",
          200: "#efe7db",
          300: "#e6dcc8",
          400: "#ded0b6",
          500: "#d6c4a4",
          600: "#ab9d83",
          700: "#807662",
          800: "#564e42",
          900: "#2b2721",
        },
        maroon: {
          100: "#e7d3d1",
          200: "#cea7a3",
          300: "#b67b74",
          400: "#9d4f46",
          500: "#852318",
          600: "#6a1c13",
          700: "#50150e",
          800: "#350e0a",
          900: "#1b0705",
        },
        yellow: {
          100: "#fcf4da",
          200: "#fae9b6",
          300: "#f7de91",
          400: "#f5d36d",
          500: "#f2c848",
          600: "#c2a03a",
          700: "#91782b",
          800: "#61501d",
          900: "#30280e",
        },
        white: "#fff",
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#0d0a0a",
          200: "#191513",
          300: "#261f1d",
          400: "#322a26",
          500: "#3f3430",
          600: "#D6C4A4", // changed
          700: "#8c8583",
          800: "#b2aeac",
          900: "#d9d6d6",
        },
        cream: {
          100: "#32322a",
          200: "#646455",
          300: "#97977f",
          400: "#c9c9aa",
          500: "#fbfbd4",
          600: "#fcfcdd",
          700: "#fdfde5",
          800: "#fdfdee",
          900: "#fefef6",
        },
        brown: {
          100: "#eadedc",
          200: "#d4bdb8",
          300: "#bf9c95",
          400: "#a97b71",
          500: "#945a4e",
          600: "#76483e",
          700: "#59362f",
          800: "#3b241f",
          900: "#1e1210",
        },
        lightBrown: {
          100: "#f7f3ed",
          200: "#efe7db",
          300: "#e6dcc8",
          400: "#ded0b6",
          500: "#d6c4a4",
          600: "#ab9d83",
          700: "#807662",
          800: "#564e42",
          900: "#2b2721",
        },
        maroon: {
          100: "#e7d3d1",
          200: "#cea7a3",
          300: "#b67b74",
          400: "#9d4f46",
          500: "#852318",
          600: "#6a1c13",
          700: "#50150e",
          800: "#350e0a",
          900: "#1b0705",
        },
        yellow: {
          100: "#fcf4da",
          200: "#fae9b6",
          300: "#f7de91",
          400: "#f5d36d",
          500: "#f2c848",
          600: "#c2a03a",
          700: "#91782b",
          800: "#61501d",
          900: "#30280e",
        },
        white: "#fff",
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[600],
            },
            secondary: {
              main: colors.cream[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.cream[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.lightBrown[400],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans 3", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
