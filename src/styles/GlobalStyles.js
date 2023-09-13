import { GlobalStyles as MuiGlobalStyles } from "@mui/material";

// Global styles for the application
const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        ".MuiInputLabel-root.Mui-focused": {
          backgroundColor: "white",
        },
      }}
    />
  );
};

export default GlobalStyles;
