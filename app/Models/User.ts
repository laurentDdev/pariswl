import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import RequestWl from './RequestWl'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => RequestWl)
  public requestWl: HasOne<typeof RequestWl>

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public accessToken: string

  @column()
  public isVerified: boolean

  @column()
  public douanier: boolean

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
