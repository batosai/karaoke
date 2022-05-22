<script>
  import { Inertia } from '@inertiajs/inertia'
  import { page } from '@inertiajs/inertia-svelte'
  import { stardust } from '@eidellev/adonis-stardust'
  import PinInput from '../../components/Pin'
  import { pin as pinStore } from '../../stores'

  export let pin
  let code

  if (pin) {
    submit(pin)
  }

  function submit(pin) {
    pinStore.set(pin)
    Inertia.post(stardust.route('links.store'), {
      pin,
      _token: $page.props.csrfToken
    })
  }
</script>

<section>
  <div class="fixed inset-0 w-full h-full flex items-center justify-center">
    <PinInput size={4} bind:pin={code} submit={submit} errors={$page.props.errors ? $page.props.errors : null} />
  </div>
</section>

{#if $page.props.errors}
  <div class="absolute bottom-0 p-10 w-full">
    <div class="alert alert-error shadow-lg justify-center">
      <span>{ $page.props.errors.pin }</span>
    </div>
  </div>
{/if}
