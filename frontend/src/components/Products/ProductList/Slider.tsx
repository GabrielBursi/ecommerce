import { useCallback, useContext } from "react"
import { Box, Paper, Slider, Typography, useMediaQuery, useTheme } from "@mui/material"
import { ProductsListContext } from "../../../contexts"

export const SliderComponent = () => {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { priceFilter, setPriceFilter, highestPrice, lowestPrice } = useContext(ProductsListContext)

    function handleChangePrice(_: Event, newValue: number | number[], activeThumb: number) {
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
        } else {
            setPriceFilter([...newValue])
        }
    }

    const handleSliderEnd = useCallback((_: React.SyntheticEvent) => {
        setTimeout(async () => {
            console.log('mudou slide');
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceFilter])

    return (
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
                    onMouseUp={handleSliderEnd}
                    sx={{ width: '95%' }}
                />
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%' paddingX={1}>
                    <Typography variant={smDown ? "body2" : "body1"}>{priceFilter[0].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                    <Typography variant={smDown ? "body2" : "body1"}>{priceFilter[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
