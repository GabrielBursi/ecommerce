import { useContext } from "react";
import { LoginContext, ProductsContext, ThemeContext } from "../contexts";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import {LayoutBase} from "../layouts";
import { ProductCard } from "../components";

export function HomePage() {

    const { toggleTheme } = useContext(ThemeContext)
    const { isLogged, setIsLogged } = useContext(LoginContext)
    const { products } = useContext(ProductsContext)

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <LayoutBase showResearchInput showUserInfo showBanner showActions = {isLogged}>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={toggleTheme}>Mudar tema</Button>
            <Button variant="contained" color="primary" onClick={() => setIsLogged(!isLogged)}>{isLogged ? 'Logout' : 'Login'}</Button>
            <Box display='flex' flexDirection='column' width='100%' gap={2}>
                {products.map(product => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        img={product.img}
                        rating={product.rating}
                        price={product.price}
                        title={product.title}
                        mdDown={mdDown}
                    />
                ))}
            </Box>
        </LayoutBase>
    );
}
