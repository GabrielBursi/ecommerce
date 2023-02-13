import { BrowserRouter } from "react-router-dom";
import { TabBarProductsProvider, ThemeContextProvider } from "./contexts";
import { RoutesApp } from "./routes";

function App() {

  return (
    <ThemeContextProvider>
      <TabBarProductsProvider>
        <BrowserRouter>
          <RoutesApp/>
        </BrowserRouter>
      </TabBarProductsProvider>
    </ThemeContextProvider>
  );
}

export default App;
