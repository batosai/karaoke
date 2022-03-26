import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tracks extends BaseSchema {
  protected tableName = 'tracks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('url', 255).notNullable()
      table.string('title', 255).notNullable()

      /** References */
      table.uuid('user_id').notNullable().references('users.id')

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
