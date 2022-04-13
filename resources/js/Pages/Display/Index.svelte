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
    count: 2,
    played: false,
    trackUrl: null,
    currentTrack: 0,
    interval: null,
  }

  let state = { ...initialeState }
  const { paused, playbackEnded } = usePlayerStore(() => state.player)

  if ($pin === null) {
    Inertia.get(stardust.route('home'))
  }

  $socket.on('player:stored', data => {
    players.set(data)
  })

  $socket.on('player:updated', data => {
    players.set(data)

    if ($tracks.length && $tracks.length === $players.length) {
      timer()
    }
  })

  $socket.on('player:delete', data => {
    players.set(data)

    if ($players.length === 0) {
      clearInterval(state.interval)
      paused.set(true)
      state = { ...initialeState }
    }
  })

  const unsubscribe = playbackEnded.subscribe(isPlaybackEnded => {
    if (isPlaybackEnded) {
      if (state.currentTrack === $tracks.length-1) {
        state = { ...initialeState }
      } else {
        state.played = false
        state.currentTrack++
        state.count = initialeState.count
        timer()
      }
    }
  })

  // unsubscribe()

  function timer() {
    state.interval = setInterval(() => {
      state.count--
      if (state.count === 0) {
        clearInterval(state.interval)
        state.played = true
        paused.set(false)
        state.trackUrl = stardust.route('media.show', { id: $tracks[state.currentTrack] })
      }
    }, 1000)
  }

</script>

<div class="fixed top-10 right-10 bg-white rounded-box p-5 z-50">
  <QrCode value="https://chaufourier.fr?code=1234" size="150" />
  <p>{ $pin }</p>
</div>

<Player
  no-controls
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
