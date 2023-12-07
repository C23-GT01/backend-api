const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/profile',
    handler: (request, h) => handler.getUserProfileHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users',
    handler: (request, h) => handler.putUserHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/users',
    handler: (request, h) => handler.deleteUserHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
];

module.exports = routes;
