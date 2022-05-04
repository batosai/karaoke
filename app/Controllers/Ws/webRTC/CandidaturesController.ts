import { Socket } from 'socket.io'
import Ws from 'App/Services/Ws'

export default class CandidaturesController {
  public async create(socket: Socket, { pin, candidate }: any) {
    const room = Ws.rooms.get(pin)
    socket.to(room!.socketId).emit('candidate:store', {
      socketId: socket.id,
      candidate,
    })
  }
}
