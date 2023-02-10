import { Route, Routes } from "react-router";
import { HomePage } from "../pages";

export function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    );
}