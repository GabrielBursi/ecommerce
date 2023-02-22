import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { TabBarProducts } from "../../types";

interface TabBarProps {
    productsTabBar: TabBarProducts[]
}

export function TabBar({productsTabBar}: TabBarProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()
    
    const [value, setValue] = useState<number>();
    
    const handleClick = (to: string) => {
        navigate(to)
    }

    return (
        <AppBar position="static">
            <Tabs
                value={value}
                onChange={(_: React.SyntheticEvent, newValue: number) => { setValue(newValue)}}
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
