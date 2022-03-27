<script>
  import { inertia, Link } from '@inertiajs/inertia-svelte'

  export let content
</script>

<p>{ content }</p>

<Link href="/">Home</Link>
<Link href="/test">Test</Link>
