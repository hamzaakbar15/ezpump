import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Availabilities extends BaseSchema {
  protected tableName = 'availabilities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pumps_id').unsigned().references('pumps.id')
      table.enum('monday', ['', 'am', 'pm'])
      table.enum('tuesday', ['', 'am', 'pm'])
      table.enum('wednesday', ['', 'am', 'pm'])
      table.enum('thursday', ['', 'am', 'pm'])
      table.enum('friday', ['', 'am', 'pm'])
      table.enum('saturday', ['', 'am', 'pm'])
      table.enum('sunday', ['', 'am', 'pm'])

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
