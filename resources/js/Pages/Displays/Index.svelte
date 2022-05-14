<script>
  import { Inertia } from '@inertiajs/inertia'
  import { stardust } from '@eidellev/adonis-stardust'
  import { usePlayerStore } from '@vime/svelte'
  import { socket, pin, players, tracks, player } from '../../stores'
  import { initialeState, peer } from './utils'

  import QrCode from './QrCode'
  import Player from './Player'
  import Waiting from './Waiting'

  export let t

  const { RTCPeerConnection } = window
  const peerConnections = {}

  let state = { ...initialeState }
  const { paused, playbackEnded } = usePlayerStore(() => state.player)

  if ($pin === null) {
    Inertia.get(stardust.route('home'))
  }

  // TODO passe 2x
  $socket.on('player:stored', data => {
    players.set(data)
    clearInterval(state.interval)
  })

  $socket.on('player:updated', data => {
    players.set(data)

    if (!state.played && $tracks.length && $tracks.length === $players.length) {
      timer()
    }
  })

  $socket.on('player:delete', data => {
    players.set(data)
  })

  //WEBRTC
  $socket.on('offer:made', async data => {
    peerConnections[data.socketId] = new RTCPeerConnection()
    const { answer } = await peer(peerConnections[data.socketId], data)

    $socket.emit('answer:make', {
      pin: $pin,
      answer,
      to: data.socketId,
    })
  })

  $socket.on('candidate:store', data => {
    if (data.candidate) {
      peerConnections[data.socketId].addIceCandidate(data.candidate)
    }
  })
  //END WEBRTC

  $: if ($players.length === 0) {
    clearInterval(state.interval)
    paused.set(true)
    state = { ...initialeState }
  }

  // Ended video
  const unsubscribe = playbackEnded.subscribe(isPlaybackEnded => {
    if (isPlaybackEnded) {
      if (state.currentTrack === $tracks.length-1) {
        state = { ...initialeState }
        $socket.emit('track:ended', { pin: $pin })
      } else {
        state.played = false
        state.currentTrack++
        state.count = initialeState.count
        timer()
      }
    }
  })

  function timer() {
    state.interval = setInterval(() => {
      state.count--
      if (state.count === 0) {
        clearInterval(state.interval)
        state.played = true
        paused.set(false)
        state.trackUrl = stardust.route('medias.show', { id: $tracks[state.currentTrack] })
      }
    }, 1000)
  }

  unsubscribe()

</script>

<QrCode />
<Player bind:player={state.player} state={state} />
<Waiting state={state} t={t} />
