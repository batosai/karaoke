import { Socket } from 'socket.io'

export default class ConnectionsController {
  public async delete(socket: Socket) {
    socket.emit(
      'connection:delete',
      { socketId: socket.id }
    )
  }
}
