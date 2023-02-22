/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { DrawerContext, LoginContext, ProductsContext, TabBarProductsContext } from "../contexts";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ProductPage } from "../pages";

export function RoutesApp() {

    const { setProductsTabBar } = useContext(TabBarProductsContext)
    const { toggleDrawerOptions } = useContext(DrawerContext)
    const { isLogged } = useContext(LoginContext)
    const { arrayTeste, setProducts } = useContext(ProductsContext)

    useEffect(() => {
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
            <Route path="/favorite" element={<FavoritePage />} /> 
            //!privado
            <Route path="/cart" element={<CartPage />} /> 
            //!privado
            <Route path="/precart/:id" element={<PreCartPage/>}/> 
        </Routes>
    );
}