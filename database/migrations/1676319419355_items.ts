import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'items';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('quantity');
      table.integer('price');
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE');
      table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE');
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
