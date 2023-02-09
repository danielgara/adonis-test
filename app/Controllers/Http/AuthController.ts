import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class AuthController {
  public async register(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    viewData['subtitle'] = 'User Register';
    return ctx.view.render('auth/register', { viewData: viewData });
  }

  public async store(ctx: HttpContextContract) {
    const newUser = new User();
    newUser.setName(ctx.request.input('name'));
    newUser.setPassword(ctx.request.input('password'));
    newUser.setEmail(ctx.request.input('email'));
    newUser.setRole('client');
    newUser.setBalance(1000);
    newUser.save();
    ctx.response.redirect().toPath('/');
  }
}
