const SenhaController = require('../controller/SenhaController');

module.exports = (server, routes, prefix = '/api/senha') => {
  routes.post('/', SenhaController.create);
  routes.get('/', SenhaController.findAll);
  routes.get('/chamar', SenhaController.find);
  server.use(prefix, routes);
};
