/* eslint-disable react/jsx-no-comment-textnodes */
import { Route, Routes } from "react-router";
import { CartPage, FavoritePage, HomePage, Login, PreCartPage, ListProductsPage, ProductPage, IndentificationPage, PaymentPage, ConfirmPage, DonePage, CartEmptyPage, MyRequests } from "../pages";
import { CartEmptyRoute, PrivateRoute } from "./private";

export function RoutesApp() {
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