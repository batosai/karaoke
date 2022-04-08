import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rooms extends BaseSchema {
  protected tableName = 'rooms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('pin', 4).primary()
      table.string('socket_id', 255).notNullable()
      table.string('user_id', 255)

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
