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
  import { socket, pin, players, tracks } from '../../stores'

  let player
  const { paused, playbackEnded } = usePlayerStore(() => player)

  const initialCount = 5
  let count = initialCount
  let letsGo = false
  let trackUrl = null
  let currentTrack = 0

  let interval
  let prevTrackLength = $tracks.length

  if ($pin === null) {
    Inertia.get(stardust.route('home'))
  }

  $socket.on('player:stored', data => {
    players.set(data)
  })

  $socket.on('player:updated', data => {
    players.set(data)
  })

  $socket.on('player:delete', data => {
    players.set(data)
  })

  $: if ($tracks.length && $tracks.length === $players.length && prevTrackLength !== $tracks.length) {
    trackUrl = stardust.route('media.show', { id: $tracks[currentTrack] })
    prevTrackLength = $tracks.length
    interval = setInterval(() => {
      count--
      if (count === 0) {
        clearInterval(interval)
        letsGo = true
        $paused = false
      }
    }, 1000)
  }

  $: if ($playbackEnded) {
    if (currentTrack === $tracks.length-1) {
      count = initialCount
      letsGo = false
      currentTrack = 0
      trackUrl = null
      interval = null
    } else {
      currentTrack++
      trackUrl = stardust.route('media.show', { id: $tracks[currentTrack] })
    }
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
  bind:this={player}
  class="{ letsGo ? '' : 'hidden' }"
>
  <Video>
    <source data-src="{ trackUrl }"  type="video/mp4" />
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


<div class="hero min-h-screen bg-base-200 { letsGo ? 'hidden' : '' }">
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
        {#if interval}
          <span class="countdown font-mono text-6xl">
            <span style="--value:{ count };"></span>
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
