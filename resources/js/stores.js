import { writable } from 'svelte/store'
import { stardust } from '@eidellev/adonis-stardust'
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
      if (values.length) {
        tracks.set(pluck(values, 'track').filter(x => x))
      }
      else {
        tracks.set([])
      }
      // const t = []
      // values.forEach(player => {
      //   if (player.track) {
      //     t.push(stardust.route('media.show', { id: player.track }))
      //   }
      // })
      // tracks.set(t)


      set(values)
    },
    update: values => {
      set(values)
    }
	}
}
export const players = playersStore()
