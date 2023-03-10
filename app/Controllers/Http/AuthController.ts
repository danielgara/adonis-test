import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class AuthController {
  public async register(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    viewData['subtitle'] = 'User Register';
    return ctx.view.render('auth/register', { viewData: viewData });
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateUserValidator);
    const newUser = new User();
    newUser.setName(ctx.request.input('name'));
    newUser.setPassword(ctx.request.input('password'));
    newUser.setEmail(ctx.request.input('email'));
    newUser.setRole('client');
    newUser.setBalance(1000);
    await newUser.save();
    ctx.response.redirect().toRoute('home.index');
  }

  public async login(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'User Login - Online Store';
    viewData['subtitle'] = 'User Login';
    return ctx.view.render('auth/login', { viewData: viewData });
  }

  public async connect(ctx: HttpContextContract) {
    const email = ctx.request.input('email');
    const password = ctx.request.input('password');
    try {
      await ctx.auth.use('web').attempt(email, password);
      ctx.response.redirect().toRoute('home.index');
    } catch {
      ctx.response.redirect().toRoute('auth.login');
    }
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.use('web').logout();
    ctx.response.redirect().toRoute('home.index');
  }
}
