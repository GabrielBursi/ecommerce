import { createContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { CepOptions, ChildrenProp, DepartmentCardProps, id, IProducts } from "../types";

interface ProductsContextData {
    products: IProducts[],
    productsFavorited: IProducts[],
    productsInCart: IProducts[],

    setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsFavorited: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsInCart: React.Dispatch<React.SetStateAction<IProducts[]>>,

    productsDepartments: DepartmentCardProps[],
    setProductsDepartments: React.Dispatch<React.SetStateAction<DepartmentCardProps[]>>,

    frete: number,
    setFrete: (value: number) => void,

    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, id: id) => void,
    addProductInFavorited: (isLogged: boolean, navigate: NavigateFunction, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, isFavorite: boolean, product: IProducts, id: id) => void,
    removeProductFavorited(id: id): void,

    filterProductsAndSetFavoriteOrInCart(arr: IProducts[], id: id, setState: React.Dispatch<React.SetStateAction<boolean>>): void,

    cepOptions: CepOptions[],
    setCepOptions: (value: CepOptions[]) => void,
}

const ProductsContext = createContext({} as ProductsContextData)

function ProductsProvider({ children }: ChildrenProp) {

    const cepOptionsDefault: CepOptions[] = [
        { name: 'Rede Sul', rating: 5, price: 'R$ 22,69', days: 4 },
        { name: 'Sedex', rating: 4.5, price: 'R$ 23,12', days: 6 },
        { name: 'GFL', rating: 5, price: 'R$ 30,24', days: 9 },
        { name: 'Correios PAC', rating: 4.5, price: 'R$ 47,49', days: 5 },
    ]

    const [cepOptions, setCepOptions] = useState<CepOptions[]>(cepOptionsDefault);

    const [products, setProducts] = useState<IProducts[]>([]); 
    const [productsFavorited, setProductsFavorited] = useState<IProducts[]>([]); 
    const [productsInCart, setProductsInCart] = useState<IProducts[]>([]); 

    const [productsDepartments, setProductsDepartments] = useState<DepartmentCardProps[]>([]);

    const [frete, setFrete] = useState<number>(0);

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
            cepOptions,
            setCepOptions,
            frete,
            setFrete
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export {
    ProductsContext,
    ProductsProvider
}
