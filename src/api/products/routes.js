const routes = (handler) => [
  {
    method: 'POST',
    path: '/products',
    handler: handler.postProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: handler.getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: handler.getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: handler.putProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: handler.deleteProductByIdHandler,
  },
];

module.exports = routes;
