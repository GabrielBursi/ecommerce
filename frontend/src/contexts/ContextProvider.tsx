import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, ThemeContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <ThemeContextProvider>
            <DrawerContextProvider>
                <LoginContextProvider>
                    <ProductsProvider>
                        <HeaderContextProvider>
                                {children}
                        </HeaderContextProvider>
                    </ProductsProvider>
                </LoginContextProvider>
            </DrawerContextProvider>
        </ThemeContextProvider>
    );
}
