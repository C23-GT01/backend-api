const ProductsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'products',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const productHandler = new ProductsHandler(service, validator);
    server.route(routes(productHandler));
  },
};
