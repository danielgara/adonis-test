import Item from 'App/Models/Item';
import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public image: string;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Item)
  public items: HasMany<typeof Item>;

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

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number) {
    this.price = price;
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

  public getItems(): Item[] {
    return this.items;
  }

  public setItems(items) {
    this.items = items;
  }

  public static sumPricesByQuantities(products: Product[], cartProducts): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total = total + products[i].getPrice() * cartProducts[products[i].getId()];
    }
    return total;
  }
}
