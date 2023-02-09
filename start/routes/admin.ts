import Route from '@ioc:Adonis/Core/Route';

Route.get('/admin', 'admin/AdminController.index');
Route.get('/admin/products', 'admin/products/AdminProductsController.index');
Route.post('/admin/products/store', 'admin/products/AdminProductsController.store');
Route.get('/admin/products/:id', 'admin/products/AdminProductsController.edit');
Route.post('/admin/products/:id', 'admin/products/AdminProductsController.remove');
Route.post('/admin/products/:id/update', 'admin/products/AdminProductsController.update');
