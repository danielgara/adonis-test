import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';
import Application from '@ioc:Adonis/Core/Application';
import CreateProductValidator from 'App/Validators/CreateProductValidator';
import UpdateProductValidator from 'App/Validators/UpdateProductValidator';

export default class AdminProductsController {
  public async index(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Products - Online Store';
    viewData['products'] = await Product.all();
    return ctx.view.render('admin/products/index', { viewData: viewData });
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateProductValidator);
    const productImage = ctx.request.file('image');
    let fileName = '';
    if (productImage) {
      await productImage.move(Application.publicPath('uploads'));
      if (productImage.fileName != undefined) {
        fileName = productImage.fileName;
      }
    }
    const newProduct = new Product();
    newProduct.setName(ctx.request.input('name'));
    newProduct.setDescription(ctx.request.input('description'));
    newProduct.setPrice(ctx.request.input('price'));
    newProduct.setImage(fileName);
    newProduct.save();
    ctx.response.redirect().toPath('/admin/products');
  }

  public async edit(ctx: HttpContextContract) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await Product.findOrFail(ctx.params.id);
    return ctx.view.render('admin/products/edit', { viewData: viewData });
  }

  public async update(ctx: HttpContextContract) {
    await ctx.request.validate(UpdateProductValidator);
    const product = await Product.findOrFail(ctx.params.id);
    product.setName(ctx.request.input('name'));
    product.setDescription(ctx.request.input('description'));
    product.setPrice(ctx.request.input('price'));

    const productImage = ctx.request.file('image');
    if (productImage) {
      await productImage.move(Application.publicPath('uploads'));
      if (productImage.fileName != undefined) {
        product.setImage(productImage.fileName);
      }
    }

    product.save();
    ctx.response.redirect().toPath('/admin/products');
  }

  public async remove(ctx: HttpContextContract) {
    const product = await Product.findOrFail(ctx.params.id);
    await product.delete();
    ctx.response.redirect().toPath('/admin/products');
  }
}
