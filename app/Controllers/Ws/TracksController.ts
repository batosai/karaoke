import { Socket } from 'socket.io'
import Ws from 'App/Services/Ws'

export default class TracksController {

  public async ended(socket: Socket, { pin }: any) {
    if (Ws.rooms.has(pin)) {
      const room = Ws.rooms.get(pin)

      room!.players.forEach(player => {
        player.track = null

        socket.to(player.socketId).emit(
          'track:removed',
          player
        )
      })

      socket.emit(
        'player:updated',
        Array.from(room!.players.values())
      )
    }
  }

}
