import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { TabBarProductsContext } from "../../contexts";
import { TabBarProducts } from "../../types";

export function ListProducts() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const { products } = useContext(TabBarProductsContext)

    const [value, setValue] = useState(0);

    const navigate = useNavigate()

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClick = (to: string) => {
        navigate(to)
    }

    return (
        <AppBar position="static">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant={mdDown ? "scrollable" : "fullWidth"}
                scrollButtons={mdDown ? true : false}
                allowScrollButtonsMobile
            >
                {products.map((item: TabBarProducts) => (
                    <Tab key={item.name} label={item.name} onClick={() => handleClick(item.to)} sx={{fontSize:'0.8rem'}}/>
                ))}
            </Tabs>
        </AppBar>
    );
}
