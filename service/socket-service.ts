import { Socket } from 'socket.io'
import { IcecastService } from './icecast-service'
const icecast = new IcecastService()
icecast.initRadioStream()
export function onConnection(socket: Socket) {
  // icecast.readStream(socket)
  console.log(socket.id)
  // socket.on('radio:play', () => readStream(socket))
}
