/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { ProductsContext } from "../contexts";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ListProductsPage, ProductPage, IndentificationPage, PaymentPage, ConfirmPage, DonePage, CartEmptyPage, MyRequests } from "../pages";
import { CartEmptyRoute, PrivateRoute } from "./private";
import { TESTEgetAllProducts } from "../services/test";

export function RoutesApp() {

    const { setProducts } = useContext(ProductsContext)

    useEffect(() => {
        TESTEgetAllProducts(false, false)
            .then(products => {
                if(Array.isArray(products)){
                    setProducts(products)
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:product" element={<ListProductsPage />} />
            <Route path="/product/:uuid" element={<ProductPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/login/:create" element={<Login />} />

            //!privado
            <Route path="/favorite" element={<PrivateRoute><FavoritePage /></PrivateRoute>} /> 

            <Route path="/precart/:uuid" element={<PrivateRoute><PreCartPage/></PrivateRoute>}/> 
            <Route path="/cart_empty" element={<PrivateRoute><CartEmptyPage /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><CartEmptyRoute><CartPage /></CartEmptyRoute></PrivateRoute>} />
            <Route path="/cart/identification" element={<PrivateRoute><IndentificationPage /></PrivateRoute>} />
            <Route path="/cart/identification/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/cart/identification/payment/confirm" element={<PrivateRoute><ConfirmPage /></PrivateRoute>} />
            <Route path="/cart/identification/payment/confirm/done" element={<PrivateRoute><DonePage /></PrivateRoute>} />
            <Route path="/my-requests" element={<PrivateRoute><MyRequests /></PrivateRoute>} /> 
        </Routes>
    );

}