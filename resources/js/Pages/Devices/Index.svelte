<script>
  import { Inertia } from '@inertiajs/inertia'
  import { stardust } from '@eidellev/adonis-stardust'
  import { socket, pin, player } from '../../stores'

  let files
  let preview

  if ($pin === null) {
    Inertia.get(stardust.route('links.index'))
  }

  $: if (files) {
    if (files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', ({ target }) => {
        preview = target.result
        $player.avatar = target.result
      })
    }
	}

  function next() {
    $socket.emit('player:store', {
      pin: $pin,
      data: $player
    })

    Inertia.get(stardust.route('devices.list'))
  }

</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div>

      <div class="avatar mb-20">
        <div class="w-48 rounded-full ring">

          {#if files && files[0]}
            <img src="{ preview }" alt="" />
          {:else}
            <img src="https://api.lorem.space/image/face?hash=3174" alt="" />
          {/if}

          <input type="file"
            bind:files
            class="absolute top-0 left-0 opacity-0 w-48 h-48"
            accept="image/*"
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="Votre nom"
        class="input w-full max-w-xs"
        bind:value={$player.name} />

      <button
        on:click={next}
        class="btn btn-wide w-full max-w-xs mt-10">
        Suivant
      </button>
    </div>
  </div>
</div>
