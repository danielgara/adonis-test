import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AdminController {
  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    return ctx.view.render('admin/index', { viewData: viewData });
  }
}
