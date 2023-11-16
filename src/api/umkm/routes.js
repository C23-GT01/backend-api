const routes = (handler) => [
  {
    method: 'POST',
    path: '/umkm',
    handler: (request, h) => handler.postUMKMHandler(request, h),
  },
  {
    method: 'GET',
    path: '/umkm',
    handler: (request, h) => handler.getAllUmkmHandler(request, h),
  },
  {
    method: 'GET',
    path: '/umkm/{id}',
    handler: (request, h) => handler.getDetailUMKMHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/umkm/{id}',
    handler: (request, h) => handler.putUMKMHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/umkm/{id}',
    handler: (request, h) => handler.deleteUmkmByIdHandler(request, h),
  },
];

module.exports = routes;
