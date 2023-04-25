import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.min.css'
import { SideBar } from "./components";
import { ContextProvider } from "./contexts";
import { RoutesApp } from "./routes";
import { LightTheme } from "./theme";
import './index.css'

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <ContextProvider>
          <SideBar>
            <RoutesApp/>
            <ToastContainer/>
          </SideBar>
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
