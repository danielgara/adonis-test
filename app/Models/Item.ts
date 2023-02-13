import Order from 'App/Models/Order';
import Product from 'App/Models/Item';
import { DateTime } from 'luxon';
import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
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

  public getOrder(): Order {
    return this.order;
  }

  public setOrder(order) {
    this.order = order;
  }

  public getProduct(): Product {
    return this.product;
  }

  public setProduct(product) {
    this.product = product;
  }
}
