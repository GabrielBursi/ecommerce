import cors from 'cors'
import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 3001, () => console.log('rodando'))
