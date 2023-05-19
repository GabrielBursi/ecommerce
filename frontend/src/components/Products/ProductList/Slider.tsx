import { useCallback, useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Box, Paper, Slider, Typography, useMediaQuery, useTheme } from "@mui/material"
import { ProductsListContext } from "../../../contexts"
import { IProducts } from "../../../types"

interface SliderProps {
    products: IProducts[]
}

export const SliderComponent = ({ products }: SliderProps) => {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { calculateMaxAndMinPrice, priceFilter, setPriceFilter } = useContext(ProductsListContext)

    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'

    function handleChangePrice(_: Event, newValue: number | number[], activeThumb: number) { //! a barra do slider não está mexendo
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < 100) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], priceFilter[1] - 100);
                setPriceFilter([clamped, clamped + 100]);
                setSearchParams({
                    page,
                    limit,
                    min: priceFilter[0].toString(),
                    max: priceFilter[1].toString(),
                }, { replace: true })
            } else {
                const clamped = Math.max(newValue[1], 100);
                setPriceFilter([clamped - 100, clamped]);
                setSearchParams({
                    page,
                    limit,
                    min: priceFilter[0].toString(),
                    max: priceFilter[1].toString(),
                }, { replace: true })
            }
        } else {
            setPriceFilter([...newValue])
            setSearchParams({
                    page,
                    limit,
                    min: priceFilter[0].toString(),
                    max: priceFilter[1].toString(),
                }, { replace: true })
        }
    }

    const handleSliderEnd = useCallback((_: React.SyntheticEvent) => {
        setTimeout(async () => {
            console.log('mudou slide');
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceFilter])

    useEffect(() => {
        console.log(products);
        // calculateMaxAndMinPrice(products) //! products pode ser undefined
        setSearchParams({
            page,
            limit,
            min: priceFilter[0].toString(),
            max: priceFilter[1].toString(),
        }, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    return (
        <Box width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' display='flex' alignItems='center' gap={1}>
            <Typography variant="subtitle1" fontWeight='bold'>
                Preço:
            </Typography>
            <Box component={Paper} width='100%' height={smDown ? '60%' : '100%'} display='flex' alignItems='center' flexDirection='column'>
                <Slider
                    size="small"
                    getAriaLabel={() => 'Price Range'}
                    defaultValue={priceFilter[1]}
                    max={priceFilter[1]}
                    min={priceFilter[0]}
                    disableSwap
                    value={priceFilter} //! a barra do slider não está mexendo
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
