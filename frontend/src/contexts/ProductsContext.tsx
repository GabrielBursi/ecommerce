import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { ChildrenProp, IDepartment, IProducts, IMyOrders } from "../types";
import { ServicesDepartments, ServicesProducts } from "../services/api";
import { LoginContext } from "./LoginContext";
import { ShoppingContext } from "./ShoppingContext";

interface ProductsContextData {
    productsHome: IProducts[],
    setProductsHome: (v: IProducts[]) => void,

    productsDepartments: IDepartment[],

    getProductsHome: () => Promise<Id | undefined>,
    getDepartments: () => Promise<Id | undefined>,
    getProductById: (uuid: string, setProduct: (value: IProducts) => void) => Promise<void | Id>
    addProductInCart: (uuid: string, isAlreadyInCart: boolean) => Promise<void | Id>,
    alterQuantProduct: (uuid: string, action: '+' | '-', setProduct: (value: IProducts) => void) => Promise<void | Id>,
    purchase: (order: Pick<IMyOrders, 'info'>) => Promise<void | Id>,
    removeProductInCart: (uuid: string) => Promise<void | Id>,
    clearCart: () => Promise<void | Id>,
    addProductInFavorites: (uuid: string, setIsFavorite: (value: boolean) => void) => Promise<void | Id>,
    removeProductFavorited: (uuid: string, setIsFavorite: (value: boolean) => void) => Promise<void | Id>,

    isLoadingQuantProduct: boolean,
    isLoadingRemoveProduct: boolean,
    isLoadingPurchase: boolean,
    isLoadingAddProduct: boolean,
    isLoadingGetProducts: boolean,

    seeProduct: (uuid: string) => void,
}

const ProductsContext = createContext({} as ProductsContextData)

function ProductsProvider({ children }: ChildrenProp) {

    const [productsHome, setProductsHome] = useState<IProducts[]>([]); 
    const [productsDepartments, setProductsDepartments] = useState<IDepartment[]>([]);

    const [isLoadingQuantProduct, setIsLoadingQuantProduct] = useState(false);
    const [isLoadingRemoveProduct, setIsLoadingRemoveProduct] = useState(false);
    const [isLoadingAddProduct, setIsLoadingAddProduct] = useState(false);
    const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);
    const [isLoadingGetProducts, setIsLoadingGetProducts] = useState(false);

    const { isLogged } = useContext(LoginContext)
    const { setUserShop, userShop } = useContext(ShoppingContext)

    const navigate = useNavigate()

    async function getProductsHome(){
        setIsLoadingGetProducts(true)
        const productsHome = await ServicesProducts.getProductsHome()
        setIsLoadingGetProducts(false)

        if (productsHome instanceof Error) {
            return toast.error(productsHome.message, {position: 'top-center'})
        }
        
        setProductsHome(productsHome)

    }

    async function getDepartments() {
        setIsLoadingGetProducts(true)
        const departments = await ServicesDepartments.getAll()
        setIsLoadingGetProducts(false)

        if (departments instanceof Error) {
            return toast.error(departments.message, { position: 'top-center' })
        }

        setProductsDepartments(departments)

    }

    async function getProductById(uuid: string, setProduct: (value: IProducts) => void) {
        const product = await ServicesProducts.getById(uuid)

        if (product instanceof Error) {
            return toast.error(product.message, { position: 'top-center' })
        }

        return setProduct(product)
    }

    async function addProductInCart(uuid: string, isAlreadyInCart: boolean) {
        if (!isLogged)
            return navigate('/login')

        if (isAlreadyInCart)
            return navigate('/cart')

        setIsLoadingAddProduct(true)
        const cart = await ServicesProducts.addInCart(uuid)
        setIsLoadingAddProduct(false)

        if(cart instanceof Error){
            return toast.error(cart.message, { position: 'top-center' })
        }

        const { total, products } = cart
        
        if (userShop) {
            navigate(`/precart/${uuid}`)
            return setUserShop({ ...userShop, cart: { total, products } })
        }
    }

    async function alterQuantProduct(uuid: string, action : '+' | '-', setProduct: (value: IProducts) => void){
        if(!isLogged){
            return navigate('/login')
        }
        setIsLoadingQuantProduct(true)
        const cart = await ServicesProducts.alterQuant(uuid, action)
        setIsLoadingQuantProduct(false)

        if (cart instanceof Error) {
            return toast.error(cart.message, { position: 'top-center' })
        }

        const productAltered = cart.products.filter(product => product.uuid === uuid)
        if(userShop){
            setUserShop({
                ...userShop,
                cart
            })
        }
        return setProduct(productAltered[0])
    }

    async function purchase(order: Pick<IMyOrders, 'info'>) {
        if (!isLogged) {
            return navigate('/login')
        }

        setIsLoadingPurchase(true)
        const myOrders = await ServicesProducts.purchase(order)
        setIsLoadingPurchase(false)

        if (myOrders instanceof Error) {
            return toast.error(myOrders.message, { position: 'top-center' })
        }

        if (userShop) {
            return setUserShop({ ...userShop, myOrders, cart: { total: 0, products: [] } })
        }
    }

    async function removeProductInCart(uuid: string) {
        if (!isLogged)
            return navigate('/login')

        setIsLoadingRemoveProduct(true)
        const cart = await ServicesProducts.excludeProductInCart(uuid)
        setIsLoadingRemoveProduct(false)

        if (cart instanceof Error) {
            return toast.error(cart.message, { position: 'top-center' })
        }

        if (userShop) {
            return setUserShop({ ...userShop, cart })
        }
    }

    async function clearCart() {
        setIsLoadingRemoveProduct(true)
        const clearCart = await ServicesProducts.clear()
        setIsLoadingRemoveProduct(false)

        if (clearCart instanceof Error) {
            return toast.error(clearCart.message, { position: 'top-center' })
        }
        if (userShop) {
            return setUserShop({ ...userShop, cart: {total: 0, products: []} })
        }
    }

    async function addProductInFavorites(uuid: string, setIsFavorite: (value: boolean) => void) {

        if (!isLogged)
            return navigate('/login')

        setIsLoadingAddProduct(true)
        const favorites = await ServicesProducts.addInFavorites(uuid)
        setIsLoadingAddProduct(false)

        if (favorites instanceof Error) {
            return toast.error(favorites.message, { position: 'top-center' })
        }

        setIsFavorite(true)
        if(userShop){
            return setUserShop({ ...userShop, favorites })
        }
    }

    async function removeProductFavorited(uuid: string, setIsFavorite: (value: boolean) => void)  {
        if (!isLogged)
            return navigate('/login')

        setIsLoadingRemoveProduct(true)
        const favorites = await ServicesProducts.excludeProductInFavorite(uuid)
        setIsLoadingRemoveProduct(false)

        if (favorites instanceof Error) {
            return toast.error(favorites.message, { position: 'top-center' })
        }

        setIsFavorite(false)
        if (userShop) {
            return setUserShop({ ...userShop, favorites })
        }
    }

    function seeProduct(uuid: string) {
        navigate(`/product/${uuid}`)
    }


    return (
        <ProductsContext.Provider value={{ 
            productsHome,
            setProductsHome,

            productsDepartments,

            getProductsHome,
            getDepartments,
            getProductById,
            addProductInCart,
            addProductInFavorites,
            removeProductInCart,
            removeProductFavorited,

            clearCart,
            alterQuantProduct,
            purchase,

            isLoadingPurchase,
            isLoadingQuantProduct,
            isLoadingRemoveProduct,
            isLoadingAddProduct,
            isLoadingGetProducts,
            
            seeProduct,
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export {
    ProductsContext,
    ProductsProvider
}
