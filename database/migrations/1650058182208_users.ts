import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 55).notNullable()
      table.string('email', 55).notNullable().unique()
      table.string('password', 100).notNullable()
      table.string('phone', 55)
      table.string('address', 100)
      table.string('website', 100)
      table.text('description')
      table.string('cover_image', 55)
      table.enum('type', ['pump', 'company']).notNullable()
      table.boolean('isActive').defaultTo(true)
      table.boolean('isVerified').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
