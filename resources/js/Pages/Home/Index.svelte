<script>
  import QrCode from 'svelte-qrcode'
  import PinInput from './pin'

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
      <p class="mb-10">Ou flashez ce QR COde avec votre appareil photo</p>
      <div class="bg-white rounded-box p-5">
        <QrCode value="https://chaufourier.fr?code=1234" size="300" />
      </div>
    </div>
  </div>
</section>


<div class="relative max-w-md mx-auto bg-white dark:bg-slate-800 shadow-lg h-80 overflow-auto ring-1 ring-slate-900/5 -my-px">
  <div class="relative">
    <div class="sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">A</div>
    <div class="divide-y dark:divide-slate-200/5">
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Andrew Alfred</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Aisha Houston</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Anna White</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Andy Flint</strong>
      </div>
    </div>
  </div>
  <div class="relative">
    <div class="sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">B</div>
    <div class="divide-y dark:divide-slate-200/5">
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Bob Alfred</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Bianca Houston</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Brianna White</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Bert Flint</strong>
      </div>
    </div>
  </div>
  <div class="relative">
    <div class="sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">C</div>
    <div class="divide-y dark:divide-slate-200/5">
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Colton Alfred</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Cynthia Houston</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Cheyenne White</strong>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Charlie Flint</strong>
      </div>
    </div>
  </div>
</div>
