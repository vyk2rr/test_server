var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'textile-server'
    },
    port: 3000,
    db: 'mongodb://localhost/textile-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'textile-server'
    },
    port: 3000,
    db: 'mongodb://localhost/textile-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'textile-server'
    },
    port: 3000,
    db: 'mongodb://localhost/textile-server-production'
  }
};

module.exports = config[env];
