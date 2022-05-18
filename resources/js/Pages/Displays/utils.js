export const initialeState = {
  player: null,
  count: 5,
  played: false,
  trackUrl: null,
  currentTrack: 0,
  interval: null,
}

export const peer = async (peerConnection, data) => {
  // peerConnection.oniceconnectionstatechange = event => {
  //   // console.log(peerConnection.iceConnectionState)
  //   if (peerConnection.iceConnectionState === 'failed') {
  //     alert(peerConnection.name + "'s connection failed")
  //   }
  // }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    const remoteVideo = document.getElementById(data.socketId)
    remoteVideo.srcObject = stream
  }

  //////

  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer),
  )

  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(
    new RTCSessionDescription(answer),
  )

  return {
    answer
  }
}
