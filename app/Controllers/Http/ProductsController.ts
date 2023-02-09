import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';

export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = await Product.all();
    return ctx.view.render('products/index', { viewData: viewData });
  }

  public async show(ctx: HttpContextContract) {
    const product = await Product.find(ctx.params.id);
    const viewData = [];
    if (product) {
      viewData['title'] = product.getName() + ' - Online Store';
      viewData['subtitle'] = product.getName() + ' - Product Information';
      viewData['product'] = product;
      return ctx.view.render('products/show', { viewData: viewData });
    } else {
      ctx.response.redirect().toRoute('auth.login');
    }
  }
}
