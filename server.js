const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const port = 1127;

app.use(morgan('dev'));

const options = {
  target: 'http://localhost:1127',
  changeOrigin: true,
  router: {
    '/listings': 'http://localhost:1128/',
    '/rooms': 'http://localhost:3000/',
    '/api': 'http://localhost:3001/'
  }
}

const apiProxy = proxy(options);

app.use('/listings', apiProxy);
app.use('/rooms', apiProxy);
app.use('/api', apiProxy);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});