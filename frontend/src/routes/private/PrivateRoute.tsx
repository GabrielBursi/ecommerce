import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PrivateRouteChildren } from "./IPrivateRoute"
import { LoginContext } from "../../contexts"

export function PrivateRoute({ children }: PrivateRouteChildren) {

    const { isLogged } = useContext(LoginContext)

    if (!isLogged)
        return <Navigate to='/login' />

    return children
}