import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { IcecastService } from './service/icecast-service'
import { CacheService } from './service/cache-service'

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
const icecast = new IcecastService()
icecast.initRadioStream()
io.on('connection', (socket: Socket) => {
  socket.emit('radio:track', CacheService.metaData)
  icecast.initSocket(io)
})
