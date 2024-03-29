import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { router } from './src/routes'
import { connectToDatabase } from './src/database'
const app = express()

dotenv.config()
app.use(cors({
    exposedHeaders: ['x-user-id'],
}));
app.use(express.json())
app.use(router)

connectToDatabase()
    .then((data) => {
        if(typeof data === 'string'){
            app.listen(process.env.PORT || 3001)
            console.log('rodando ' + data)
        }else{
            console.error(data);
        }
    })
    .catch((error) => {
        console.log(error + 'Não conectou ao banco' );
    })