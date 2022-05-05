<script>
   import QrCode from 'svelte-qrcode'
   import { room } from '../../stores'
</script>

<div class="fixed top-10 right-10 bg-white rounded-box p-5 z-50">
  <QrCode value={$room.fullUri} size="150" />
  <p>{ $room.pin }</p>
</div>
