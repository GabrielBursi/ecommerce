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
    const [arrImgBanner, setArrImgBanner] = useState<CarouselBannerProps[]>([
        {
            alt: 'Oferta do dia',
            src: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3061/banner_img.jpg&w=1920&h=400&q=100',
            to: '/'
        },
    ]);

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

