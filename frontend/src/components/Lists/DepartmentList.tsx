import { Grid, Skeleton } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query"
import { DepartmentCard } from "../Products"
import { IDepartment } from "../../types"
import { ErrorComponent } from "../Error"

interface DepartmentListProps {
    departments: UseQueryResult<Error | IDepartment[]>
}

export const DepartmentList = ({ departments }: DepartmentListProps) => {

    if(departments.data instanceof Error || !departments.data){
        return <ErrorComponent error={departments.data?.message}/>
    }

    return (
        <Grid container columnSpacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
            {departments.isLoading || departments.isFetching ?
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
                    <Grid item xs={3} key={item}>
                        <Skeleton
                            sx={{
                                width: '275px',
                                height: '250px',
                                marginX: 2
                            }}
                        />
                    </Grid>
                )
                :
                departments.data.map((product) => (
                    <Grid item xs={3} key={product.name}>
                        <DepartmentCard name={product.name} img={product.img} to={product.to} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
