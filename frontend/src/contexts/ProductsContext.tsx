import { createContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { ChildrenProp, DepartmentCardProps, id, IProducts, MyOrdersData } from "../types";

interface ProductsContextData {
    products: IProducts[],
    productsFavorited: IProducts[],
    productsInCart: IProducts[],

    setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsFavorited: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsInCart: React.Dispatch<React.SetStateAction<IProducts[]>>,

    productsDepartments: DepartmentCardProps[],
    setProductsDepartments: React.Dispatch<React.SetStateAction<DepartmentCardProps[]>>,

    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, id: id) => void,
    addProductInFavorited: (isLogged: boolean, navigate: NavigateFunction, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, isFavorite: boolean, product: IProducts, id: id) => void,
    removeProductFavorited(id: id): void,

    filterProductsAndSetFavoriteOrInCart(arr: IProducts[], id: id, setState: React.Dispatch<React.SetStateAction<boolean>>): void,
    myOrders: MyOrdersData[], 
    setMyOrders: (value: MyOrdersData[]) => void
}

const ProductsContext = createContext({} as ProductsContextData)

function ProductsProvider({ children }: ChildrenProp) {

    const [products, setProducts] = useState<IProducts[]>([]); 
    const [productsFavorited, setProductsFavorited] = useState<IProducts[]>([]); 
    const [productsInCart, setProductsInCart] = useState<IProducts[]>([]); 
    const [myOrders, setMyOrders] = useState<MyOrdersData[]>([]);

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
        navigate(`/precart/${product.id}`)
    }

    function addProductInFavorited(
            isLogged: boolean, 
            navigate: NavigateFunction, 
            setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, 
            isFavorite: boolean, 
            product: IProducts, 
            id: id
        ) {

        if (!isLogged)
            return navigate('/login')

        setIsFavorite(oldIsFavorite => !oldIsFavorite)
        if (!isFavorite) {
            setProductsFavorited([...productsFavorited, product ])
        } else {
            const productsFavoritedWithout = productsFavorited.filter(product => product.id !== id)
            setProductsFavorited(productsFavoritedWithout)
        }
    }

    function removeProductFavorited(id: id) {
        const productsFavoritedWithout = productsFavorited.filter(product => product.id !== id)
        setProductsFavorited(productsFavoritedWithout)
    }

    function filterProductsAndSetFavoriteOrInCart(arr: IProducts[], id: id, setState: React.Dispatch<React.SetStateAction<boolean>>){

        const productNotFavoritedOrInCart = arr.filter(product => product.id !== id)
        productNotFavoritedOrInCart.forEach(() => setState(false))

        const productFavoritedOrInCart = arr.filter(product => product.id === id)
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
            myOrders, 
            setMyOrders
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export {
    ProductsContext,
    ProductsProvider
}
