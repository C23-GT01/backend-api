const ImpactsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'impacts',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const impactHandler = new ImpactsHandler(service, validator);
    server.route(routes(impactHandler));
  },
};
