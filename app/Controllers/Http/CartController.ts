import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';
import Item from 'App/Models/Item';
import Order from 'App/Models/Order';

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

  public async purchase(ctx: HttpContextContract) {
    const cartProducts = ctx.session.get('cart_products');
    const user = ctx.auth.user;
    if (!user) {
      ctx.response.redirect().toRoute('auth.login');
    } else if (!cartProducts) {
      ctx.response.redirect().toRoute('cart.index');
    } else {
      const order = new Order();
      order.setUserId(user.getId());
      order.setTotal(0);
      await order.save();

      let total = 0;
      const products = await Product.findMany(Object.keys(cartProducts));
      for (let i = 0; i < products.length; i++) {
        const quantity = cartProducts[products[i].getId()];
        const item = new Item();
        item.setQuantity(quantity);
        item.setPrice(products[i].getPrice());
        item.setProductId(products[i].getId());
        item.setOrderId(order.getId());
        await item.save();
        total = total + products[i].getPrice() * quantity;
      }
      order.setTotal(total);
      await order.save();

      const newBalance = user.getBalance() - total;
      user.setBalance(newBalance);
      await user.save();

      ctx.session.forget('cart_products');

      const viewData = [];
      viewData['title'] = 'Purchase - Online Store';
      viewData['subtitle'] = 'Purchase Status';
      viewData['orderId'] = order.getId();
      return ctx.view.render('cart/purchase', { viewData: viewData });
    }
  }
}
