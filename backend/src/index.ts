import cors from 'cors'
import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'
import { connectToDatabase } from './database'
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 3001, async () => await connectToDatabase())