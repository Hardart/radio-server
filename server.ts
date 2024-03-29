import * as dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { onConnection } from './service/socket-service'
import mongoose from 'mongoose'
import router from './router'
import adminRoutes from './router/admin'
import filesRoutes from './router/files'
import ErrorService from './service/error-service'
import { ErrorHandler } from './middlewear/error-middleware'
import cors from 'cors'
import cookerParser from 'cookie-parser'
dotenv.config({ path: __dirname + '/.env' })
const app = express()

const PORT = process.env.PORT || 3068
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { allowedHeaders: '*', credentials: true },
})

app.use(express.json())
app.use(express.static('assets'))
app.use(cookerParser())
app.use(cors({ credentials: true }))
app.use('/api', router)
app.use('/uploads', filesRoutes)
app.use('/admin', adminRoutes)

app.use(ErrorHandler)

startServer()

io.on('connection', onConnection(io))

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL_LOCAL || '')
    console.log('====================================')
    console.log(`БД подключена`)
  } catch (error) {
    ErrorService.append(error)
  }
  app.listen(PORT, () => {
    console.log('====================================')
    console.log(`Сервер запущен, порт: ${PORT}`)
    console.log('====================================')
  })
}
