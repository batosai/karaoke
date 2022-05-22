<script>
  export let pin = ''
  export let errors = null
  export let size = 4
  export let submit = () => {}

  let disabled = false

  const KEYBOARD = {
    BACKSPACE: 8,
    DELETE: 46,
    ANDROID_BACKSPACE: 229,
  }

  $: if (errors !== null) {
    disabled = false
  }

  const isKeyDelete = key => {
    let result =
      key === KEYBOARD.BACKSPACE ||
      key === KEYBOARD.DELETE ||
      key === KEYBOARD.ANDROID_BACKSPACE
    return result
  }

  const init = el => {
    el.focus()
  }

  const changeHandler =  e => {
    if(pin.length === size) {
      disabled = true
      e.target.blur()
      submit(pin)
    }
  }

  // For android
  const maxlength = e => {
    if(pin.length === size && !isKeyDelete(e.keyCode)) {
      e.preventDefault()
    }
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
      on:keydown={maxlength}
      bind:value={pin}
      disabled={disabled}
      class="input input-bordered w-48 flex items-center text-center text-4xl uppercase tracking-widest bg-gray-200" />
  </div>
</div>


