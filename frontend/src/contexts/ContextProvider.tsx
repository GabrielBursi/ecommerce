import { DrawerContextProvider, LoginContextProvider, TabBarProductsProvider, ThemeContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <ThemeContextProvider>
            <DrawerContextProvider>
                <LoginContextProvider>
                    <TabBarProductsProvider>
                            {children}
                    </TabBarProductsProvider>
                </LoginContextProvider>
            </DrawerContextProvider>
        </ThemeContextProvider>
    );
}
