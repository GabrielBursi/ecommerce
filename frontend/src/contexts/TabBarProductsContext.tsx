import { createContext, useState } from "react";
import { ChildrenProp, TabBarProducts } from "../types";

interface TabBarProductsContextData {
    productsTabBar: TabBarProducts[],
    setProductsTabBar: React.Dispatch<React.SetStateAction<TabBarProducts[]>>
}

const TabBarProductsContext = createContext({} as TabBarProductsContextData)

function TabBarProductsProvider({ children }: ChildrenProp) {

    const [productsTabBar, setProductsTabBar] = useState<TabBarProducts[]>([]);

    return (
        <TabBarProductsContext.Provider value={{ productsTabBar, setProductsTabBar }}>
            {children}
        </TabBarProductsContext.Provider>
    );
}

export {
    TabBarProductsContext,
    TabBarProductsProvider
}

