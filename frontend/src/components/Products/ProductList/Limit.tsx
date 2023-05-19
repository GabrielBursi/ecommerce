import { useContext } from 'react'
import { Box, MenuItem, Paper, Select, SelectChangeEvent, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ProductsListContext } from '../../../contexts'
import { LimitProductsPerPageString } from '../../../types'
import { useSearchParams } from 'react-router-dom'

export const Limit = () => {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { setFilterPerPage, filterPerPage } = useContext(ProductsListContext)

    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'
    const min = searchParams.get('min') || '1'
    const max = searchParams.get('max') || '99999999'

    function handleChangePage(e: SelectChangeEvent) {
        setFilterPerPage(e.target.value as LimitProductsPerPageString)
        setSearchParams({ //! state atrasado
            page,
            limit: filterPerPage.split(' ')[0],
            min,
            max,
        }, { replace: true })
    }

    return (
        <Box width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' display='flex' alignItems='center' gap={1}>
            <Typography variant="subtitle1" fontWeight='bold'>
                Exibir: 
            </Typography>
            <Box component={Paper} width='100%' height={smDown ? '60%' : '100%'}>
                <Select fullWidth value={filterPerPage} onChange={handleChangePage} sx={{ height: '100%' }}>
                    <MenuItem value='20 por página'>20 por página</MenuItem>
                    <MenuItem value='40 por página'>40 por página</MenuItem>
                    <MenuItem value='60 por página'>60 por página</MenuItem>
                    <MenuItem value='80 por página'>80 por página</MenuItem>
                    <MenuItem value='100 por página'>100 por página</MenuItem>
                </Select>
            </Box>
        </Box>
    )
}
