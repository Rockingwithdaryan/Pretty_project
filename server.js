const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// Figure out where src/html actually is (handles case differences)
function findHtmlDir() {
  const options = [
    path.join(__dirname, 'src', 'html'),
    path.join(__dirname, 'src', 'HTML'),
  ];
  for (const p of options) {
    if (fs.existsSync(p)) { console.log('Found HTML dir at:', p); return p; }
  }
  console.log('WARNING: could not find html dir, defaulting');
  return options[0];
}

const htmlDir = findHtmlDir();

// Serve everything statically
app.use(express.static(path.join(__dirname)));

// Named routes — use htmlDir so casing doesn't matter
app.get('/', (_req, res) => {
  res.sendFile(path.join(htmlDir, 'index.html'));
});

app.get('/home', (_req, res) => {
  res.sendFile(path.join(htmlDir, 'home.html'));
});

// Catch-all 404
app.use((req, res) => {
  console.log('404:', req.url);
  res.status(404).send('Not found: ' + req.url);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n  💌 Valentine\'s server is running!');
  console.log('  ➜  http://localhost:' + PORT);
  console.log('  __dirname:', __dirname, '\n');
});