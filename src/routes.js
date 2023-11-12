const {
  getAllProducts,
  getProductByIdHandler,
  addProductHandler,
  editProductHandler,
  deleteProductByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    url: '/products',
    handler: getAllProducts,
  },
  {
    method: 'GET',
    url: '/products/{id}',
    handler: getProductByIdHandler,
  },
  {
    method: 'POST',
    url: '/products',
    handler: addProductHandler,
  },
  {
    method: 'PUT',
    url: '/products',
    handler: editProductHandler,
  },
  {
    method: 'DELETE',
    url: '/products/{id}',
    handler: deleteProductByIdHandler,
  },
];

module.exports = routes;
