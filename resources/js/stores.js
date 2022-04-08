import { writable } from 'svelte/store'

export const socket = writable(null)

export const pin = writable(null)

export const player = writable({
  avatar: null,
  name: '',
  track: null,
})

export const players = writable([
  // {
  //   id: null,
  //   avatar: null,
  //   name: '',
  //   track: null,
  // }
])
