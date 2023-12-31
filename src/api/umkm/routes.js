const routes = (handler) => [
  {
    method: 'POST',
    path: '/umkm',
    handler: (request, h) => handler.postUMKMHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/umkm',
    handler: (request, h) => handler.getAllUmkmHandler(request, h),
  },
  {
    method: 'GET',
    path: '/umkm/approve/{bool}',
    handler: (request, h) => handler.getAllUmkmApproveHandler(request, h),
  },
  {
    method: 'GET',
    path: '/umkm/{id}',
    handler: (request, h) => handler.getDetailUMKMHandler(request, h),
  },
  {
    method: 'GET',
    path: '/umkm/profile',
    handler: (request, h) => handler.getProfileUMKMHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/umkm/{id}',
    handler: (request, h) => handler.getUserUMKMHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/umkm',
    handler: (request, h) => handler.putUMKMHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/umkm/approve/{id}',
    handler: (request, h) => handler.putUMKMApproveByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/umkm',
    handler: (request, h) => handler.deleteUmkmByIdHandler(request, h),
    options: {
      auth: 'trackmate_jwt',
    },
  },
];

module.exports = routes;
