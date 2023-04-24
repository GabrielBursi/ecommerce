import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PrivateRouteChildren } from "./IPrivateRoute"
import { ProductsContext } from "../../contexts"

export function CartEmptyRoute({ children }: PrivateRouteChildren) {

    const { productsInCart } = useContext(ProductsContext)

    if (productsInCart.length === 0)
        return <Navigate to='/cart_empty' />

    return children
}