import { BrowserRouter } from "react-router-dom";
import { SideBar } from "./components";
import { ContextProvider } from "./contexts";
import { RoutesApp } from "./routes";

function App() {

  return (
    <ContextProvider>
        <BrowserRouter>
          <SideBar>
            <RoutesApp/>
          </SideBar>
        </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
