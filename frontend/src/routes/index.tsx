/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { DrawerContext, LoginContext, ProductsContext, HeaderContext } from "../contexts";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ListProductsPage, ProductPage } from "../pages";
import { ApiTest } from "../services";
import { ChildrenProp } from '../types/children'

export function RoutesApp() {

    const { setProductsTabBar, setArrImgBanner } = useContext(HeaderContext)
    const { toggleDrawerOptions } = useContext(DrawerContext)
    const { isLogged } = useContext(LoginContext)
    const { setProducts, setProductsDepartments } = useContext(ProductsContext)

    async function getProducts(){
        const res = await ApiTest('/')
        setProducts(res.data);
    }

    useEffect(() => {
        getProducts()
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
                name: "hardware",
                to: '/products/hardware'
            },
            {
                name: "periféricos",
                to: '/products/perifericos'
            },
            {
                name: "computadores",
                to: '/products/computadores'
            },
            {
                name: "monitores",
                to: '/products/monitores'
            },
            {
                name: "cadeira e mesa",
                to: '/products/cadeira_e_mesa'
            },
            {
                name: "vídeo games",
                to: '/products/vídeo_games'
            },
            {
                name: "mundo geek",
                to: '/products/geek'
            },
            {
                name: "tv",
                to: '/products/TV'
            }
        ])
        setProductsDepartments([
            {
                name: 'hardware',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/HARDWARE_1648493892.png&w=384&h=280&q=70',
                to: '/products/hardware'
            },
            {
                name: 'periféricos',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/PERIFERICOS.png&w=384&h=280&q=70',
                to: '/products/periféricos'
            },
            {
                name: 'games',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/GAMER.png&w=384&h=280&q=70',
                to: '/products/games'
            },
            {
                name: 'computadores',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/COMPUTADORES.png&w=384&h=280&q=70',
                to: '/products/computadores'
            },
            {
                name: 'tv',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/TV_1645045665.png&w=384&h=280&q=70',
                to: '/products/TV'
            },
            {
                name: 'celular & smartphone',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CELULAR-SMARTPHONE_1645045581.png&w=384&h=280&q=70',
                to: '/products/celular_smartphone'
            },
            {
                name: 'espaço gamer',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/ESPACO-GAMER_1658426219.png&w=384&h=280&q=70',
                to: '/products/espaço_gamer'
            },
            {
                name: 'tablets, ipads e e-readers',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/TABLETS-IPADS-E-E-READERS_1645096620.png&w=384&h=280&q=70',
                to: '/products/tablets'
            },
            {
                name: 'áudio',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/AUDIO.png&w=384&h=280&q=70',
                to: '/products/áudio'
            },
            {
                name: 'casa inteligente',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CASA-INTELIGENTE_1661457250.png&w=384&h=280&q=70',
                to: '/products/casa_inteligente'
            },
            {
                name: 'câmeras e drones',
                src: 'https://www.kabum.com.br/core/_next/image?url=https://static.kabum.com.br/conteudo/categorias/CAMERAS-E-DRONES_1659439533.png&w=384&h=280&q=70',
                to: '/products/câmeras_drones'
            },
            {
                name: 'serviços digitais e softwares',
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
            <Route path="/products/:product" element={<ListProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
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
