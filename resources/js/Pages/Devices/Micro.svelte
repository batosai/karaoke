<script>
  import { Inertia } from '@inertiajs/inertia'
  import { stardust } from '@eidellev/adonis-stardust'
  import { socket, pin, player } from '../../stores'

  if ($pin === null) {
    Inertia.get(stardust.route('links.index'))
  }

  $socket.on('track:removed', data => {
    player.set(data)
    Inertia.get(stardust.route('devices.list'))
  })

</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.403,15.231v2.035h2.827c0.223,0,0.403,0.181,0.403,0.404c0,0.223-0.181,0.403-0.403,0.403H6.77c-0.223,0-0.404-0.181-0.404-0.403c0-0.224,0.181-0.404,0.404-0.404h2.826v-2.035C6.89,15.024,4.751,12.758,4.751,10c0-0.223,0.181-0.403,0.404-0.403S5.559,9.777,5.559,10c0,2.449,1.992,4.441,4.441,4.441c2.449,0,4.441-1.992,4.441-4.441c0-0.223,0.182-0.403,0.404-0.403s0.403,0.18,0.403,0.403C15.248,12.758,13.108,15.024,10.403,15.231 M13.026,4.953V10c0,1.669-1.357,3.027-3.027,3.027S6.972,11.669,6.972,10V4.953c0-1.669,1.358-3.028,3.028-3.028S13.026,3.284,13.026,4.953M12.221,4.953c0-1.225-0.996-2.22-2.221-2.22s-2.221,0.995-2.221,2.22V10c0,1.225,0.996,2.22,2.221,2.22s2.221-0.995,2.221-2.22V4.953z"></path>
    </svg>
  </div>
</div>

