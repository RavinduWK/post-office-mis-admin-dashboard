import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";

function PostmasterInterface() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/*Reset the css to default */}
        <CssBaseline />
        <TopBar />
        <div className="app">
          <SideBar />
          <main className="content"></main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PostmasterInterface;
