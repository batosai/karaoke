import { Socket } from 'socket.io'
import Ws from 'App/Services/Ws'
import Player from 'App/Models/Player'

export default class PlayerController {

  public async store(socket: Socket, { pin, data }: any) {
    if (Ws.rooms.has(pin)) {
      const player = new Player({
        socketId: socket.id,
        ...data
      })

      const room = Ws.rooms.get(pin)
      room!.players.set(player.socketId, player)
      socket.to(room!.socketId).emit(
        'player:stored',
        Array.from(room!.players.values())
      )
    }
  }

  public async update(socket: Socket, { pin, data }: any) {
    if (Ws.rooms.has(pin)) {

      const room = Ws.rooms.get(pin)
      const player = room!.players.get(socket.id)
      if (player) {
        player.track = data.track

        room!.players.set(player.socketId, player)
        socket.to(room!.socketId).emit(
          'player:updated',
          Array.from(room!.players.values())
        )
      }

    }
  }

  public async delete(socket: Socket) {
    Ws.rooms.forEach(room => {
      if (room.players.has(socket.id)) {
        room.players.delete(socket.id)
        socket.to(room.socketId).emit(
          'player:delete',
          Array.from(room.players.values())
        )
      }
    })
  }
}
