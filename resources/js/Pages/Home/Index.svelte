<script>
  import QrCode from 'svelte-qrcode'
  import PinInput from '../../components/Pin'

  let value
</script>


<section class="sm:hidden">
  <PinInput size={4} bind:pin={value} />
</section>

<section class="hidden sm:flex items-center m-auto justify-center h-screen">
  <div class="flex w-full items-center">
    <div class="grid h-96 m-10 grow place-items-center">
      <div class="text-center">
        <h1 class="text-4xl">Accéder à xxxxxxxx.tv/link</h1>
        <p>A partir d'un autre appareil et rentrez le code suivant</p>
      </div>
      <div class="flex gap-4 text-6xl">
        <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">1</div>
        <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">2</div>
        <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">3</div>
        <div class="flex items-center justify-center bg-blue-500 rounded-box w-28 h-28">4</div>
      </div>
    </div>

    <div class="my-10 mx-0 divider divider-horizontal"></div>

    <div class="grid h-96 m-10 grow place-items-center">
      <p class="mb-10">Ou flashez ce QR Code avec votre appareil photo</p>
      <div class="bg-white rounded-box p-5">
        <QrCode value="https://chaufourier.fr?code=1234" size="300" />
      </div>
    </div>
  </div>
</section>
