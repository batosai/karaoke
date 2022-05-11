import '../css/app.css'

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
