import { Server } from 'socket.io'
import { radioStation } from './app'
let title: string | undefined = ''
const io = new Server(3071, {
  cors: { allowedHeaders: '*' }
})

io.on('connection', (socket) => {
  console.log(socket.id)
  io.emit('meta', title)
})

radioStation.on('metadata', onMetadata)

function onMetadata(metadata: Map<string, string>) {
  const streamTitle = metadata.get('StreamTitle')
  if (title !== streamTitle) {
    title = streamTitle
    console.log(title)
    io.emit('meta', title)
  }
}
