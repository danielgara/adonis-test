import Route from '@ioc:Adonis/Core/Route';

Route.get('/admin', 'admin/AdminController.index');
Route.get('/admin/products', 'admin/products/AdminProductsController.index');
