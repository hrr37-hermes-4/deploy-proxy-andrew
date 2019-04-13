const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('dev'));

const staticPath = `${__dirname}/../public`;
app.use('/books/:id', express.static(staticPath));

app.use(
  '/books/:id/details',
  proxy({ target: 'http://deploy-server.sni72ccyr7.us-east-1.elasticbeanstalk.com', changeOrigin: true }),
);

// hannah-service
app.use(
  '/books/:id/reviews',
  proxy({ target: 'http://localhost:3003', changeOrigin: true }),
);

// kaz-service
app.use(
  '/books/:id/info',
  proxy({ target: 'http://localhost:3002', changeOrigin: true }),
);

// ginger-service
app.use(
  '/books/:id/authors',
  proxy({ target: 'http://localhost:3000', changeOrigin: true }),
);

module.exports = app;
