import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class JobDetails extends BaseSchema {
  protected tableName = 'job_details'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('jobs_id').unsigned().references('jobs.id').notNullable()
      table.text('description')
      table.string('address_1', 55)
      table.string('address_2', 55)
      table.string('lat', 55)
      table.string('lng', 55)
      table.string('line_length', 55)
      table.string('state', 55)
      table.string('m3', 55)
      table.string('date')
      table.string('time')
      table.string('price_from', 55)
      table.string('price_to', 55)

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
