const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Serve everything in the project as static files
app.use(express.static(path.join(__dirname)));

// Named routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'home.html'));
});

// Catch-all 404
app.use((req, res) => {
  console.log('404 requested:', req.url);
  res.status(404).send('Not found: ' + req.url);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n  💌 Valentine\'s server is running!');
  console.log('  ➜  http://localhost:' + PORT);
  console.log('  __dirname is:', __dirname, '\n');
});