import { createContext, useState } from "react";
import { CarouselBannerProps, ChildrenProp, TabBarProducts } from "../types";

interface HeaderContextData {
    productsTabBar: TabBarProducts[],
    setProductsTabBar: React.Dispatch<React.SetStateAction<TabBarProducts[]>>,
    arrImgBanner: CarouselBannerProps[], 
    setArrImgBanner: React.Dispatch<React.SetStateAction<CarouselBannerProps[]>>
}

const HeaderContext = createContext({} as HeaderContextData)

function HeaderContextProvider({ children }: ChildrenProp) {

    const [productsTabBar, setProductsTabBar] = useState<TabBarProducts[]>([]);
    const [arrImgBanner, setArrImgBanner] = useState<CarouselBannerProps[]>([]);

    return (
        <HeaderContext.Provider value={{ productsTabBar, setProductsTabBar, arrImgBanner, setArrImgBanner }}>
            {children}
        </HeaderContext.Provider>
    );
}

export {
    HeaderContext,
    HeaderContextProvider
}

