import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class JobRequests extends BaseSchema {
  protected tableName = 'job_requests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('jobs_id').unsigned().references('jobs.id').notNullable()
      table.integer('pumps_id').unsigned().references('pumps.id').notNullable()
      table.text('proposal_description').notNullable()
      table.string('bid_amount', 55).notNullable()
      table.enum('status', ['applied', 'completed', 'reject', 'cancelled']).defaultTo('applied')

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
