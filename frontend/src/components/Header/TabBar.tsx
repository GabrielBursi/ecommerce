import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { TabBarProducts } from "../../types";

interface TabBarProps {
    productsTabBar: TabBarProducts[]
}

export function TabBar({productsTabBar}: TabBarProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()
    const { product } = useParams<'product'>();

    const [value, setValue] = useState<number | boolean>(false);
    
    const nameProductsTabBar = (productsTabBar.map(product => product.to.replace('/products/', '')))
    
    useEffect(() => {
        if(product) return handleChange()
        
        setValue(false)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    function handleChange(){
        const index = nameProductsTabBar.indexOf(product || '')
        if (index === -1) return setValue(false)
        setValue(index)
    }
    
    const handleClick = (to: string) => {
        navigate(to)
    }

    return (
        <AppBar position="static">
            <Tabs
                value={value}
                indicatorColor="secondary"
                textColor='inherit'
                variant={mdDown ? "scrollable" : "fullWidth"}
                scrollButtons={mdDown ? true : false}
                allowScrollButtonsMobile
            >
                {productsTabBar.map((product: TabBarProducts) => (
                    <Tab 
                        key={product.name} 
                        label={product.name} 
                        onClick={() => handleClick(product.to)} 
                        sx={{ fontSize: '0.8rem' }}
                    />
                ))}
            </Tabs>
        </AppBar>
    );
}
