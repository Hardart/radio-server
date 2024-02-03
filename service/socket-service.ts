import { Socket } from 'socket.io'
import { readStream } from './icecast-service'

export function onConnection(socket: Socket) {
  readStream(socket)
}
