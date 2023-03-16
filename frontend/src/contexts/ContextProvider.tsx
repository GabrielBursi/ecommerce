import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, ThemeContextProvider, AddressContextProvider, ResumeContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <ThemeContextProvider>
            <DrawerContextProvider>
                <LoginContextProvider>
                    <ProductsProvider>
                        <AddressContextProvider>
                            <ResumeContextProvider>
                                <HeaderContextProvider>
                                        {children}
                                </HeaderContextProvider>
                            </ResumeContextProvider>
                        </AddressContextProvider>
                    </ProductsProvider>
                </LoginContextProvider>
            </DrawerContextProvider>
        </ThemeContextProvider>
    );
}
