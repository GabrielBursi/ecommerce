import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, AddressContextProvider, ResumeContextProvider, ShoppingContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
        <DrawerContextProvider>
            <LoginContextProvider>
                <ProductsProvider>
                    <ShoppingContextProvider>
                        <AddressContextProvider>
                            <ResumeContextProvider>
                                <HeaderContextProvider>
                                    {children}
                                </HeaderContextProvider>
                            </ResumeContextProvider>
                        </AddressContextProvider>
                    </ShoppingContextProvider>
                </ProductsProvider>
            </LoginContextProvider>
        </DrawerContextProvider>
    );
}
