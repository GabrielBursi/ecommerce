import { useContext } from "react";
import { Route, Routes } from "react-router";
import { TabBarProductsContext } from "../contexts";
import { HomePage } from "../pages";

export function RoutesApp() {

    const { setProducts } = useContext(TabBarProductsContext)

    setProducts([
        {
            name: "celulares",
            to: '/products/celulares'
        },
        {
            name: "computadores",
            to: '/products/computadores'
        },
        {
            name: "TV",
            to: '/products/TV'
        },
        {
            name: "livros",
            to: '/products/livros'
        },
        {
            name: "esportes",
            to: '/products/esportes'
        },
        {
            name: "roupas",
            to: '/products/roupas'
        },
        {
            name: "games",
            to: '/products/games'
        },
        {
            name: "bebês",
            to: '/products/bebes'
        },
        {
            name: "brinquedos",
            to: '/products/brinquedos'
        },
        {
            name: "comidas",
            to: '/products/comidas'
        },
    ])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:product" element={<h1>Ola</h1>} />
        </Routes>
    );
}