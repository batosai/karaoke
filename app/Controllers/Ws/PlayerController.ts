import { Socket } from 'socket.io'
import Ws from 'App/Services/Ws'
import Player from 'App/Models/Player'

export default class PlayerController {

  public async store(socket: Socket, { pin, data }: any) {
    if (Ws.rooms[pin]) {
      const player = new Player({
        socketId: socket.id,
        ...data
      })

      Ws.rooms[pin].players.push(player)
      socket.to(Ws.rooms[pin].socketId).emit('player:create', player)
    }
  }

  public async delete(socket: Socket) {
    Object.entries(Ws.rooms).forEach(room => {
      const pin = room[0]
      if (room[1].players) {
        Ws.rooms[pin].players = room[1].players.filter(
          p => p.socketId !== socket.id,
        )
      }

      socket.to(Ws.rooms[pin].socketId).emit('player:delete', Ws.rooms[pin].players)
    })
  }
}
