import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('name', 100).notNullable()
      table.string('access_token', 255).notNullable()
      table.boolean('is_verified').notNullable()
      table.string('remember_me_token').nullable()
      table.boolean('douanier').notNullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Ajout de la contrainte d'unicité en dehors de la définition de la colonne
      table.unique('email', 'users_email_unique')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
