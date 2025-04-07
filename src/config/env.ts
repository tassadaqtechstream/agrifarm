// src/config/env.ts

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_TITLE: string;
    // Add other environment variables you need
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

export const env = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://apnafarm.com/api',
    appTitle: import.meta.env.VITE_APP_TITLE || 'Green Oasis Marketplace',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD
};