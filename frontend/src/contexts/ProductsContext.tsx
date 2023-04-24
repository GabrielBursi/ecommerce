import { createContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { ChildrenProp, DepartmentCardProps, IProducts, IMyOrders } from "../types";
import { ServicesProducts } from "../services/api";

interface ProductsContextData {
    products: IProducts[],
    productsFavorited: IProducts[],
    productsInCart: IProducts[],

    setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsFavorited: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsInCart: React.Dispatch<React.SetStateAction<IProducts[]>>,

    productsDepartments: DepartmentCardProps[],

    getAllProducts(): Promise<Id | undefined>
    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, uuid: string) => void,
    addProductInFavorited: (isLogged: boolean, navigate: NavigateFunction, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, isFavorite: boolean, product: IProducts, uuid: string) => void,
    removeProductFavorited(uuid: string): void,

    filterProductsAndSetFavoriteOrInCart(arr: IProducts[], uuid: string, setState: React.Dispatch<React.SetStateAction<boolean>>): void,
    myRequests: IMyOrders[], 
    setMyRequests: (value: IMyOrders[]) => void
}

const ProductsContext = createContext({} as ProductsContextData)

function ProductsProvider({ children }: ChildrenProp) {

    const [products, setProducts] = useState<IProducts[]>([]); 
    const [productsFavorited, setProductsFavorited] = useState<IProducts[]>([]); 
    const [productsInCart, setProductsInCart] = useState<IProducts[]>([]); 
    const [myRequests, setMyRequests] = useState<IMyOrders[]>([]);

    const productsDepartments: DepartmentCardProps[] = [
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
    ]

    async function getAllProducts() {
        const products = await ServicesProducts.getAll()

        if (products instanceof Error) {
            return toast.error(products.message, {position: 'top-center'})
        }
        setProducts(products)
    }

    

    function addProductInFavorited(
            isLogged: boolean, 
            navigate: NavigateFunction, 
            setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, 
            isFavorite: boolean, 
            product: IProducts, 
            uuid: string
        ) {

        if (!isLogged)
            return navigate('/login')

        setIsFavorite(oldIsFavorite => !oldIsFavorite)
        if (!isFavorite) {
            setProductsFavorited([...productsFavorited, product ])
        } else {
            const productsFavoritedWithout = productsFavorited.filter(product => product.uuid !== uuid)
            setProductsFavorited(productsFavoritedWithout)
        }
    }

    function removeProductFavorited(uuid: string) {
        const productsFavoritedWithout = productsFavorited.filter(product => product.uuid !== uuid)
        setProductsFavorited(productsFavoritedWithout)
    }

    function filterProductsAndSetFavoriteOrInCart(arr: IProducts[], uuid: string, setState: React.Dispatch<React.SetStateAction<boolean>>){

        const productNotFavoritedOrInCart = arr.filter(product => product.uuid !== uuid)
        productNotFavoritedOrInCart.forEach(() => setState(false))

        const productFavoritedOrInCart = arr.filter(product => product.uuid === uuid)
        productFavoritedOrInCart.forEach(() => setState(true))
    }

    return (
        <ProductsContext.Provider value={{ 
            products, 
            setProducts, 
            productsFavorited, 
            setProductsFavorited, 
            productsInCart, 
            setProductsInCart, 
            productsDepartments, 
            getAllProducts,
            addProductInCart,
            addProductInFavorited,
            removeProductFavorited,
            filterProductsAndSetFavoriteOrInCart,
            myRequests, 
            setMyRequests
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export {
    ProductsContext,
    ProductsProvider
}
