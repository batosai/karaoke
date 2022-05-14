<script>
  import {
		Player,
		Video,
    Ui,
    ClickToPlay,
    usePlayerStore
	} from '@vime/svelte'
  import { players } from '../../stores'
  import { initialeState } from './utils'

  export let player
  export let state = { ...initialeState }
</script>

<div class="hero min-h-screen block">
  <Player
    controls
    autoplay
    paused="true"
    bind:this={player}
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

  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">

    </div>
  </div>
</div>
