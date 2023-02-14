import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Form } from "../components";
import { LayoutBase } from "../layouts";

export function Login() {

    const { create } = useParams<'create'>();

    console.log(create);
    
    return (
        <LayoutBase showUserInfo showTabBar = {false}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Form title={create ? "CRIAR CONTA" : "FAZER LOGIN"} textButton={create ? "criar" : "entrar"} create={create  ? true : false}/>
            </Box>
        </LayoutBase>
    );
}