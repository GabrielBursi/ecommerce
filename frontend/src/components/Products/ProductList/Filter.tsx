import { useContext, useEffect, useState } from "react";
import { Box, MenuItem, Paper, Select, SelectChangeEvent, Slider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ProductsContext } from "../../../contexts";

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
        if(typeof menorValor.price === 'number' && typeof maiorValor.price === 'number'){
            setHighestPrice(maiorValor.price)
            setLowestPrice(menorValor.price)
        }
        setPriceFilter([lowestPrice, highestPrice])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box height='100px' display='flex' justifyContent={smDown ? 'center' : mdDown ? 'space-between' : 'center'} alignItems={smDown ? 'center' : 'end'} gap={smDown ? 0 : 2} flexDirection={smDown ? 'column' : 'row'} marginTop={smDown ? 1 : 0}>
            <Box width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' display='flex' alignItems='center' gap={1}>
                <Typography variant="subtitle1" fontWeight='bold'>
                    Preço:
                </Typography>
                <Box component={Paper} width='100%' height={smDown ? '60%' : '100%'} display='flex' alignItems='center' flexDirection='column'>
                    <Slider 
                        size="small"
                        getAriaLabel={() => 'Price Range'} 
                        defaultValue={highestPrice} 
                        max={highestPrice} 
                        min={lowestPrice} 
                        disableSwap
                        value={priceFilter}
                        onChange={handleChangePrice}
                        sx={{width: '95%'}}
                    />
                    <Box display='flex' alignItems='center' justifyContent='space-between' width='100%' paddingX={1}>
                        <Typography variant={smDown ? "body2" : "body1"}>{priceFilter[0].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                        <Typography variant={smDown ? "body2" : "body1"}>{priceFilter[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' display='flex' alignItems='center' gap={1}>
                <Typography variant="subtitle1" fontWeight='bold'>
                    Exibir: 
                </Typography>
                <Box component={Paper} width='100%' height={smDown ? '60%' : '100%'}>
                    <Select fullWidth value={filterPage} onChange={handleChangePage} sx={{height:'100%'}}>
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
