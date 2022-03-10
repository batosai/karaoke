import { io } from 'socket.io-client'

// TODO
// create peer.js
// prop socket et peerconnection
// method
// connect
// new candidate
// offer-made
// make-offer
// answer-made
//
// et monter destionation et source à partir de cette class

// create audio balise by code
// disconnect remove balise audio avec id=socket id
// PB second connexion micro candidate ne semble pas marcher

export default () => ({
  players: [],
  init: () => {

    // const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

    const socket = io()
    const { RTCPeerConnection, RTCSessionDescription } = window
    const peerConnections = {}


    socket.on('connect', async () => {
      socket.emit("I am tv", {
        socketId: socket.id
      })
    })

    socket.on('new candidate', data => {
      if (data.candidate) peerConnections[data.socket].addIceCandidate(data.candidate)
    })

    socket.on("offer-made", async data => {

      peerConnections[data.socket] = new RTCPeerConnection()

      peerConnections[data.socket].oniceconnectionstatechange = function(event) {
        console.log(peerConnections[data.socket].iceConnectionState)
        if (peerConnections[data.socket].iceConnectionState === 'failed') {
          alert(conn.name + '\'s connection failed')
        }
      }

      peerConnections[data.socket].ontrack = function({ streams: [stream] }) {

        const audio = document.createElement("audio")
        audio.setAttribute('autoplay', 'true')
        audio.setAttribute('controls', 'true')
        audio.setAttribute('class', 'remote-video')
        audio.setAttribute('id', data.socket)

        document.getElementById("audio").appendChild(audio)

        const remoteVideo = document.getElementById(data.socket);
        remoteVideo.srcObject = stream;
      }

      //////

      await peerConnections[data.socket].setRemoteDescription(new RTCSessionDescription(data.offer))

      const answer = await peerConnections[data.socket].createAnswer()
      await peerConnections[data.socket].setLocalDescription(new RTCSessionDescription(answer))

      socket.emit("make-answer", {
        answer,
        to: data.socket
      })
    })

    socket.on('remove-user', data => {
      document.getElementById(data.socketId).remove()
    })

  }
})
