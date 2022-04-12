import { writable } from 'svelte/store'
import { pluck } from './utils'

export const socket = writable(null)

export const pin = writable(null)

export const player = writable({
  avatar: null,
  name: '',
  track: null,
})

export const tracks = writable([])

// export const players = writable([
//   // {
//   //   id: null,
//   //   avatar: null,
//   //   name: '',
//   //   track: null,
//   // }
// ])

const playersStore = () => {
  const { subscribe, set } = writable([
    // {
    //   id: null,
    //   avatar: null,
    //   name: '',
    //   track: null,
    // }
  ])

  return {
		subscribe,
		set: values => {
      tracks.set(pluck(values, 'track').filter(x => x))
      set(values)
    }
	}
}
export const players = playersStore()
