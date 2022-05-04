<script>
  import { onMount } from 'svelte'
  import { Inertia } from '@inertiajs/inertia'
  import { Link } from '@inertiajs/inertia-svelte'
  import { stardust } from '@eidellev/adonis-stardust'
  import QrCode from 'svelte-qrcode'
  import {
		Player,
		Video,
    Ui,
    ClickToPlay,
    usePlayerStore
	} from '@vime/svelte'
  import { socket, pin, players, tracks, player } from '../../stores'

  const initialeState = {
    player: null,
    count: 5,
    played: false,
    trackUrl: null,
    currentTrack: 0,
    interval: null,
  }

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

  $: if ($players.length === 0) {
    clearInterval(state.interval)
    paused.set(true)
    state = { ...initialeState }
  }

  // ended video
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

  unsubscribe()

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

  // offerMade
  $socket.on('offer:made', async data => {
    peerConnections[data.socketId] = new RTCPeerConnection()

    peerConnections[data.socketId].oniceconnectionstatechange = event => {
      // console.log(peerConnections[data.socketId].iceConnectionState)
      if (peerConnections[data.socketId].iceConnectionState === 'failed') {
        alert(conn.name + "'s connection failed")
      }
    }

    peerConnections[data.socketId].ontrack = ({ streams: [stream] }) => {
      // const audio = document.createElement('audio')
      // audio.setAttribute('autoplay', 'true')
      // audio.setAttribute('controls', 'true')
      // audio.setAttribute('id', data.socketId)

      // document.getElementById('audio').appendChild(audio)

      const remoteVideo = document.getElementById(data.socketId)
      remoteVideo.srcObject = stream
    }

    //////

    await peerConnections[data.socketId].setRemoteDescription(
      new RTCSessionDescription(data.offer),
    )

    const answer = await peerConnections[data.socketId].createAnswer()
    await peerConnections[data.socketId].setLocalDescription(
      new RTCSessionDescription(answer),
    )

    $socket.emit('answer:make', {
      pin: $pin,
      answer,
      to: data.socketId,
    })
  })

  $socket.on('candidate:store', data => {
    if (data.candidate)
      peerConnections[data.socketId].addIceCandidate(data.candidate)
  })

  // $socket.on('connection:delete', data => {
  //   document.getElementById(data.socketId).remove()
  // })

</script>

<section id="audio">
  {#each $players as p}
    <audio controls="true" autoplay="true" id={p.socketId} />
  {/each}
</section>

<div class="fixed top-10 right-10 bg-white rounded-box p-5 z-50">
  <QrCode value="https://chaufourier.fr?code=1234" size="150" />
  <p>{ $pin }</p>
</div>

<Player
  controls
  autoplay
  paused="true"
  bind:this={state.player}
  class="{ state.played ? '' : 'hidden' }"
>
  <Video>
    <source data-src="{ state.trackUrl }"  type="video/mp4" />
  </Video>

  <Ui>
    <ClickToPlay />

    <footer class="footer p-4 absolute bottom-0 z-[100]">
      <div class="avatar-group -space-x-6">
        {#each $players as p}
          <div class="avatar">
            <div class="w-12">
              <img src="{ p.avatar }" alt="" />
              <audio controls="true" autoplay="true" id={p.socketId} />
            </div>
          </div>
        {/each}
      </div>
    </footer>
  </Ui>
</Player>


<div class="hero min-h-screen bg-base-200 { state.played ? 'hidden' : '' }">
  <div class="hero-content text-center">

    <div>
      <div class="grid grid-cols-[repeat({ $players.length < 5 ? $players.length : 4 },_minmax(0,_1fr))] gap-6 text-center">
        {#each $players as p}
          <div>
            <div class="avatar { p.track ? 'online' : 'offline' }">
              <div class="w-48 rounded-full">
                <img src="{ p.avatar }" alt="" />
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="absolute left-0 right-0 bottom-10">
        {#if state.interval}
          <span class="countdown font-mono text-6xl">
            <span style="--value:{ state.count };"></span>
          </span>
        {:else}
          <div class="alert alert-info shadow-lg mx-auto w-64">
            En attente des participants...
          </div>
        {/if}
      </div>

    </div>

  </div>
</div>
