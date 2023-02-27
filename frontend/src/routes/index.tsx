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
    const { arrayTeste, setProducts, setProductsDepartments } = useContext(ProductsContext)

    useEffect(() => {
        setProducts(arrayTeste)
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
                to: '/products/games'
            },
            {
                name: "bebê",
                to: '/products/bebê'
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
        setProductsDepartments([
            {
                title: 'hardware',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/HARDWARE_1648493892.png&w=384&h=280&q=70',
                to: '/products/hardware'
            },
            {
                title: 'periféricos',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/PERIFERICOS.png&w=384&h=280&q=70',
                to: '/products/periféricos'
            },
            {
                title: 'games',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/GAMER.png&w=384&h=280&q=70',
                to: '/products/games'
            },
            {
                title: 'computadores',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/COMPUTADORES.png&w=384&h=280&q=70',
                to: '/products/computadores'
            },
            {
                title: 'tv',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/TV_1645045665.png&w=384&h=280&q=70',
                to: '/products/tv'
            },
            {
                title: 'celular & smartphone',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CELULAR-SMARTPHONE_1645045581.png&w=384&h=280&q=70',
                to: '/products/celular_smartphone'
            },
            {
                title: 'casa e decoração',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CASA-E-DECORACAO_1659439626.png&w=384&h=280&q=70',
                to: '/products/casa_decoração'
            },
            {
                title: 'eletrodomésticos',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/ELETRODOMESTICOS.png&w=384&h=280&q=70',
                to: '/products/eletrodomésticos'
            },
            {
                title: 'áudio',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/AUDIO.png&w=384&h=280&q=70',
                to: '/products/áudio'
            },
            {
                title: 'casa inteligente',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CASA-INTELIGENTE_1661457250.png&w=384&h=280&q=70',
                to: '/products/casa_inteligente'
            },
            {
                title: 'câmeras e drones',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CAMERAS-E-DRONES_1659439533.png&w=384&h=280&q=70',
                to: '/products/câmeras_drones'
            },
            {
                title: 'serviços digitais e softwares',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/SERVICOS-DIGITAIS_1657908578.png&w=384&h=280&q=70',
                to: '/products/serviços_digitais_softwares'
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
