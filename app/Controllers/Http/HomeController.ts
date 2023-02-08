import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Home Page - Online Store';
    return ctx.view.render('home', { viewData: viewData });
  }

  public async about(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'About us - Online Store';
    viewData['subtitle'] = 'About us';
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Your Name';
    return ctx.view.render('about', { viewData: viewData });
  }
}
