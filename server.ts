import * as dotenv from 'dotenv'
import app from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import ErrorService from './service/error-service'

dotenv.config({ path: __dirname + '/.env' })

const PORT = process.env.PORT || 3068
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { allowedHeaders: '*', credentials: true },
})

startServer()

io.on('connection', () => {})

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
