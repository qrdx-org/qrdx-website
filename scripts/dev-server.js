const esbuild = require('esbuild');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const clients = [];

// esbuild configuration
const buildOptions = {
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: {
    '.jsx': 'jsx',
    '.js': 'jsx',
    '.css': 'css',
  },
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  sourcemap: true,
  minify: false,
};

// Initial build
async function build() {
  try {
    await esbuild.build(buildOptions);
    console.log('✓ Build completed');
    // Notify clients to reload
    clients.forEach(res => res.write('data: reload\n\n'));
  } catch (error) {
    console.error('Build error:', error);
  }
}

// Watch for file changes
async function watch() {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('👀 Watching for changes...');
  
  // Trigger rebuild notification
  ctx.serve = () => {
    clients.forEach(res => res.write('data: reload\n\n'));
  };
}

// Simple HTTP server
const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  
  // Server-Sent Events endpoint for live reload
  if (url === '/esbuild-live-reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    clients.push(res);
    req.on('close', () => {
      const index = clients.indexOf(res);
      if (index !== -1) clients.splice(index, 1);
    });
    return;
  }
  
  let filePath;
  
  // Serve from public directory or dist
  if (url === '/index.html') {
    filePath = path.join(__dirname, '..', 'public', 'index.html');
  } else if (url.startsWith('/dist')) {
    filePath = path.join(__dirname, '..', url);
  } else {
    filePath = path.join(__dirname, '..', 'public', url);
  }
  
  const extname = path.extname(filePath);
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  }[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Fallback to index.html for client-side routing
        fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start everything
async function start() {
  await build();
  await watch();
  
  server.listen(PORT, () => {
    console.log(`🚀 Dev server running at http://localhost:${PORT}`);
  });
}

start();
