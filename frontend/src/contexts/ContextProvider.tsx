import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, AddressContextProvider, ResumeContextProvider, ShoppingContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <DrawerContextProvider>
            <LoginContextProvider>
                <ShoppingContextProvider>
                    <ProductsProvider>
                        <AddressContextProvider>
                            <ResumeContextProvider>
                                <HeaderContextProvider>
                                    {children}
                                </HeaderContextProvider>
                            </ResumeContextProvider>
                        </AddressContextProvider>
                    </ProductsProvider>
                </ShoppingContextProvider>
            </LoginContextProvider>
        </DrawerContextProvider>
    );
}
