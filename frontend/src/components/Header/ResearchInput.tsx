import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function ResearchInput(){
    return (
        <TextField
            id="standard-search"
            label="Pesquise aqui"
            variant="standard"
            fullWidth
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
