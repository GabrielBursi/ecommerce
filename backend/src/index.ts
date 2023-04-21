import cors from 'cors'
import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'
import { connectToDatabase } from './database'
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