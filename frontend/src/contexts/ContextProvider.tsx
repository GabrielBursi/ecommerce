import { DrawerContextProvider, LoginContextProvider, ProductsProvider, TabBarProductsProvider, ThemeContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <ThemeContextProvider>
            <DrawerContextProvider>
                <LoginContextProvider>
                    <ProductsProvider>
                        <TabBarProductsProvider>
                                {children}
                        </TabBarProductsProvider>
                    </ProductsProvider>
                </LoginContextProvider>
            </DrawerContextProvider>
        </ThemeContextProvider>
    );
}
