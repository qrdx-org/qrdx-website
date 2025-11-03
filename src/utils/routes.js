/**
 * Route configuration utility
 * Provides a clean, declarative way to define routes similar to Next.js/SvelteKit
 */

/**
 * Generate routes from page configuration
 * @param {Array} pages - Array of page configurations with { path, component, meta }
 * @returns {Array} Route configurations
 */
export const generateRoutes = (pages) => {
  return pages.map(page => ({
    path: page.path,
    element: page.component,
    meta: page.meta || {}
  }));
};

/**
 * Create a route configuration object
 * @param {string} path - The URL path for the route
 * @param {React.Component} component - The component to render
 * @param {Object} meta - Optional metadata (title, description, etc.)
 * @returns {Object} Route configuration
 */
export const createRoute = (path, component, meta = {}) => ({
  path,
  component,
  meta
});

/**
 * Validate route configuration
 * @param {Array} routes - Array of route configurations
 * @returns {boolean} Whether routes are valid
 */
export const validateRoutes = (routes) => {
  if (!Array.isArray(routes)) {
    console.error('Routes must be an array');
    return false;
  }

  for (const route of routes) {
    if (!route.path || typeof route.path !== 'string') {
      console.error('Each route must have a valid path string', route);
      return false;
    }
    if (!route.component) {
      console.error('Each route must have a component', route);
      return false;
    }
  }

  return true;
};
