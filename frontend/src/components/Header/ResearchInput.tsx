import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from "../../hooks";

export function ResearchInput(){

    const [productResearched, setProductResearched] = useState('');
    const navigate = useNavigate()
    const { debounce } = useDebounce()

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        const searchTerm = e.target.value;
        setProductResearched(searchTerm);

        if (searchTerm === '') {
            navigate('/', { replace: true });
        }else{
            debounce(() => {
                navigate(`/products/${searchTerm}`, {replace: true})
            })
        }

    } 

    return (
        <TextField
            id="standard-search"
            label="Pesquise aqui"
            variant="standard"
            fullWidth
            value={productResearched}
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="primary" />
                    </InputAdornment>
                ),
            }}
        />
    );
}