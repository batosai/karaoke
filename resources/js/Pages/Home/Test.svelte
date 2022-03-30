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
  import PinInput from './pin';

  // export let content
  export let track

  let player
  let value

  // onMount(async () => {
	// 	await import('@vime/core/dist/vime/vime.esm.js')
	// })

  // const { paused, autoplay, canAutoplay } = usePlayerStore(() => player)
  // $paused = false
  // $autoplay = true
  // $: console.log($paused)
</script>

<!-- <div class="navbar bg-base-100 sticky top-0 z-[100]">
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal p-0">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/test">Test</Link></li>
    </ul>
  </div>
</div> -->

<!-- <PinInput size={4} bind:pin={value} />
<h1>PIN: {value}</h1> -->

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

