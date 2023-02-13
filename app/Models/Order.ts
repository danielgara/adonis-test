import User from 'App/Models/User';
import Item from 'App/Models/Item';
import { DateTime } from 'luxon';
import { column, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public total: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Item)
  public items: HasMany<typeof Item>;

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number) {
    this.total = total;
  }

  public getCreatedAt(): DateTime {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: DateTime) {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): DateTime {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: DateTime) {
    this.updatedAt = updatedAt;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user) {
    this.user = user;
  }

  public getItems(): Item[] {
    return this.items;
  }

  public setItems(items) {
    this.items = items;
  }
}
