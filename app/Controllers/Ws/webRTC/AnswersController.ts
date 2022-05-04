import { Socket } from 'socket.io'

export default class AnswersController {
  public async make(socket: Socket, data: any) {
    socket.to(data.to).emit('answer:made', {
      socketId: socket.id,
      answer: data.answer,
    })
  }
}
