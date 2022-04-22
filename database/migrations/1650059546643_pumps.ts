import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pumps extends BaseSchema {
  protected tableName = 'pumps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('users_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('pump_types_id').unsigned().references('pump_types.id')
      table.string('state', 55)
      table.string('line_length', 55)
      table.string('m3', 55)
      table.text('description')
      table.boolean('isActive').defaultTo(true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
