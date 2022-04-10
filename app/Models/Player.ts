interface Options {
  socketId: string
  name: string
  avatar: string | null
  track: string | null
}

export default class Player {

  constructor({ socketId, name = '', avatar = null, track = null }: Options) {
    this.socketId = socketId
    this.name = name
    this.avatar = avatar
    this.track = track
  }

  public socketId: string
  public avatar: string | null = null
  public name: string = ''
  public track: string | null = null
}
