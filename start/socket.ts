import Ws from '../app/Services/Ws'
Ws.boot()

interface Tv {
  socketId: string;
}

let activeSockets: string[] = []
let tv: Tv = {
  socketId: '',
}

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', socket => {
  const existingSocket = activeSockets.find(
    existingSocket => existingSocket === socket.id
  );

  // if (!existingSocket) {
    activeSockets.push(socket.id)
    console.log(activeSockets)

    ///////
    socket.on("I am tv", data => {
      tv.socketId = data.socketId
      console.log(tv)
    })

    socket.on("I am candidate", data => {
      socket.to(tv.socketId).emit("new candidate", {
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
