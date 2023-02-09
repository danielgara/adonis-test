import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/admin', 'admin/AdminController.index').as('admin.index');
  Route.get('/admin/products', 'admin/products/AdminProductsController.index').as('admin.products');
  Route.post('/admin/products/store', 'admin/products/AdminProductsController.store').as(
    'admin.products.store'
  );
  Route.get('/admin/products/:id', 'admin/products/AdminProductsController.edit').as(
    'admin.products.edit'
  );
  Route.post('/admin/products/:id', 'admin/products/AdminProductsController.remove').as(
    'admin.products.remove'
  );
  Route.post('/admin/products/:id/update', 'admin/products/AdminProductsController.update').as(
    'admin.products.update'
  );
}).middleware('adminAuth');
