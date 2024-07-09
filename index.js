const express = require('express');
const path = require('path');

const { createProxyMiddleware } = require('http-proxy-middleware');

const server = express();
const port = 9000;

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:3030/api',
  changeOrigin: true,
});

server.use('/api', apiProxy);

server.use(express.static(path.join(__dirname, 'build')));

server.get('/hello', (req, res) => {
  res.send('Hello World');
});

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  const open = (await import('open')).default;
  open(`http://localhost:${port}`);
});
