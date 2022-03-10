import { io } from 'socket.io-client'
const { RTCSessionDescription } = window

export default class Peer {

  constructor() {
    const { RTCPeerConnection } = window
    this.socket = io()
    // const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    this.peerConnection = new RTCPeerConnection()
  }

  connect(call) {
    this.socket.on('connect', call)
  }

  addTrack(mediaStream) {
    mediaStream.getTracks().forEach(track => this.peerConnection.addTrack(track, mediaStream))
  }

  sendCandidate() {
    this.peerConnection.onicecandidate = e => {
      if (e.candidate) { // Send the candidate to the remote peer
        this.socket.emit("I am candidate", {
          candidate: e.candidate
        })
      }
    }
  }

  async createOffer() {
    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer))

    this.socket.emit('make-offer', {
      offer,
    })
  }

  answerMade() {
    this.socket.on('answer-made', async data => {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
    })
  }

}
