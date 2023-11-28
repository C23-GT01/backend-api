const routes = (handler) => [
  {
    method: 'POST',
    path: '/resources',
    handler: handler.postResourceHandler,
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/resources',
    handler: handler.getAllResourcesHandler,
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/resources/{id}',
    handler: handler.getResourceByIdHandler,
  },
  {
    method: 'PUT',
    path: '/resources/{id}',
    handler: handler.putResourceByIdHandler,
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/resources/{id}',
    handler: handler.deleteResourceByIdHandler,
    options: {
      auth: 'trackmate_jwt',
    },
  },
];

module.exports = routes;
