import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, ThemeContextProvider, AddressContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <ThemeContextProvider>
            <DrawerContextProvider>
                <LoginContextProvider>
                    <ProductsProvider>
                        <AddressContextProvider>
                            <HeaderContextProvider>
                                    {children}
                            </HeaderContextProvider>
                        </AddressContextProvider>
                    </ProductsProvider>
                </LoginContextProvider>
            </DrawerContextProvider>
        </ThemeContextProvider>
    );
}
