import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function ResearchInput(){

    const [productResearched, setProductResearched] = useState('');
    const navigate = useNavigate()

    function researchProduct(e: FormEvent){
        e.preventDefault()
        setProductResearched('')
        navigate(`/products/${productResearched}`)
    } 

    return (
        <form onSubmit={researchProduct} style={{ width: '100%' }}>
            <TextField
                id="standard-search"
                label="Pesquise aqui"
                variant="standard"
                fullWidth
                value={productResearched}
                onChange={(e) => setProductResearched(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="primary" sx={{ cursor: 'pointer' }} onClick={researchProduct} />
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
}