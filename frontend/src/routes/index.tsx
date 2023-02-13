import { useContext } from "react";
import { Route, Routes } from "react-router";
import { TabBarProductsContext } from "../contexts";
import { HomePage } from "../pages";
import ProductPage from "../pages/ProductPage";

export function RoutesApp() {

    const { setProducts } = useContext(TabBarProductsContext)

    setProducts([
        {
            name: "celular",
            to: '/products/celulares'
        },
        {
            name: "computador",
            to: '/products/computadores'
        },
        {
            name: "TV",
            to: '/products/TV'
        },
        {
            name: "livro",
            to: '/products/livros'
        },
        {
            name: "esporte",
            to: '/products/esportes'
        },
        {
            name: "roupa",
            to: '/products/roupas'
        },
        {
            name: "games",
            to: '/products/games'
        },
        {
            name: "bebê",
            to: '/products/bebes'
        },
        {
            name: "brinquedo",
            to: '/products/brinquedos'
        },
        {
            name: "comida",
            to: '/products/comidas'
        },
    ])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:product" element={<ProductPage/>} />
        </Routes>
    );
}