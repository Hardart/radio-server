import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { onConnection } from './service/socket-service'

const app = express()

const PORT = process.env.PORT || 3068
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { allowedHeaders: '*' },
})

async function startServer() {
  try {
    // console.log('====================================\nБД подключена\n====================================')
    httpServer.listen(PORT, () => {
      console.log('====================================')
      console.log(`Сервер запущен, порт: ${PORT}`)
      console.log('====================================')
    })

    // socket.listenPort(PORT)
  } catch (error) {
    console.log(error)
  }
}

startServer()

io.on('connection', onConnection(io))
