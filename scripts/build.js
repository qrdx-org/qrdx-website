const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const postcss = require('esbuild-plugin-postcss2').default;

console.log('🏗️  Building for production...\n');

// Generate routes before building
console.log('🔄 Generating routes...');
try {
  execSync('node scripts/generate-routes.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to generate routes');
  process.exit(1);
}

// Clean dist directory
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Build configuration
const buildOptions = {
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: {
    '.jsx': 'jsx',
    '.js': 'jsx',
  },
  plugins: [
    postcss({
      plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
      ],
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  logLevel: 'info',
};

// Build the application
esbuild
  .build(buildOptions)
  .then(() => {
    // Copy public files to dist
    const publicDir = path.join(__dirname, '..', 'public');
    const files = fs.readdirSync(publicDir);
    
    files.forEach(file => {
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      fs.copyFileSync(srcPath, destPath);
    });
    
    console.log('\n✅ Build completed successfully!');
    console.log(`📦 Output directory: ${distDir}`);
    console.log('\nBuild summary:');
    const stats = fs.statSync(path.join(distDir, 'bundle.js'));
    console.log(`  - bundle.js: ${(stats.size / 1024).toFixed(2)} KB`);
  })
  .catch((error) => {
    console.error('❌ Build failed:', error);
    process.exit(1);
  });
