/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';
import './routes/admin';

Route.get('/', 'HomeController.index').as('home.index');
Route.get('/about', 'HomeController.about').as('home.about');
Route.get('/products', 'ProductsController.index').as('products.index');
Route.get('/products/:id', 'ProductsController.show').as('products.show');
Route.get('/auth/register', 'AuthController.register').as('auth.register');
Route.post('/auth/store', 'AuthController.store').as('auth.store');
Route.get('/auth/login', 'AuthController.login').as('auth.login');
Route.post('/auth/connect', 'AuthController.connect').as('auth.connect');
Route.get('/auth/logout', 'AuthController.logout').as('auth.logout');
