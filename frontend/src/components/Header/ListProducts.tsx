import { useContext, useState } from "react";
import { AppBar, Tab, Tabs } from "@mui/material";
import { TabBarProductsContext } from "../../contexts";
import { TabBarProducts } from "../../types";
import { useNavigate } from "react-router-dom";

export function ListProducts() {

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
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                {products.map((item: TabBarProducts) => (
                    <Tab key={item.name} label={item.name} onClick={() => handleClick(item.to)}/>
                ))}
            </Tabs>
        </AppBar>
    );
}
