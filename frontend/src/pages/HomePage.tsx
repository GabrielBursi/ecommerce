import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { LoginContext, ProductsContext } from "../contexts";
import {LayoutBase} from "../layouts";
import { Carousel, DepartmentList } from "../components";
import { ServicesDepartments, ServicesProducts } from "../services/api";

export function HomePage() {

    const { isLogged, setIsLogged } = useContext(LoginContext)
    const { setProductsHome } = useContext(ProductsContext)

    const [products, departments] = useQueries({
        queries: [
            { queryKey: ['products-home'], queryFn: ServicesProducts.getProductsHome, staleTime: Infinity },
            { queryKey: ['departments'], queryFn: ServicesDepartments.getAll, staleTime: Infinity }
        ]
    })

    if(!(products.data instanceof Error ) && products.data){
        setProductsHome(products.data);
    }

    return (
        <LayoutBase showResearchInput showUserInfo showBanner showTabBar showActions = {isLogged}>
            <Button variant="contained" color="primary" onClick={() => setIsLogged(!isLogged)}>{isLogged ? 'Logout' : 'Login'}</Button>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' gap={2}>
                    <Box>
                        <Box display='flex' alignItems='center' gap={2} ml={2}>
                            <AutoAwesomeIcon color="primary" sx={{ fontSize: '2.2rem' }} />
                            <Typography color='primary' variant='h4' noWrap >
                                EM DESTAQUE
                            </Typography>
                        </Box>
                        <Carousel data={products.data} isLoading={products.isLoading} /> 
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <Box display='flex' alignItems='center' gap={2} ml={2}>
                            <ViewListIcon color="primary" sx={{ fontSize: '2.2rem' }} />
                            <Typography color='primary' variant='h4' noWrap >
                                DEPARTAMENTOS
                            </Typography>
                        </Box>
                        <Box m={2}>
                            <DepartmentList departments={departments}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}
