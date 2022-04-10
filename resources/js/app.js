import '../css/app.css'

// import '@hotwired/turbo'
// import Alpine from 'alpinejs'

// import destination from './components/destination'
// import source from './components/source'

// // import { VmPlayer, VmVideo, VmFile, defineCustomElements } from '@vime/core';

// // customElements.define('vm-player', VmPlayer);
// // customElements.define('vm-video', VmVideo);
// // customElements.define('vm-file', VmFile);
// // defineCustomElements();

// Alpine.data('destination', destination)
// Alpine.data('source', source)

// Alpine.start()

// document.addEventListener('turbo:load', async () => {
//   await import('@vime/core/dist/vime/vime.esm.js')
// })

import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'
import { initRoutes } from '@eidellev/adonis-stardust'
import { io } from 'socket.io-client'
import { socket } from './stores'

initRoutes()
InertiaProgress.init()
socket.set(io())

createInertiaApp({
  resolve: name => require(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})
