import { GlobalStyles as MuiGlobalStyles, useTheme } from "@mui/material";

// Global styles for the application
const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <MuiGlobalStyles
      styles={{
        ".MuiInputLabel-root.Mui-focused": {
          backgroundColor: theme.palette.background.inputField,
        },
      }}
    />
  );
};

export default GlobalStyles;
