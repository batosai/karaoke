<script>
  export let pin = ''
  export let errors = null
  export let size = 4
  export let submit = () => {}

  let disabled = false

  $: if (errors !== null) {
    disabled = false
  }

  const changeHandler = function (e) {
    if(pin.length === size) {
      disabled = true
      submit(pin)
    }
  }

  function init(el){
    el.focus()
  }
</script>

<div class="card bg-neutral shadow-xl p-4">
  <div class="form-control">
    <input
      type="text"
      use:init
      pattern="[a-zA-Z0-9]{1}"
      placeholder="xxxx"
      maxlength="4"
      on:keyup={changeHandler}
      bind:value={pin}
      disabled={disabled}
      class="input input-bordered w-48 flex items-center text-center text-4xl uppercase tracking-widest bg-gray-200" />
  </div>
</div>


