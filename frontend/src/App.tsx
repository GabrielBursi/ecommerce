import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts";
import { RoutesApp } from "./routes";

function App() {

  return (
    <ContextProvider>
        <BrowserRouter>
          <RoutesApp/>
        </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
