import { io } from 'socket.io-client'
const { RTCSessionDescription } = window

export default class Micro {
  constructor() {
    const { RTCPeerConnection } = window
    this.socket = io()
    // const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    this.peerConnection = new RTCPeerConnection()

    this.connect()
  }

  connect() {
    this.socket.on('connect', async () => {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(async mediaStream => {
          this.addTrack(mediaStream)
          await this.createOffer()
          this.answerMade()
          this.sendCandidate()
        })
        .catch(function (err) {
          console.log(err.name + ': ' + err.message)
        })
    })
  }

  addTrack(mediaStream) {
    mediaStream
      .getTracks()
      .forEach(track => this.peerConnection.addTrack(track, mediaStream))
  }

  sendCandidate() {
    this.peerConnection.onicecandidate = e => {
      if (e.candidate) {
        // Send the candidate to the remote peer
        this.socket.emit('i-am-candidate', {
          candidate: e.candidate,
        })
      }
    }
  }

  async createOffer() {
    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(
      new RTCSessionDescription(offer),
    )

    this.socket.emit('make-offer', {
      offer,
    })
  }

  answerMade() {
    this.socket.on('answer-made', async data => {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer),
      )
    })
  }
}
