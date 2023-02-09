import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';

export default class AdminProductsController {
  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Products - Online Store';
    viewData['products'] = await Product.all();
    return ctx.view.render('admin/products/index', { viewData: viewData });
  }

  public async store(ctx: HttpContextContract) {
    const newProduct = new Product();
    newProduct.setName(ctx.request.input('name'));
    newProduct.setDescription(ctx.request.input('description'));
    newProduct.setPrice(ctx.request.input('price'));
    newProduct.setImage('game.png');
    newProduct.save();
    ctx.response.redirect().toPath('/admin/products');
  }
}
