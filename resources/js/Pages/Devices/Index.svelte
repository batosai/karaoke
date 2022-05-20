<script>
  import { Inertia } from '@inertiajs/inertia'
  import { stardust } from '@eidellev/adonis-stardust'
  import { socket, pin, player } from '../../stores'
  import Compress from 'compress.js'

  export let t
  let files

  if ($pin === null) {
    Inertia.get(stardust.route('links.index'))
  }

  $player.avatar = `/images/profil${Math.floor(Math.random() * 5)+1}.png`

  $: if (files) {
    if (files[0]) {
      const compress = new Compress()

      compress.compress([...files], {
        size: 0.8, // the max size in MB, defaults to 2MB
        quality: .75, // the quality of the image, max is 1,
        // maxWidth: 195, // the max width of the output image, defaults to 1920px
        // maxHeight: 195, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
        rotate: false, // See the rotation section below
      }).then((results) => {
        $player.avatar = results[0].prefix + results[0].data
      })

      // const fileReader = new FileReader()
      // fileReader.readAsDataURL(files[0])
      // fileReader.addEventListener('load', ({ target }) => {
      //   $player.avatar = target.result
      // })
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
          <img src={$player.avatar} alt="" />
          <input type="file"
            bind:files
            class="absolute top-0 left-0 opacity-0 w-48 h-48"
            accept="image/*"
          />
        </div>
      </div>

      <!-- <input
        type="text"
        placeholder="Votre nom"
        class="input w-full max-w-xs"
        bind:value={$player.name} /> -->

      <button
        on:click={next}
        class="btn btn-wide w-full max-w-xs mt-10">
        { t['front.devices.next'] }
      </button>
    </div>
  </div>
</div>
