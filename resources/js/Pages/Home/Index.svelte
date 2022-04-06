<script>
  import { Inertia } from '@inertiajs/inertia'
  import { page } from '@inertiajs/inertia-svelte'
  import QrCode from 'svelte-qrcode'
  import PinInput from '../../components/Pin'
  import { socket } from '../../stores'

  let value
  let payload = null

  $socket.on('connect', () => {
    $socket.emit('display:new')
    $socket.on('display:store', async data => {
      payload = data
    })

    $socket.on('display:login', () => {
      Inertia.post('/display', {
        pin: payload.pin,
        _token: $page.props.csrfToken
      })
    })
  })
</script>

<section class="sm:hidden">
  <PinInput size={4} bind:pin={value} />
</section>

<section class="hidden sm:flex items-center m-auto justify-center h-screen">
  {#if !payload}
    <div class="btn btn-ghost btn-lg loading"></div>
  {:else}
    <div class="flex w-full items-center">
      <div class="grid h-96 m-10 grow place-items-center">
        <div class="text-center">
          <h1 class="text-4xl">Accéder à { payload.uri }</h1>
          <p>A partir d'un autre appareil et rentrez le code suivant</p>
        </div>
        <div class="flex gap-4 text-6xl text-white">
          <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">{ payload.pin[0] }</div>
          <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">{ payload.pin[1] }</div>
          <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">{ payload.pin[2] }</div>
          <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">{ payload.pin[3] }</div>
        </div>
      </div>

      <div class="my-10 mx-0 divider divider-horizontal"></div>

      <div class="grid h-96 m-10 grow place-items-center">
        <p class="mb-10">Ou flashez ce QR Code avec votre appareil photo</p>
        <div class="bg-white rounded-box p-5">
          <QrCode value="{ payload.fullUri }" size="300" />
        </div>
      </div>
    </div>
  {/if}
</section>
