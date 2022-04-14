import { join } from 'path'
import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import { requireAll } from '@ioc:Adonis/Core/Helpers'
import Room from 'App/Models/Room'

const controllersTree = requireAll(join(__dirname, '../', 'Controllers', 'Ws'))

class Ws {
  public io: Server
  public rooms: Map<string, Room> = new Map()
  private booted = false

  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    this.booted = true
    // this.io = new Server(AdonisServer.instance!)
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: '*',
      },
    })
  }

  public on(event: string, controllerAction: string) {
    const ca = controllerAction.split('.')
    const ctl = controllersTree![ca[0]]

    const management = new ctl()

    this.io.on('connection', socket => {
      socket.on(event, data => {
        management[ca[1]](socket, data)
      })
    })
  }

}

export default new Ws()
