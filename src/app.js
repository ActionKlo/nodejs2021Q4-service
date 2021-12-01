const app = require('fastify')({ logger: false })

/*
const path = require('path');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.register(swaggerDocument, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});
*/

require('./routes')(app)

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app; 
