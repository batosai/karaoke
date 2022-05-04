import { Socket } from 'socket.io'
import Ws from 'App/Services/Ws'

export default class OffersController {
  public async make(socket: Socket, { pin, offer }: any) {
    console.log(pin)
    const room = Ws.rooms.get(pin)
    socket.to(room!.socketId).emit('offer:made', {
      socketId: socket.id,
      offer,
    })
  }
}
