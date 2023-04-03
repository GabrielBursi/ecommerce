import { DrawerContextProvider, LoginContextProvider, ProductsProvider, HeaderContextProvider, AddressContextProvider, ResumeContextProvider } from './'
import { ChildrenProp } from "../types";

export function ContextProvider({children}: ChildrenProp) {
    return (
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
    );
}
