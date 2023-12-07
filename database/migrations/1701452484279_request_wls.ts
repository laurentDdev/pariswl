import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { StateRequest } from 'App/Models/RequestWl'

export default class extends BaseSchema {
  protected tableName = 'request_wls'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('lastname')
      table.string('firstname')
      table.string('job')
      table.string('job_type')
      table.string('state').defaultTo(StateRequest.WAIT)
      table.timestamp('birthday')
      table.text('background')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

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
