import Ws from '../app/Services/Ws'

Ws.boot()

Ws.on('room:create', 'RoomController.create')
Ws.on('disconnect', 'RoomController.delete')
Ws.on('player:store', 'PlayerController.store')
Ws.on('player:update', 'PlayerController.update')
Ws.on('disconnect', 'PlayerController.delete')


/**
 * Listen for incoming socket connections
 */
// Ws.io.on('connection', socket => {
//   activeSockets.push(socket.id)

//   ///////
//   socket.on('i-am-display', data => {
//     display.socketId = data.socketId
//     activeSockets = activeSockets.filter(id => id != display.socketId)
//   })

//   socket.on('i-am-candidate', data => {
//     socket.to(display.socketId).emit('new-candidate', {
//       socket: socket.id,
//       candidate: data.candidate,
//     })
//   })

//   socket.on('make-offer', data => {
//     socket.to(display.socketId).emit('offer-made', {
//       socket: socket.id,
//       offer: data.offer,
//     })
//   })

//   socket.on('make-answer', data => {
//     socket.to(data.to).emit('answer-made', {
//       socket: socket.id,
//       answer: data.answer,
//     })
//   })

// })
