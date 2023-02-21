import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { DrawerContext, LoginContext, TabBarProductsContext } from "../contexts";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ProductPage } from "../pages";

export function RoutesApp() {

    const { setProductsTabBar } = useContext(TabBarProductsContext)
    const { toggleDrawerOptions } = useContext(DrawerContext)
    const { isLogged } = useContext(LoginContext)

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
            <Route path="/login/:create" element={<Login />} />
            <Route path="/favorite" element={<FavoritePage />} /> //!privado
            <Route path="/cart" element={<CartPage />} /> //!privado
            <Route 
                path="/precart/:id" 
                element={
                        <PreCartPage 
                            img="https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UY654_QL65_.jpg" 
                            price="$698.97" 
                            title="Apple iPhone 14, 128GB, Blue - Unlocked (Renewed)" 
                        />
                    } 
            /> //!privado
        </Routes>
    );
}