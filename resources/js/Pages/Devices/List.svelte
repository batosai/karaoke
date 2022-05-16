<script>
  import { Inertia } from '@inertiajs/inertia'
  import { stardust } from '@eidellev/adonis-stardust'
  import { socket, pin, player } from '../../stores'

  export let tracks

  export let t
  let modal
  let track = { title: '' }
  let filters = { name: null }

  if ($pin === null) {
    Inertia.get(stardust.route('links.index'))
  }

  function toggleModal(t) {
    track = t
    // TODO add in store
    modal.classList.toggle('modal-open')
  }

  function next() {

    $player.track = track.id
    $socket.emit('player:update', {
      pin: $pin,
      data: $player
    })

    Inertia.get(stardust.route('devices.micro'))
  }

  function handleSubmit() {
    Inertia.get(stardust.route('devices.list'), filters)
  }
</script>

<header class="fixed bottom-0 z-30 w-screen">
  <form on:submit|preventDefault={handleSubmit} method="GET">
    <div class="navbar bg-base-100">
      <div class="form-control w-full">
        <div class="input-group">
          <input type="text" placeholder="{ t['front.devices.search'] }" bind:value={filters.name} class="input input w-full" />
        </div>
      </div>
    </div>
  </form>
</header>

<div
  class="relative -my-px mb-[64px] max-w-full overflow-auto bg-base-200 shadow-lg ring-1 ring-slate-900/5"
>
  <div class="relative">
    <div class="divide-y divide-slate-200/5">
      {#each tracks as track}
        <div class="flex gap-4 p-4">
          <button
            class="btn btn-ghost w-full justify-start text-left"
            on:click={toggleModal(track)}
          >
            {track.title}
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="text-lg font-bold">{ t['front.devices.confirmation'] }</h3>
    <p class="py-4">{track.title}</p>
    <div class="modal-action">
      <button class="btn" on:click={toggleModal}>{ t['front.devices.cancel'] }</button>
      <button class="btn" on:click={next}>{ t['front.devices.choose'] }</button>
    </div>
  </div>
</div>
