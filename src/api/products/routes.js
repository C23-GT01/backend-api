const routes = (handler) => [
  {
    method: 'POST',
    path: '/products',
    handler: (request, h) => handler.postProductHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/products',
    handler: (request, h) => handler.getAllProductsHandler(request, h),
  },

  {
    method: 'GET',
    path: '/products/category/{id}',
    handler: (request, h) => handler.getAllProductsbyCategoryHandler(request, h),
  },
  {
    method: 'GET',
    path: '/products/search/{keyword}',
    handler: (request, h) => handler.getAllProductsbyKeywordHandler(request, h),
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: (request, h) => handler.getProductByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/products/umkm/{id}',
    handler: (request, h) => handler.getProductByIdUmkmHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: (request, h) => handler.putProductByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: (request, h) => handler.deleteProductByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
];

module.exports = routes;
