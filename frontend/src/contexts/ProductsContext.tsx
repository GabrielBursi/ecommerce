import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { ChildrenProp, DepartmentCardProps, IProducts, IMyOrders } from "../types";
import { ServicesProducts } from "../services/api";
import { LoginContext } from "./LoginContext";
import { convertCurrency, formaProductPrice } from "../services/utils";

interface ProductsContextData {
    products: IProducts[],
    productsFavorited: IProducts[],
    productsInCart: IProducts[],
    myOrders: IMyOrders[],

    setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsFavorited: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsInCart: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setMyOrders: (value: IMyOrders[]) => void,

    productsDepartments: DepartmentCardProps[],

    getAllProducts: () => Promise<Id | undefined>
    getProductById: (uuid: string) => Promise<IProducts | Id>
    addProductInCart: (isAlreadyInCart: boolean, uuid: string) => void,
    alterQuantProduct: (uuid: string, action: '+' | '-') => Promise<void | Id>,
    purchase: (order: IMyOrders) => Promise<void | Id>,
    removeProductInCart: (uuid: string) => Promise<void | Id>,
    clearCart: () =>  Promise<Id | undefined>,
    addProductInFavorited: (setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, uuid: string) => void,
    removeProductFavorited: (uuid: string) => void,
}

const ProductsContext = createContext({} as ProductsContextData)

function ProductsProvider({ children }: ChildrenProp) {

    const [products, setProducts] = useState<IProducts[]>([]); 
    const [productsFavorited, setProductsFavorited] = useState<IProducts[]>([]); 
    const [productsInCart, setProductsInCart] = useState<IProducts[]>([]); 
    const [myOrders, setMyOrders] = useState<IMyOrders[]>([]);

    const { isLogged } = useContext(LoginContext)

    const navigate = useNavigate()

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

    async function getAllProducts(convert = false) {
        const products = await ServicesProducts.getAll()

        if (products instanceof Error) {
            return toast.error(products.message, {position: 'top-center'})
        }
        
        const productsFormated = formaProductPrice(products)

        if(convert){
            const productsFormatedAndConverted = await convertCurrency(productsFormated)
            setProducts(productsFormatedAndConverted)
        }else{
            setProducts(productsFormated)
        }

    }

    async function getProductById(uuid: string,){
        const product = await ServicesProducts.getById(uuid)

        if (product instanceof Error) {
            return toast.error(product.message, { position: 'top-center' })
        }

        return product
    }

    async function addProductInCart(
            isAlreadyInCart: boolean, 
            uuid: string,
        ) {
        if (!isLogged)
            return navigate('/login')

        if (isAlreadyInCart)
            return navigate('/cart')

        const products = await ServicesProducts.addInCart(uuid)

        if(products instanceof Error){
            return toast.error(products.message, { position: 'top-center' })
        }
        setProductsInCart(products)
        navigate(`/precart/${uuid}`)
    }

    async function alterQuantProduct(uuid: string, action : '+' | '-'){
        if(!isLogged){
            return navigate('/login')
        }

        const productAltered = await ServicesProducts.alterQuant(uuid, action)

        if (productAltered instanceof Error) {
            return toast.error(productAltered.message, { position: 'top-center' })
        }

        setProductsInCart(productAltered)
    }

    async function purchase(order: IMyOrders) {
        if (!isLogged) {
            return navigate('/login')
        }

        const myOrders = await ServicesProducts.purchase(order)

        if (myOrders instanceof Error) {
            return toast.error(myOrders.message, { position: 'top-center' })
        }

        setMyOrders(myOrders)
    }

    async function removeProductInCart(uuid: string) {
        if (!isLogged)
            return navigate('/login')

        const productsInCart = await ServicesProducts.excludeProductInCart(uuid)

        if (productsInCart instanceof Error) {
            return toast.error(productsInCart.message, { position: 'top-center' })
        }

        setProductsInCart(productsInCart)
    }

    async function clearCart() {
        const clearCart = await ServicesProducts.clear()

        if (clearCart instanceof Error) {
            return toast.error(clearCart.message, { position: 'top-center' })
        }
        
        setProductsInCart(clearCart)
    }

    async function addProductInFavorited(
            setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, 
            uuid: string
        ) {

        if (!isLogged)
            return navigate('/login')

        const favorites = await ServicesProducts.addInFavorites(uuid)

        if (favorites instanceof Error) {
            return toast.error(favorites.message, { position: 'top-center' })
        }

        setIsFavorite(true)
        setProductsFavorited(favorites)
    }

    async function removeProductFavorited(uuid: string) {
        if (!isLogged)
            return navigate('/login')

        const favorites = await ServicesProducts.excludeProductInFavorite(uuid)

        if (favorites instanceof Error) {
            return toast.error(favorites.message, { position: 'top-center' })
        }

        setProductsFavorited(favorites)
    }

    return (
        <ProductsContext.Provider value={{ 
            products,
            setProducts,
            productsInCart,
            setProductsInCart,
            productsFavorited,
            setProductsFavorited,
            myOrders,
            setMyOrders,

            productsDepartments,

            getAllProducts,
            getProductById,
            addProductInCart,
            addProductInFavorited,
            removeProductInCart,
            removeProductFavorited,

            clearCart,
            alterQuantProduct,
            purchase
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export {
    ProductsContext,
    ProductsProvider
}
