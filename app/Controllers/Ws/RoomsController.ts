import { Socket } from 'socket.io'
import Room from 'App/Models/Room'
import Ws from 'App/Services/Ws'

export default class RoomsController {

  public async create(socket: Socket) {
    const room = await Room.create({
      socketId: socket.id
    })
    Ws.rooms.set(room.pin, room)

    socket.emit('room:store', {
      pin: room.pin,
      uri: room.uri,
      fullUri: room.fullUri
    })
  }

  public async delete(socket: Socket) {
    const room = await Room.findByOrFail('socket_id', socket.id)

    Ws.rooms.delete(room.pin)
    room.delete()
  }

}
