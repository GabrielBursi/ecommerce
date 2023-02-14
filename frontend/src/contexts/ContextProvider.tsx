import { LoginContextProvider, TabBarProductsProvider, ThemeContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <ThemeContextProvider>
            <TabBarProductsProvider>
                <LoginContextProvider>
                    {children}
                </LoginContextProvider>
            </TabBarProductsProvider>
        </ThemeContextProvider>
    );
}
