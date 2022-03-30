<script>
  import { onMount } from "svelte";

  const KEYBOARD = {
    BACKSPACE: 8,
    DELETE: 46,
    ANDROID_BACKSPACE: 229,
  };

  let inputs = [0];
  let pins = {};

  export let pin;
  export let size = 6;

  onMount(async () => {
    inputs = await createArray(size);
    pins = await createValueSlot(inputs);
    pin = calcPin(pins);
    document.getElementById("pin0").focus();
  });

  const calcPin = (pins) => {
    if (Object.values(pins).length) {
      return Object.values(pins).join("");
    } else return "";
  };

  const isKeyDelete = (key) => {
    let result =
      key === KEYBOARD.BACKSPACE ||
      key === KEYBOARD.DELETE ||
      key === KEYBOARD.ANDROID_BACKSPACE;
    return result;
  };

  const deleteCurrentPin = (i) => {
    pins[i] = "";
    pin = calcPin(pins);
  };

  const changeHandler = function (e, i) {
    const current = document.activeElement;
    const items = [...document.getElementsByClassName("pin-item")];
    const currentIndex = items.indexOf(current);
    let newIndex;

    let regx = new RegExp(/^\d+$/);
    // backspace pressed on first digit
    if (isKeyDelete(e.keyCode) && currentIndex === 0) {
      // remove value of fist digit, end.
      deleteCurrentPin(i);
      return;
    }
    // pressing backspace not on the first digit
    else if (isKeyDelete(e.keyCode) && currentIndex !== 0) {
      // remove value of current digit & move to previous digit
      deleteCurrentPin(i);
      newIndex = (currentIndex + items.length - 1) % items.length;
    } else {
      // if not backspace pressed, set indext to next digit
      newIndex = (currentIndex + 1) % items.length;
    }
    // test value. if number, change value of current digit
    if (regx.test(e.key)) {
      pins[i] = e.key;
      pin = calcPin(pins);

      current.blur();
    }
    // if not last digit, move cursor
    if (currentIndex !== items.length - 1 || isKeyDelete(e.keyCode)) {
      items[newIndex].focus();
    }
    return;
  };
  const createArray = (size) => {
    return new Array(size);
  };
  const createValueSlot = (arr) => {
    return arr.reduce((obj, item) => {
      return {
        ...obj,
        [item]: "",
      };
    }, {});
  };
</script>

  <div class="fixed inset-0 w-full h-full flex bg-blue-100 items-center justify-center">
    <div class="bg-white rounded-lg shadow p-4" x-data="app2()">
      <div class="flex">
      {#if inputs.length}
        {#each inputs as item, i}
          <input
            bind:value={pins[i]}
            maxLength="1"
            class="h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-gray-800 text-3xl pin-item"
            id={`pin${i}`}
            type="tel"
            pattern="\d{1}"
            maxlength="1"
            on:keydown|preventDefault={(event) => changeHandler(event, i)}
            placeholder="" />
        {/each}
      {/if}
      </div>
    </div>
  </div>
