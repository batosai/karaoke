<script>
  import { inertia, Link } from '@inertiajs/inertia-svelte'

  export let content
</script>

<div class="navbar bg-base-100 sticky top-0 z-[100]">
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal p-0">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/test">Test</Link></li>
    </ul>
  </div>
</div>

<div class="container mx-auto h-screen">


<div class="flex w-full">
  <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
    <p>{ content }</p>
  </div>
  <div class="divider divider-horizontal">OR</div>
  <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
    <div class="avatar-group -space-x-6">
      <div class="avatar">
        <div class="w-12">
          <img src="https://api.lorem.space/image/face?hash=53273" alt="" />
        </div>
      </div>
      <div class="avatar">
        <div class="w-12">
          <img src="https://api.lorem.space/image/face?hash=91831" alt="" />
        </div>
      </div>
      <div class="avatar">
        <div class="w-12">
          <img src="https://api.lorem.space/image/face?hash=27312" alt="" />
        </div>
      </div>
      <div class="avatar">
        <div class="w-12">
          <img src="https://api.lorem.space/image/face?hash=26448" alt="" />
        </div>
      </div>
    </div>
  </div>
</div>

</div>

<footer class="footer p-4 sticky bottom-0 z-[100]">
  <div class="avatar-group -space-x-6">
    <div class="avatar">
      <div class="w-12">
        <img src="https://api.lorem.space/image/face?hash=53273" alt="" />
      </div>
    </div>
    <div class="avatar">
      <div class="w-12">
        <img src="https://api.lorem.space/image/face?hash=91831" alt="" />
      </div>
    </div>
    <div class="avatar">
      <div class="w-12">
        <img src="https://api.lorem.space/image/face?hash=27312" alt="" />
      </div>
    </div>
    <div class="avatar">
      <div class="w-12">
        <img src="https://api.lorem.space/image/face?hash=26448" alt="" />
      </div>
    </div>
  </div>
</footer>

