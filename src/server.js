const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const products = require('./api/products');
const ProductsService = require('./services/inMemory/ProductsService');

const init = async () => {
  const productsService = new ProductsService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: products,
    options: {
      service: productsService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
