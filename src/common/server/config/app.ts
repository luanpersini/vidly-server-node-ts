import cors from 'cors'
import express from 'express'
import setupRoutes from './routes'

const app = express()
app.use(cors())
app.use(express.json())

//routes last
setupRoutes(app)
export default app
