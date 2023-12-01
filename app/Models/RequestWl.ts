import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RequestWl extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public lastname: string

  @column()
  public firstname: string

  @column()
  public job: string

  @column()
  public userId: number

  @column()
  public jobType: string

  @column.date()
  public birthday: DateTime

  @column()
  public background: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
