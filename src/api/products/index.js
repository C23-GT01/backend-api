const ProductsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'products',
  version: '1.0.0',
  register: async (server, { service }) => {
    const productHandler = new ProductsHandler(service);
    server.route(routes(productHandler));
  },
};
