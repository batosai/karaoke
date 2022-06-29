<script>
  import { Inertia } from '@inertiajs/inertia'
  import { stardust } from '@eidellev/adonis-stardust'
  import {
		Player,
		Video,
    Ui,
    ClickToPlay,
    usePlayerStore
	} from '@vime/svelte'
  import { socket, pin, players, tracks, player } from '../../stores'
  import { initialeState, peer } from './utils'

  import QrCode from './QrCode'
  import Waiting from './Waiting'

  export let t

  const { RTCPeerConnection } = window
  const peerConnections = {}

  let state = { ...initialeState }
  const { paused } = usePlayerStore(() => state.player)

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
    // paused.set(true)
    $paused = true
    state = { ...initialeState }
  }

  // Ended video

  const playbackEnded = (e) => {
    if (e.detail === true) {
      if (state.currentTrack === $tracks.length) {
        state = { ...initialeState }
        $socket.emit('track:ended', { pin: $pin })
      } else {
        state.played = false
        state.count = initialeState.count
        timer()
      }
    }
  }

  function timer() {
    state.interval = setInterval(() => {
      state.count--
      if (state.count === 0) {
        state.played = true
        state.currentTrack++
        // paused.set(false)
        $paused = false
        state.trackUrl = stardust.route('medias.show', { id: $tracks[state.currentTrack-1] })
        clearInterval(state.interval)
      }
    }, 1000)
  }

</script>

<QrCode />

<div class="hero min-h-screen { state.played ? 'block' : 'hidden' }">
  <Player
    controls={false}
    autoplay
    bind:this={state.player}
    on:vmPlaybackEnded={playbackEnded}
    class="{ state.played ? '' : 'hidden' }"
  >
    <Video>
      <source data-src="{ state.trackUrl }"  type="video/mp4" />
    </Video>

    <Ui>
      <ClickToPlay />
    </Ui>
  </Player>

  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">

    </div>
  </div>
</div>

<footer class="footer p-4 absolute bottom-0 z-[100]">
  <div class="avatar-group -space-x-6">
    {#each $players as p}
      <div class="avatar">
        <div class="w-12 h-12">
          <img src="{ p.avatar }" alt="" />
          <audio controls="true" autoplay="true" id={p.socketId} />
        </div>
      </div>
    {/each}
  </div>
</footer>

<Waiting state={state} t={t} />
