import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Track extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public url: string

  @column()
  public preview: string

  @column()
  public viewCount: number

  @column({ serializeAs: null })
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // Hooks

  @beforeCreate()
  public static assignUuid(track: Track) {
    track.id = uuid()
  }
}
