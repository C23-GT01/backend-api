require('dotenv').config();

const Hapi = require('@hapi/hapi');
const path = require('path');

const products = require('./api/products');
const ProductsService = require('./services/postgres/ProductsService');
const umkms = require('./api/umkm');
const UmkmsService = require('./services/postgres/UmkmService');

// uploads
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

// validator
const ProductsValidator = require('./validator/products');
const UmkmsValidator = require('./validator/umkm');

const init = async () => {
  const productsService = new ProductsService();
  const umkmsService = new UmkmsService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(
    [
      {
        plugin: products,
        options: {
          service: productsService,
          validator: ProductsValidator,
        },
      },
      {
        plugin: umkms,
        options: {
          service: umkmsService,
          validator: UmkmsValidator,
        },
      },
      {
        plugin: uploads,
        options: {
          service: storageService,
          validator: UploadsValidator,
        },
      },
    ],
  );

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
