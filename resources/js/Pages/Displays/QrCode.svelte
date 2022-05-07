<script>
   import QrCode from 'svelte-qrcode'
   import { room } from '../../stores'
</script>

<div class="fixed top-10 right-10 z-50">
  <div class="bg-white rounded-box p-5 z-50">
    <QrCode value={$room.fullUri} size="150" />
  </div>
  <div class="grid mt-2 place-items-center">
    <div class="flex gap-2 text-xl text-white">
      <div class="flex items-center justify-center bg-blue-500 rounded-box w-8 h-8">{ $room.pin[0] }</div>
      <div class="flex items-center justify-center bg-blue-500 rounded-box w-8 h-8">{ $room.pin[1] }</div>
      <div class="flex items-center justify-center bg-blue-500 rounded-box w-8 h-8">{ $room.pin[2] }</div>
      <div class="flex items-center justify-center bg-blue-500 rounded-box w-8 h-8">{ $room.pin[3] }</div>
    </div>
  </div>
</div>
