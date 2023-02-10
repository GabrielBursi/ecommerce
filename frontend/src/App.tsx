import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./contexts";
import { RoutesApp } from "./routes";

function App() {

  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <RoutesApp/>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
