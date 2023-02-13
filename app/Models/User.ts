import Order from 'App/Models/Order';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public role: string;

  @column()
  public balance: number;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Order)
  public orders: HasMany<typeof Order>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.setPassword(await Hash.make(user.getPassword()));
    }
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string) {
    this.role = role;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(balance: number) {
    this.balance = balance;
  }

  public getRememberMeToken(): string | null {
    return this.rememberMeToken;
  }

  public setRememberMeToken(rememberMeToken: string) {
    this.rememberMeToken = rememberMeToken;
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

  public getOrders(): Order[] {
    return this.orders;
  }

  public setOrders(orders) {
    this.orders = orders;
  }
}
