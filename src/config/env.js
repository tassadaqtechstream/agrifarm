// src/config/env.ts
export const env = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://apnafarm.com/api',
    appTitle: import.meta.env.VITE_APP_TITLE || 'Green Oasis Marketplace',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD
};
