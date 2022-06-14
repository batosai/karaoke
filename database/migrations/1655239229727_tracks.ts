import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('preview', 255).notNullable().defaultTo('')
      table.integer('view_count').defaultTo(0)
    })
  }
}
