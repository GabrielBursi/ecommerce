import { Box, Grid, Skeleton } from "@mui/material"

export const Loading = () => {
    return (
        <Box height='auto' width='100%'>
            <Grid container display='flex' justifyContent='center' alignItems='center'>
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map(item => (
                        <Grid item xs={12} sm={5} md={3} lg={2} key={item} display='flex' justifyContent='center' alignItems='center'>
                            <Skeleton width='240px' height='250px'/>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
