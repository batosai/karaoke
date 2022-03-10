import Ws from '../app/Services/Ws'
Ws.boot()

interface Tv {
  socketId: string;
  candidate: object;
}

let activeSockets: string[] = []
let tv: Tv = {
  socketId: '',
  candidate: {}
}

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', socket => {
  // const existingSocket = activeSockets.find(
  //   existingSocket => existingSocket === socket.id
  // );

  // if (!existingSocket) {
    activeSockets.push(socket.id)
    console.log(activeSockets)

    ///////
    socket.on("I am tv", data => {
      tv.socketId = data.socketId
      activeSockets = activeSockets.filter(id => id != tv.socketId)
      // tv.candidate = data.candidate
      console.log(tv)
    })


    socket.on("I am candidate", data => {
      socket.to(tv.socketId).emit("new candidate", {
        socket: socket.id,
        candidate: data.candidate
      })
    })

    socket.on("make-offer", data => {
      socket.to(tv.socketId).emit("offer-made", {
        socket: socket.id,
        offer: data.offer
      })
    })

    socket.on("make-answer", data => {
      socket.to(data.to).emit("answer-made", {
        socket: socket.id,
        answer: data.answer
      })
    })

    socket.on("disconnect", () => {
      console.log('disconnnect ' + socket.id)
      activeSockets = activeSockets.filter(
        existingSocket => existingSocket !== socket.id
      )
      socket.broadcast.emit("remove-user", {
        socketId: socket.id
      })
    })
  // }
})
