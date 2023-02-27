/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { DrawerContext, LoginContext, ProductsContext, HeaderContext } from "../contexts";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ProductPage } from "../pages";
import { ChildrenProp } from '../types/children'

export function RoutesApp() {

    const { setProductsTabBar, setArrImgBanner } = useContext(HeaderContext)
    const { toggleDrawerOptions } = useContext(DrawerContext)
    const { isLogged } = useContext(LoginContext)
    const { arrayTeste, setProducts } = useContext(ProductsContext)

    useEffect(() => {
        setArrImgBanner([
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
            },
        ])
        setProductsTabBar([
            {
                name: "celular",
                to: '/products/celular'
            },
            {
                name: "computador",
                to: '/products/computador'
            },
            {
                name: "TV",
                to: '/products/TV'
            },
            {
                name: "livro",
                to: '/products/livro'
            },
            {
                name: "esporte",
                to: '/products/esporte'
            },
            {
                name: "roupa",
                to: '/products/roupa'
            },
            {
                name: "games",
                to: '/products/game'
            },
            {
                name: "bebê",
                to: '/products/bebe'
            },
            {
                name: "brinquedo",
                to: '/products/brinquedo'
            },
            {
                name: "comida",
                to: '/products/comida'
            },
        ])
        setProducts(arrayTeste)
        if(isLogged){
            toggleDrawerOptions([
                {
                    icon: "home",

                    label: "Página inicial",
                    path: "/"
                },
                {
                    icon: 'person',
                    path: '/conta/:id',
                    label: 'Minha conta',
                },
                {
                    icon: "favorite",
                    label: "Favoritos",
                    path: "/favorite"
                }
                ,
                {
                    icon: "shopping_cart",
                    label: "Carrinho",
                    path: "/cart"
                },
                {
                    icon: "shopping_basket",
                    label: "Meus pedidos",
                    path: "/requests"
                }
                
            ])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:product" element={<ProductPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/login/:create" element={<Login />} />
            //!privado
            <Route path="/favorite" element={<PrivateRoute><FavoritePage /></PrivateRoute>} /> 
            //!privado
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} /> 
            //!privado
            <Route path="/precart/:id" element={<PrivateRoute><PreCartPage/></PrivateRoute>}/> 
        </Routes>
    );

}
function PrivateRoute({ children }: ChildrenProp){

    const { isLogged } = useContext(LoginContext)
    
    if (!isLogged) 
    return <Navigate to='/login'/>

    return children
}
