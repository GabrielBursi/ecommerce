/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { DrawerContext, LoginContext, ProductsContext, HeaderContext } from "../contexts";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ListProductsPage, ProductPage, IndentificationPage, PaymentPage, ConfirmPage, DonePage, CartEmptyPage } from "../pages";
import { ApiTest, convertCurrency, userIsLogged } from "../services";
import { IProducts } from "../types";

export function RoutesApp() {

    const { setProductsTabBar, setArrImgBanner } = useContext(HeaderContext)
    const { toggleDrawerOptions } = useContext(DrawerContext)
    const { isLogged, setFormLogin, setIsLogged } = useContext(LoginContext)
    const { setProducts, setProductsDepartments } = useContext(ProductsContext)

    const arrayTESTE: IProducts[] = [
        {
            "id": "1f47d050-2963-4161-966c-d36b9cf03733",
            "name": "Apple iPhone 14, 128GB, Blue - Unlocked (Renewed)",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UY654_QL65_.jpg",
            "price": "$ 698.97",
            "rating": 3.7
        },
        {
            "id": "ba791aeb-65fe-4b49-924c-f4cb58aabb4e",
            "name": "Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 16.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Gray",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_UY654_QL65_.jpg",
            "price": "$ 2,649.99",
            "rating": 3.6
        },
        {
            "id": "86b14bb4-ff82-4986-bb10-450e1cbbf6ea",
            "name": "Apple Watch Series 7 (GPS, 45mm) Green Aluminum Case with Clover Sport Band, Regular (Renewed)",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/61NOPVDJghL._AC_UY654_QL65_.jpg",
            "price": "$ 354.99",
            "rating": 4.4
        },
        {
            "id": "d6ce246d-dd6d-42c4-a225-8531256489da",
            "name": "Skytech Archangel 3.0 Gaming PC Desktop – Intel Core i5 10400F 2.9 GHz, NVIDIA RTX 3060, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows 11 Home 64-bit",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/818vY0K7DAL._AC_UY654_QL65_.jpg",
            "price": "$ 999.99",
            "rating": 4.5
        },
        {
            "id": "9db39302-697b-4f6a-975d-659a92ed062b",
            "name": "SpaghettiOs Canned Pasta with Meatballs, Healthy Snack for Kids and Adults, 15.6 OZ Can (Pack of 12)",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/71uYB-oQXpL._AC_UL960_QL65_.jpg",
            "price": "$ 11.44",
            "rating": 4.6
        },
        {
            "id": "d3ecb3bd-703e-420a-a67e-0bf04aa34086",
            "name": "Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 16.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Gray",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_UY654_QL65_.jpg",
            "price": "$ 2,649.99",
            "rating": 3.6
        },
        {
            "id": "716c0940-8f46-4acd-ad29-6d745fc5fc7c",
            "name": "Apple Watch Series 7 (GPS, 45mm) Green Aluminum Case with Clover Sport Band, Regular (Renewed)",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/61NOPVDJghL._AC_UY654_QL65_.jpg",
            "price": "$ 354.99",
            "rating": 4.4
        },
        {
            "id": "6286f811-e035-4014-830f-debe1c506e51",
            "name": "Skytech Archangel 3.0 Gaming PC Desktop – Intel Core i5 10400F 2.9 GHz, NVIDIA RTX 3060, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows 11 Home 64-bit",
            "description": "teste",
            "img": "https://m.media-amazon.com/images/I/818vY0K7DAL._AC_UY654_QL65_.jpg",
            "price": "$ 999.99",
            "rating": 4.5
        }
    ]

    async function getProducts(){
        try {
            const res = await ApiTest('/products10')
            // const productsWithPriceConverted = await convertCurrency(res.data)
            // setProducts(productsWithPriceConverted)
            setProducts(res.data);
        } catch (error) {
            alert(error + ' API FAKE NÃO ESTA NO AR, COMANDO PARA API FAKE: npm run server - USANDO ARRAY DE TESTE COM 10 PRODUTOS');
            const arrayTESTEsemNumero = arrayTESTE.map(product => {
                if(typeof product.price === 'string'){
                    return {
                        ...product,
                        price: Number(product.price.replace('R$','').replace('$', '').replace(',', ''))
                    }
                }
                return product;
            })
            const productsWithPriceConverted =  await convertCurrency(arrayTESTEsemNumero)
            setProducts(productsWithPriceConverted)
        }
    }

    useEffect(() => {
        userIsLogged().then(data => {
            if(data && !(data instanceof Error)){
                setFormLogin(data)
                setIsLogged(true)
            }
        })
        
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
            <Route path="/cart_empty" element={<PrivateRoute><CartEmptyPage /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><CartEmptyRoute><CartPage /></CartEmptyRoute></PrivateRoute>} />
            <Route path="/cart/identification" element={<PrivateRoute><IndentificationPage /></PrivateRoute>} />
            <Route path="/cart/identification/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/cart/identification/payment/confirm" element={<PrivateRoute><ConfirmPage /></PrivateRoute>} />
            <Route path="/cart/identification/payment/confirm/done" element={<PrivateRoute><DonePage /></PrivateRoute>} /> 
            //!privado
            <Route path="/precart/:id" element={<PrivateRoute><PreCartPage/></PrivateRoute>}/> 
        </Routes>
    );

}

interface PrivateRouteChildren {
    children: JSX.Element
}

function PrivateRoute({ children }: PrivateRouteChildren){

    const { isLogged } = useContext(LoginContext)
    
    if (!isLogged) 
    return <Navigate to='/login'/>

    return children
}

function CartEmptyRoute({ children }: PrivateRouteChildren){

    const { productsInCart } = useContext(ProductsContext)

    if(productsInCart.length === 0)
    return <Navigate to='/cart_empty'/>

    return children
}
