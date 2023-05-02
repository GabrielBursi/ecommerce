import { createContext } from "react";
import { CarouselBannerProps, ChildrenProp, TabBarProducts } from "../types";

interface HeaderContextData {
    productsTabBar: TabBarProducts[],
    arrImgBanner: CarouselBannerProps[], 
}

const HeaderContext = createContext({} as HeaderContextData)

function HeaderContextProvider({ children }: ChildrenProp) {
    
    const productsTabBar: TabBarProducts[] = [
        {
            name: "computadores",
            to: '/products/pc gamer'
        },
        {
            name: "monitores",
            to: '/products/monitor gamer'
        },
        {
            name: "cadeiras",
            to: '/products/cadeira gamer'
        },
        {
            name: "mouse e teclado",
            to: '/products/mouse e teclado'
        },
        {
            name: "celulares",
            to: '/products/celular'
        },
        {
            name: "vídeo games",
            to: '/products/vídeo games'
        },
        {
            name: "mundo geek",
            to: '/products/geek'
        },
        {
            name: "tv",
            to: '/products/TV'
        }
    ]

    const arrImgBanner: CarouselBannerProps[] = [
        {
            alt: 'Oferta do dia',
            src: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3061/banner_img.jpg&w=1920&h=400&q=100',
            to: '/'
        },
        {
            alt: 'Vem pro play',
            src: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3141/banner_img.jpg&w=1920&h=400&q=100',
            to: '/products/games'
        },
        {
            alt: 'Hora do buff',
            src: 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3140/banner_img.jpg&w=1920&h=400&q=100',
            to: '/products/computador'
        }
    ]

    return (
        <HeaderContext.Provider value={{ productsTabBar, arrImgBanner }}>
            {children}
        </HeaderContext.Provider>
    );
}

export {
    HeaderContext,
    HeaderContextProvider
}

