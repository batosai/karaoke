<script>
  import { players } from '../../stores'
  import { initialeState } from './utils'

  export let state = { ...initialeState }, t
</script>

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
            { t['front.displays.waiting'] }
          </div>
        {/if}
      </div>

    </div>

  </div>
</div>
