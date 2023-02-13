import { createContext, useState } from "react";
import { ChildrenProp, TabBarProducts } from "../types";

interface TabBarProductsContextData {
    products: TabBarProducts[],
    setProducts: React.Dispatch<React.SetStateAction<TabBarProducts[]>>
}

const TabBarProductsContext = createContext({} as TabBarProductsContextData)

function TabBarProductsProvider({ children }: ChildrenProp) {

    const [products, setProducts] = useState<TabBarProducts[]>([]);

    return (
        <TabBarProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </TabBarProductsContext.Provider>
    );
}

export {
    TabBarProductsContext,
    TabBarProductsProvider
}

