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
  import { socket, pin, players } from '../../stores'

  let player
  let value = 5

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

  // let interval = setInterval(() => {
  //   value--
  //   if (value === 0) clearInterval(interval)
  // }, 1000)

  export let track

  // onMount(async () => {
	// 	await import('@vime/core/dist/vime/vime.esm.js')
	// })

  // const { paused, autoplay, canAutoplay } = usePlayerStore(() => player)
  // $paused = false
  // $autoplay = true
  // $: console.log($paused)
</script>

<div class="fixed top-10 right-10 bg-white rounded-box p-5 z-50">
  <QrCode value="https://chaufourier.fr?code=1234" size="150" />
  <p>{ $pin }</p>
</div>

{#if value === 0}
  <Player
    no-controls
    autoplay
    paused="false"
    bind:this={player}
  >
    <Video>
      <source data-src="{ stardust.route('media.show', { id: track.id }) }"  type="video/mp4" />
    </Video>

    <Ui>
      <ClickToPlay />

      <footer class="footer p-4 absolute bottom-0 z-[100]">
        <div class="avatar-group -space-x-6">
          <div class="avatar">
            <div class="w-12">
              <img src="https://api.lorem.space/image/face?hash=53273" alt="" />
            </div>
          </div>
          <div class="avatar">
            <div class="w-12">
              <img src="https://api.lorem.space/image/face?hash=91831" alt="" />
            </div>
          </div>
        </div>
      </footer>
    </Ui>
  </Player>

{:else}

  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">

      <div>
        <div class="grid grid-cols-{ $players.length < 5 ? $players.length : 4 } gap-6 text-center">
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
          <span class="countdown font-mono text-6xl">
            <span style="--value:{ value };"></span>
          </span>

          <!-- <div class="alert alert-info shadow-lg mx-auto w-64">
            En attente des participants...
          </div> -->
        </div>

      </div>

    </div>
  </div>
{/if}
