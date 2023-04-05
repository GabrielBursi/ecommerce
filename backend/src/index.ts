import cors from 'cors'
import express from 'express'
import { router } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 3001, () => console.log('rodando'))
