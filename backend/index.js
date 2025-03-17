import 'dotenv/config'
import express from 'express'
import userRouter from './routes/user.js'
import cors from 'cors'
import accountRouter from './routes/account.js'

const app = express()

app.use(cors({
  origin: 'https://paytm-frontend-three.vercel.app/',
  credentials: true
}))
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/account", accountRouter)


export default app