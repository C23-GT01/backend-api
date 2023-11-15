const UMKMHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'umkm',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const umkmHandler = new UMKMHandler(service, validator);
    server.route(routes(umkmHandler));
  },
};
