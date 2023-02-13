import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';

export default class CartController {
  public async index(ctx: HttpContextContract) {
    let total = 0;
    let products: null | Product[] = null;
    const cartProducts = ctx.session.get('cart_products');
    if (cartProducts) {
      products = await Product.findMany(Object.keys(cartProducts));
      total = Product.sumPricesByQuantities(products, cartProducts);
    }

    const viewData = [];
    viewData['title'] = 'Cart - Online Store';
    viewData['subtitle'] = 'Shopping Cart';
    viewData['total'] = total;
    viewData['products'] = products;
    return ctx.view.render('cart/index', { viewData: viewData });
  }

  public async add(ctx: HttpContextContract) {
    let cartProducts = ctx.session.get('cart_products');
    if (!cartProducts) {
      cartProducts = {};
    }
    cartProducts[ctx.params.id] = ctx.request.input('quantity');
    ctx.session.put('cart_products', cartProducts);
    ctx.response.redirect().toRoute('cart.index');
  }

  public async delete(ctx: HttpContextContract) {
    ctx.session.forget('cart_products');
    ctx.response.redirect().toRoute('cart.index');
  }
}
