import Ws from '../app/Services/Ws'

Ws.boot()

Ws.on('room:create', 'RoomsController.create')
Ws.on('disconnect', 'RoomsController.delete')
Ws.on('player:store', 'PlayersController.store')
Ws.on('player:update', 'PlayersController.update')
Ws.on('disconnect', 'PlayersController.delete')
Ws.on('track:ended', 'TracksController.ended')
Ws.on('offer:make', ['webRTC', 'OffersController.make'])
Ws.on('answer:make', ['webRTC', 'AnswersController.make'])
Ws.on('candidature:create', ['webRTC', 'CandidaturesController.create'])
// Ws.on('disconnect', ['webRTC', 'ConnectionsController.delete'])


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
