import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AdminAuth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.auth.user && ctx.auth.user.getRole() == 'admin') {
      await next();
    } else {
      ctx.response.redirect().toRoute('home.index');
    }
  }
}
