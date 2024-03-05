import * as dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { onConnection } from './service/socket-service'
import mongoose from 'mongoose'
import router from './router'
import adminRoutes from './router/admin'
dotenv.config({ path: __dirname + '/.env' })
const app = express()

const PORT = process.env.PORT || 3068
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { allowedHeaders: '*' },
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use('/admin', adminRoutes)

startServer()

io.on('connection', onConnection(io))

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL_LOCAL || '')
    console.log('====================================')
    console.log(`БД подключена`)
  } catch (error) {
    console.log(error)
  }
  httpServer.listen(PORT, () => {
    console.log('====================================')
    console.log(`Сервер запущен, порт: ${PORT}`)
    console.log('====================================')
  })
}
