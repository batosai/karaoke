import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import generatePin from 'random-string-gen'
import Ws from '../app/Services/Ws'
import DisplayConnexion from 'App/Models/DisplayConnexion'

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

let displays: object = {}

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', socket => {
  activeSockets.push(socket.id)
  // console.log(activeSockets)

  socket.on('display:new', async () => {
    const pin = generatePin({ length: 4, capitalization: 'uppercase' })
    const uri = Env.get('APP_URL') + Route.makeUrl('link.index')
    const fullUri = Env.get('APP_URL') + Route.makeUrl('link.index', {
      qs: {
        pin,
      }
    })

    displays[pin] = {
      pin,
      uri,
      fullUri,
      id: socket.id,
      players: []
    }

    await DisplayConnexion.create({
      pin,
      socketId: socket.id
    })

    socket.emit('display:store', {
      pin,
      uri,
      fullUri
    })
  })



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

  socket.on('disconnect', async () => {
    activeSockets = activeSockets.filter(
      existingSocket => existingSocket !== socket.id,
    )
    socket.broadcast.emit('remove-user', {
      socketId: socket.id,
    })

    await DisplayConnexion.query().where('socketId', socket.id).delete()
  })
})
