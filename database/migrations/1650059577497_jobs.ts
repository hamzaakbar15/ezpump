import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('job_types_id').unsigned().references('job_types.id').notNullable()
      table.integer('pump_types_id').unsigned().references('pump_types.id').notNullable()
      table.integer('users_id').unsigned().references('users.id').notNullable()
      table.integer('pumps_id').unsigned().references('pumps.id').nullable()
      table.boolean('isActive').defaultTo(true)
      table.string('status', 55) // ye enum column banega bad mai abhi enum k values yaad nahi arhi hai

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
