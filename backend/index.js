import 'dotenv/config'
import express from 'express'
import userRouter from './routes/user.js'
import cors from 'cors'
import accountRouter from './routes/account.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/account", accountRouter)

// app.listen(3000, ()=>console.log('listening at port 3000'))
export default app