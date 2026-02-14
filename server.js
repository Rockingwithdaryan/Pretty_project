const http = require('http');
const fs   = require('fs');
const path = require('path');

// Render sets its own PORT — always use process.env.PORT in production
const PORT = process.env.PORT || 3000;

// Root directory of the project
const ROOT = __dirname;

// MIME types
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Strip query strings
  let urlPath = req.url.split('?')[0];

  // Decode %20 etc.
  try { urlPath = decodeURIComponent(urlPath); } catch(e) {}

  // Named routes
  if (urlPath === '/' || urlPath === '') {
    urlPath = '/src/HTML/index.html';
  } else if (urlPath === '/home') {
    urlPath = '/src/HTML/home.html';
  }

  // Build absolute file path
  const filePath = path.join(ROOT, urlPath);

  // Security: make sure path doesn't escape project root
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  const ext      = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('404:', filePath);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not found: ' + urlPath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n  💌 Valentine\'s server is running!');
  console.log('  ➜  http://localhost:' + PORT + '\n');
});