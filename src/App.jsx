import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { routes } from './pages';
import { generateRoutes } from './utils';

/**
 * Main App Component
 * Uses file-based routing configuration similar to Next.js/SvelteKit
 * Routes are automatically generated from the pages directory
 */
const App = () => {
  // Generate route configurations
  const routeConfigs = generateRoutes(routes);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routeConfigs.map(({ path, element: Component, meta }) => (
            <Route 
              key={path} 
              path={path} 
              element={<Component />} 
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
