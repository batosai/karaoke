import { io } from 'socket.io-client'

export default () => ({
  players: [],
  init: () => {
    const socket = io()
    const { RTCPeerConnection } = window
    const peerConnection = new RTCPeerConnection()

    peerConnection.ontrack = function({ streams: [stream] }) {
      const remoteVideo = document.getElementById("remote-video");
      if (remoteVideo) {
        remoteVideo.srcObject = stream;

        // var audioContext = new AudioContext()
        // var gainNode = audioContext.createGain()

        // var audioSource = audioContext.createMediaStreamSource(stream);
        // var audioDestination = audioContext.createMediaStreamDestination();
        // audioSource.connect(gainNode);
        // gainNode.connect(audioDestination);
        // gainNode.gain.value = 0.5;
        // remoteVideo.srcObject = audioDestination.stream;
      }
    }

    socket.on('connect', async () => {
      socket.emit("I am tv", {
        socketId: socket.id
      })
    })

    socket.on('new candidate', data => peerConnection.addIceCandidate(data.candidate))

    socket.on("offer-made", async data => {
      await peerConnection.setRemoteDescription(data.offer)

      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)

      socket.emit("make-answer", {
        answer,
        to: data.socket
      })
    })
  }
})
