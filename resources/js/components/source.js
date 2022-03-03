import { io } from 'socket.io-client'

export default () => ({
  init: () => {
    const socket = io()
    const { RTCPeerConnection } = window
    const peerConnection = new RTCPeerConnection()

    socket.on('connect', async () => {
      document.querySelector('.socket-id').innerHTML = socket.id

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(async mediaStream => {
        document.querySelector('.media-id').innerHTML = mediaStream.id
        mediaStream.getTracks().forEach(track => peerConnection.addTrack(track, mediaStream))

        peerConnection.onicecandidate = e => {
          if (e.candidate) { // Send the candidate to the remote peer
            socket.emit("I am candidate", {
              candidate: e.candidate
            })
          }
        }

        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        socket.emit("make-offer", {
          offer,
        })

        socket.on("answer-made", async data => {
          await peerConnection.setRemoteDescription(data.answer)
        })
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); })
    })

  }
})
