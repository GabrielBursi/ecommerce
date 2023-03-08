import { useContext, useEffect, useState } from "react";
import { Box, MenuItem, Paper, Select, SelectChangeEvent, Slider, Typography } from "@mui/material";
import { ProductsContext } from "../../contexts";

interface FilterProps {
    product?: string
}

export function Filter({ product }: FilterProps) {

    const { products } = useContext(ProductsContext)

    const [filterPage, setFilterPage] = useState('20 por página');
    const [numberFilterPage, setNumberFilterPage] = useState(Number(filterPage.split(' ')[0]));

    const [highestPrice, setHighestPrice] = useState(1000);
    const [lowestPrice, setLowestPrice] = useState(100);
    const [priceFilter, setPriceFilter] = useState<number[]>([lowestPrice, highestPrice]);

    function handleChangePrice(_: Event, newValue: number | number[], activeThumb: number){
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < 100) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], highestPrice - 100);
                setPriceFilter([clamped, clamped + 100]);
            } else {
                const clamped = Math.max(newValue[1], 100);
                setPriceFilter([clamped - 100, clamped]);
            }
        }else{
            setPriceFilter([...newValue])
        }
    }

    function handleChangePage(e: SelectChangeEvent){
        setFilterPage(e.target.value)
    }
    
    useEffect(() => {
        setNumberFilterPage(Number(filterPage.split(' ')[0]))
        console.log('Filtro de página: ', numberFilterPage);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterPage]);

    useEffect(() => {
        const menorValor = products.reduce((anterior, atual) => anterior.price < atual.price ? anterior : atual);
        const maiorValor = products.reduce((anterior, atual) => anterior.price > atual.price ? anterior : atual);
        setHighestPrice(Number(maiorValor.price.split(' ')[1].replace('.', '').replace(',', '.')))
        setLowestPrice(Number(menorValor.price.split(' ')[1]))
        setPriceFilter([lowestPrice, highestPrice])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    return (
        <Box height='15%' display='flex' justifyContent='center' alignItems='end' gap={2}>
            <Box width='30%' height='50%' display='flex' alignItems='center' gap={1}>
                <Typography variant="subtitle1" fontWeight='bold'>
                    Preço:
                </Typography>
                <Box component={Paper} height='100%' width='100%' display='flex' alignItems='center' flexDirection='column' paddingX={2}>
                    <Slider 
                    size="small"
                        getAriaLabel={() => 'Price Range'} 
                        defaultValue={highestPrice} 
                        max={highestPrice} 
                        min={lowestPrice} 
                        disableSwap
                        value={priceFilter}
                        onChange={handleChangePrice}
                    />
                    <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                        <Typography variant="body1">$ {priceFilter[0]}</Typography>
                        <Typography variant="body1">$ {priceFilter[1]}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box width='30%' height='50%' display='flex' alignItems='center' gap={1}>
                <Typography variant="subtitle1" fontWeight='bold'>
                    Exibir: 
                </Typography>
                <Box component={Paper} height='100%' width='100%'>
                    <Select fullWidth value={filterPage} onChange={handleChangePage}>
                        <MenuItem value='20 por página'>20 por página</MenuItem>
                        <MenuItem value='40 por página'>40 por página</MenuItem>
                        <MenuItem value='60 por página'>60 por página</MenuItem>
                        <MenuItem value='80 por página'>80 por página</MenuItem>
                        <MenuItem value='100 por página'>100 por página</MenuItem>
                    </Select>
                </Box>
            </Box>
        </Box>  
    );
}
