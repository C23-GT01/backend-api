const {
  getAllProductsHandler,
  getProductByIdHandler,
  addProductHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/products',
    handler: getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: getProductByIdHandler,
  },
  {
    method: 'POST',
    path: '/products',
    handler: addProductHandler,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: editProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: deleteProductByIdHandler,
  },
];

module.exports = routes;
