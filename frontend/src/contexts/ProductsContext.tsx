import { createContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { ChildrenProp, DepartmentCardProps, IProducts, IMyOrders } from "../types";

interface ProductsContextData {
    products: IProducts[],
    productsFavorited: IProducts[],
    productsInCart: IProducts[],

    setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsFavorited: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsInCart: React.Dispatch<React.SetStateAction<IProducts[]>>,

    productsDepartments: DepartmentCardProps[],
    setProductsDepartments: React.Dispatch<React.SetStateAction<DepartmentCardProps[]>>,

    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, uuid: string) => void,
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

    const [productsDepartments, setProductsDepartments] = useState<DepartmentCardProps[]>([]);

    function addProductInCart(
            isLogged: boolean, 
            navigate: NavigateFunction, 
            isAlreadyInCart: boolean, 
            product: IProducts,
        ) {
        if (!isLogged)
            return navigate('/login')

        if (isAlreadyInCart)
            return navigate('/cart')
        setProductsInCart([...productsInCart, product])
        navigate(`/precart/${product.uuid}`)
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
            setProductsDepartments ,
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
