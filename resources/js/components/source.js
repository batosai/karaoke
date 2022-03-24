import Peer from '../libs/peer/micro'

export default () => ({
  init: () => {
    new Peer()
  },
})
