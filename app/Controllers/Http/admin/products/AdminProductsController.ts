import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';

export default class AdminProductsController {
  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Products - Online Store';
    viewData['products'] = await Product.all();
    return ctx.view.render('admin/products/index', { viewData: viewData });
  }
}
