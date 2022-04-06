import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class DisplayConnexion extends BaseModel {
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
}
