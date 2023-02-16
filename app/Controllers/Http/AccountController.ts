import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Order from 'App/Models/Order';

export default class AccountController {
  public async orders(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'My Orders - Online Store';
    viewData['subtitle'] = 'My Orders';
    viewData['orders'] = await Order.query()
      .where('userId', ctx.auth.user!.getId())
      .preload('items', (itemsQuery) => {
        itemsQuery.preload('product');
      });
    return ctx.view.render('account/orders', { viewData: viewData });
  }
}
