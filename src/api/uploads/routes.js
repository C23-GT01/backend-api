const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: (request, h) => handler.postUploadImageHandler(request, h),
    options: {
      payload: {
        maxBytes: 1048576, // max size payload
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
      auth: 'trackmate_jwt',
    },
  },
  {
    method: 'GET',
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
