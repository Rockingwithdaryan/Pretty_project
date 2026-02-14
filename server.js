const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

// Map file extensions to MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url;

  // Serve intro at root, home/chapter select at /home
  if (urlPath === '/' || urlPath === '') {
    urlPath = '/src/HTML/index.html';
  } else if (urlPath === '/home') {
    urlPath = '/src/HTML/home.html';
  }

  const filePath = path.join(__dirname, decodeURIComponent(urlPath));
  const ext      = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 - File not found: ${urlPath}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const link = `http://localhost:${PORT}`;
  console.log('\n  💌 Valentine\'s server is running!\n');
  console.log(`  ➜  Local:   \x1b[36m\x1b[4m${link}\x1b[0m`);
  console.log('\n  Ctrl+Click the link above to open in your browser.');
  console.log('  Press Ctrl+C to stop the server.\n');
});