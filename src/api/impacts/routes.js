const routes = (handler) => [
  {
    method: 'POST',
    path: '/impacts',
    handler: (request, h) => handler.postImpactHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/impacts',
    handler: (request, h) => handler.getAllImpactsHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/impacts/{id}',
    handler: (request, h) => handler.getImpactByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/impacts/{id}',
    handler: (request, h) => handler.putImpactByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/impacts/{id}',
    handler: (request, h) => handler.deleteImpactByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
];

module.exports = routes;
