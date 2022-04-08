interface Options {
  socketId: string | null
  name: string
  avatar: string | null
  track: string | null
}

export default class Player {

  constructor({ socketId = null, name = '', avatar = null, track = null }: Options) {
    this.socketId = socketId
    this.name = name
    this.avatar = avatar
    this.track = track
  }

  public socketId: string | null = null
  public avatar: string | null = null
  public name: string = ''
  public track: string | null = null
}
