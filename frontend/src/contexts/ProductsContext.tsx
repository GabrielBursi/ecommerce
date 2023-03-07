import { createContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import * as uuid from 'uuid';
import { ChildrenProp, DepartmentCardProps, id, IProducts } from "../types";

interface ProductsContextData {
    products: IProducts[],
    productsFavorited: IProducts[],
    productsInCart: IProducts[],

    setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsFavorited: React.Dispatch<React.SetStateAction<IProducts[]>>,
    setProductsInCart: React.Dispatch<React.SetStateAction<IProducts[]>>,

    productsDepartments: DepartmentCardProps[],
    setProductsDepartments: React.Dispatch<React.SetStateAction<DepartmentCardProps[]>>,

    arrayTeste: IProducts[],

    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, id: id) => void,
    addProductInFavorited: (isLogged: boolean, navigate: NavigateFunction, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, isFavorite: boolean, product: IProducts, id: id) => void,
    removeProductFavorited(id: id): void,

    filterProductsAndSetFavoriteOrInCart(arr: IProducts[], id: id, setState: React.Dispatch<React.SetStateAction<boolean>>): void,
}

const ProductsContext = createContext({} as ProductsContextData)

function ProductsProvider({ children }: ChildrenProp) {

    const [products, setProducts] = useState<IProducts[]>([]); 
    const [productsFavorited, setProductsFavorited] = useState<IProducts[]>([]); 
    const [productsInCart, setProductsInCart] = useState<IProducts[]>([]); 

    const [productsDepartments, setProductsDepartments] = useState<DepartmentCardProps[]>([]);

    const arrayTeste: IProducts[] = [ //!temporario
        {
            id: uuid.v4(),
            name: 'Apple iPhone 14, 128GB, Blue - Unlocked (Renewed)',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UY654_QL65_.jpg',
            price: '$ 698.97',
            rating: 3.7
        },
        {
            id: uuid.v4(),
            name: 'Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 16.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Gray',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_UY654_QL65_.jpg',
            price: '$ 2,649.99',
            rating: 3.6
        },
        {
            id: uuid.v4(),
            name: 'Apple Watch Series 7 (GPS, 45mm) Green Aluminum Case with Clover Sport Band, Regular (Renewed)',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/61NOPVDJghL._AC_UY654_QL65_.jpg',
            price: '$ 354.99',
            rating: 4.4
        },
        {
            id: uuid.v4(),
            name: 'Skytech Archangel 3.0 Gaming PC Desktop – Intel Core i5 10400F 2.9 GHz, NVIDIA RTX 3060, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows 11 Home 64-bit',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/818vY0K7DAL._AC_UY654_QL65_.jpg',
            price: '$ 999.99',
            rating: 4.5
        },
        {
            id: uuid.v4(),
            name: 'SpaghettiOs Canned Pasta with Meatballs, Healthy Snack for Kids and Adults, 15.6 OZ Can (Pack of 12)',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/71uYB-oQXpL._AC_UL960_QL65_.jpg',
            price: '$ 11.44',
            rating: 4.6
        },
        {
            id: uuid.v4(),
            name: 'Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 16.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Gray',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_UY654_QL65_.jpg',
            price: '$ 2,649.99',
            rating: 3.6
        },
        {
            id: uuid.v4(),
            name: 'Apple Watch Series 7 (GPS, 45mm) Green Aluminum Case with Clover Sport Band, Regular (Renewed)',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/61NOPVDJghL._AC_UY654_QL65_.jpg',
            price: '$ 354.99',
            rating: 4.4
        },
        {
            id: uuid.v4(),
            name: 'Skytech Archangel 3.0 Gaming PC Desktop – Intel Core i5 10400F 2.9 GHz, NVIDIA RTX 3060, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows 11 Home 64-bit',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/818vY0K7DAL._AC_UY654_QL65_.jpg',
            price: '$ 999.99',
            rating: 4.5
        },
        {
            id: uuid.v4(),
            name: 'PlayStation®5 + God of War Ragnarök',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/61kD52KblYL._AC_UL960_QL65_.jpg',
            price: 'R$ 4.499,90',
            rating: 4
        },
        {
            id: uuid.v4(),
            name: 'Console PlayStation 5',
            description: 'teste',
            img: 'https://m.media-amazon.com/images/I/51+qnZm7V7L._AC_UL960_QL65_.jpg',
            price: 'R$ 4.229,99',
            rating: 4
        },
    ]

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
            arrayTeste, 
            productsDepartments, 
            setProductsDepartments ,
            addProductInCart,
            addProductInFavorited,
            removeProductFavorited,
            filterProductsAndSetFavoriteOrInCart
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export {
    ProductsContext,
    ProductsProvider
}
