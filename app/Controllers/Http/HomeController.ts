import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PostsController {
  public async index(ctx: HttpContextContract) {
    return ctx.view.render('welcome');
  }
}