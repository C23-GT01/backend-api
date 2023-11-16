require('dotenv').config();

const Hapi = require('@hapi/hapi');

const products = require('./api/products');
const ProductsService = require('./services/postgres/ProductsService');
const umkms = require('./api/umkm');
const UmkmsService = require('./services/inMemory/UmkmService');

// validator
const ProductsValidator = require('./validator/products');
const UmkmsValidator = require('./validator/umkm');

const init = async () => {
  const productsService = new ProductsService();
  const umkmsService = new UmkmsService();

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
    ],
  );

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
