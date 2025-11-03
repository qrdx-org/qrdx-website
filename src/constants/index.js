/**
 * Application constants
 */

export const APP_NAME = 'QRDX';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
};

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:3001',
  TIMEOUT: 30000,
};

export const ENVIRONMENT = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
