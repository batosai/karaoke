<script>
  import { inertia, Link } from '@inertiajs/inertia-svelte'
  import { onMount } from 'svelte';
  import {
		Player,
		Video,
    Ui,
    ClickToPlay,
    usePlayerStore
	} from '@vime/svelte'

  export let track

  let player
  let value = 5

  let interval = setInterval(() => {
    value--
    if (value === 0) clearInterval(interval)
  }, 1000);

  // onMount(async () => {
	// 	await import('@vime/core/dist/vime/vime.esm.js')
	// })

  // const { paused, autoplay, canAutoplay } = usePlayerStore(() => player)
  // $paused = false
  // $autoplay = true
  // $: console.log($paused)
</script>

{#if value === 0}
  <Player
    no-controls
    autoplay
    paused="false"
    bind:this={player}
  >
    <Video>
      <source data-src="/media/{ track.id }" type="video/mp4" />
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
  <!-- TODO grid-cols-none grid-cols-2 grid-cols-3 grid-cols-4 : 4 max  -->
        <div class="grid grid-cols-2 gap-6 text-center">
          <div>
            <div class="avatar online">
              <div class="w-48 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=28212" alt="" />
              </div>
            </div>
          </div>

          <div>
            <div class="avatar offline">
              <div class="w-48 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=40361" alt="" />
              </div>
            </div>
          </div>

        </div>

        <div class="absolute left-0 right-0 bottom-10">
          <span class="countdown font-mono text-6xl">
            <span style="--value:{ value };"></span>
          </span>

          <!-- <div class="alert alert-warning shadow-lg mx-auto w-64">
            En attente des participants...
          </div> -->
        </div>

      </div>

    </div>
  </div>
{/if}
