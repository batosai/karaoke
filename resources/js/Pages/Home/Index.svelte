<script>
  import { inertia, Link } from '@inertiajs/inertia-svelte'

  let count = 0;
  $: doubled = count * 2;

  function handleClick() {
      count += 1;
  }
</script>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>


<a href="/" use:inertia>Home</a>

<Link href="/">Home</Link>
<Link href="/test">Test</Link>
