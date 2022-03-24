import Ws from '../app/Services/Ws'
Ws.boot()

interface Display {
  socketId: string
  candidate: object
}

let activeSockets: string[] = []
let display: Display = {
  socketId: '',
  candidate: {},
}

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', socket => {
  activeSockets.push(socket.id)
  // console.log(activeSockets)

  ///////
  socket.on('i-am-display', data => {
    display.socketId = data.socketId
    activeSockets = activeSockets.filter(id => id != display.socketId)
  })

  socket.on('i-am-candidate', data => {
    socket.to(display.socketId).emit('new-candidate', {
      socket: socket.id,
      candidate: data.candidate,
    })
  })

  socket.on('make-offer', data => {
    socket.to(display.socketId).emit('offer-made', {
      socket: socket.id,
      offer: data.offer,
    })
  })

  socket.on('make-answer', data => {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer,
    })
  })

  socket.on('disconnect', () => {
    activeSockets = activeSockets.filter(
      existingSocket => existingSocket !== socket.id,
    )
    socket.broadcast.emit('remove-user', {
      socketId: socket.id,
    })
  })
})
