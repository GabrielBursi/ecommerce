import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, AddressContextProvider, ResumeContextProvider, ShoppingContextProvider, ProductsListProvider } from './'
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
                                    <ProductsListProvider>
                                        {children}
                                    </ProductsListProvider>
                                </HeaderContextProvider>
                            </ResumeContextProvider>
                        </AddressContextProvider>
                    </ProductsProvider>
                </ShoppingContextProvider>
            </LoginContextProvider>
        </DrawerContextProvider>
    );
}
