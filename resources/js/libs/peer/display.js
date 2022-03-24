import { io } from 'socket.io-client'
const { RTCSessionDescription } = window

export default class Display {
  constructor() {
    const { RTCPeerConnection } = window
    this.peerConnections = {}
    this.audioContainer = 'audio'
    this.socket = io()
    // const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    this.peerConnection = new RTCPeerConnection()

    this.connect()
    this.newCandidate()
    this.remove()
    this.offerMade()
  }

  connect() {
    this.socket.on('connect', async () => {
      this.socket.emit('i-am-display', {
        socketId: this.socket.id,
      })
    })
  }

  newCandidate() {
    this.socket.on('new-candidate', data => {
      if (data.candidate)
        this.peerConnections[data.socket].addIceCandidate(data.candidate)
    })
  }

  remove() {
    this.socket.on('remove-user', data => {
      document.getElementById(data.socketId).remove()
    })
  }

  offerMade() {
    this.socket.on('offer-made', async data => {
      this.peerConnections[data.socket] = new RTCPeerConnection()

      this.peerConnections[data.socket].oniceconnectionstatechange = event => {
        // console.log(peerConnections[data.socket].iceConnectionState)
        if (this.peerConnections[data.socket].iceConnectionState === 'failed') {
          alert(conn.name + "'s connection failed")
        }
      }

      this.peerConnections[data.socket].ontrack = ({ streams: [stream] }) => {
        const audio = document.createElement('audio')
        audio.setAttribute('autoplay', 'true')
        audio.setAttribute('controls', 'true')
        audio.setAttribute('class', 'remote-video')
        audio.setAttribute('id', data.socket)

        document.getElementById(this.audioContainer).appendChild(audio)

        const remoteVideo = document.getElementById(data.socket)
        remoteVideo.srcObject = stream
      }

      //////

      await this.peerConnections[data.socket].setRemoteDescription(
        new RTCSessionDescription(data.offer),
      )

      const answer = await this.peerConnections[data.socket].createAnswer()
      await this.peerConnections[data.socket].setLocalDescription(
        new RTCSessionDescription(answer),
      )

      this.socket.emit('make-answer', {
        answer,
        to: data.socket,
      })
    })
  }
}
