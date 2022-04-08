import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import generatePin from 'random-string-gen'

export default class Room extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public pin: string

  @column()
  public userId: string

  @column()
  public socketId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async addPin(room: Room) {
    room.pin = generatePin({ length: 4, capitalization: 'uppercase' })
  }

  /////////////////////////

  public players: [] = []

  get uri(): string {
    return Env.get('APP_URL') + Route.builder().make('link.index')
  }

  get fullUri(): string {
    return Env.get('APP_URL') + Route.builder().qs({ qs: { pin: this.pin, } }).make('link.index')
  }
}
