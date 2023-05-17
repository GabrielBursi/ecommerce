import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import 'react-toastify/dist/ReactToastify.min.css'

import { SideBar } from "./components";
import { ContextProvider } from "./contexts";
import { RoutesApp } from "./routes";
import { LightTheme } from "./theme";
import './index.css'

function App() {

  const queryClient = new QueryClient()

  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <ContextProvider>
          <SideBar>
            <QueryClientProvider client={queryClient}>
              <RoutesApp />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <ToastContainer />
          </SideBar>
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
