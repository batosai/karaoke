import Peer from '../libs/peer'
import { io } from 'socket.io-client'

export default () => ({
  init: () => {

    const peer = new Peer()

    peer.connect( async () => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(async mediaStream => {
        console.log(mediaStream)
        document.querySelector('.media-id').innerHTML = mediaStream.id
        peer.addTrack(mediaStream)
        // peer.newCandidate()
        await peer.createOffer()
        peer.answerMade()
        peer.sendCandidate()
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); })
    })

  }
})
