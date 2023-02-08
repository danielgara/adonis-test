import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ProductsController {
  static products = [
    {
      id: '1',
      name: 'TV',
      description: 'Best tv',
      image: 'game.png',
      price: '1000',
    },
    {
      id: '2',
      name: 'iPhone',
      description: 'Best iPhone',
      image: 'safe.png',
      price: '999',
    },
    {
      id: '3',
      name: 'Chromecast',
      description: 'Best Chromecast',
      image: 'submarine.png',
      price: '30',
    },
    {
      id: '4',
      name: 'Glasses',
      description: 'Best Glasses',
      image: 'game.png',
      price: '100',
    },
  ];

  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = ProductsController.products;
    return ctx.view.render('products.index', { viewData: viewData });
  }

  public async show(ctx: HttpContextContract) {
    const product = ProductsController.products[ctx.params.id - 1];
    const viewData = [];
    viewData['title'] = product.name + ' - Online Store';
    viewData['subtitle'] = product.name + ' - Product Information';
    viewData['product'] = product;
    return ctx.view.render('products.show', { viewData: viewData });
  }
}
