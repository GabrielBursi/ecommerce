import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PrivateRouteChildren } from "./IPrivateRoute"
import { ShoppingContext } from "../../contexts"

export function CartEmptyRoute({ children }: PrivateRouteChildren) {

    const { userShop } = useContext(ShoppingContext)

    if (userShop?.cart.length === 0)
        return <Navigate to='/cart_empty' />

    return children
}