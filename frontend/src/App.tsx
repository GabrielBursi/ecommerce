import { BrowserRouter } from "react-router-dom";
import { SideBar } from "./components";
import { ContextProvider } from "./contexts";
import { RoutesApp } from "./routes";

import './index.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

function App() {

  return (
    <ContextProvider>
        <BrowserRouter>
          <SideBar>
            <RoutesApp/>
            <ToastContainer/>
          </SideBar>
        </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
