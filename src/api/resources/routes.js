const routes = (handler) => [
  {
    method: 'POST',
    path: '/resources',
    handler: (request, h) => handler.postResourceHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/resources',
    handler: (request, h) => handler.getAllResourcesHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/resources/{id}',
    handler: (request, h) => handler.getResourceByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/resources/{id}',
    handler: (request, h) => handler.putResourceByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/resources/{id}',
    handler: (request, h) => handler.deleteResourceByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
];

module.exports = routes;
