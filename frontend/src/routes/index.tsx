import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { DrawerContext, LoginContext, TabBarProductsContext } from "../contexts";
import { HomePage, Login, ProductPage } from "../pages";

export function RoutesApp() {

    const { setProducts } = useContext(TabBarProductsContext)
    const { toggleDrawerOptions } = useContext(DrawerContext)
    const { isLogged } = useContext(LoginContext)

    useEffect(() => {
        setProducts([
            {
                name: "celular",
                to: '/products/celulares'
            },
            {
                name: "computador",
                to: '/products/computadores'
            },
            {
                name: "TV",
                to: '/products/TV'
            },
            {
                name: "livro",
                to: '/products/livros'
            },
            {
                name: "esporte",
                to: '/products/esportes'
            },
            {
                name: "roupa",
                to: '/products/roupas'
            },
            {
                name: "games",
                to: '/products/games'
            },
            {
                name: "bebê",
                to: '/products/bebes'
            },
            {
                name: "brinquedo",
                to: '/products/brinquedos'
            },
            {
                name: "comida",
                to: '/products/comidas'
            },
        ])
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
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:product" element={<ProductPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/login/:create" element={<Login/>}/>
        </Routes>
    );
}