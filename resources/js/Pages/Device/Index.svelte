<script>
  export let tracks

  let files
  let preview

  $: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}

    if (files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', ({ target }) => {
        preview = target.result
      })
    }
	}

</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div>

      <div class="avatar mb-20">
        <div class="w-48 rounded-full ring">

          {#if files && files[0]}
            <img src="{ preview }" alt="" />
          {:else}
            <img src="https://api.lorem.space/image/face?hash=3174" alt="" />
          {/if}

          <input type="file"
            bind:files
            class="absolute top-0 left-0 opacity-0 w-48 h-48"
            accept="image/*"
          />
        </div>
      </div>

      <input type="text" placeholder="Votre nom" class="input w-full max-w-xs">

      <button class="btn btn-wide w-full max-w-xs mt-10">Suivant</button>
    </div>
  </div>
</div>

<div class="relative max-w-md mx-auto bg-slate-800 shadow-lg overflow-auto ring-1 ring-slate-900/5 -my-px">
  <div class="relative">
    <div class="divide-y divide-slate-200/5">
      {#each tracks as track}
        <div class="flex items-center gap-4 p-4">
          <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" alt="">
          <strong class="text-sm font-medium text-slate-200">{ track.title }</strong>
        </div>
      {/each}
    </div>
  </div>
</div>
