'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return "youre never gonna get PC" 
})


Route.get('/api/books', 'BookController.index')

Route.get('/api/books/:id', 'BookController.show')

Route.post('/api/books', 'BookController.store')

Route.patch('/api/books/:id','BookController.update')

Route.delete('/api/books/:id', 'BookController.destroy')


Route.post('/api/login','UserController.login')

Route.get('/users/:id', 'UserController.show')

Route.post('/api/register','UserController.register')

Route.get('/api/test','UserController.test')