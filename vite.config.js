import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@components': path.resolve(__dirname, './src/components'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@contexts': path.resolve(__dirname, './src/contexts'),
                '@config': path.resolve(__dirname, './src/config'),
            },
        },
        server: {
            port: 5173,
            open: true,
            cors: true,
        },
        build: {
            outDir: 'dist',
            sourcemap: mode === 'development',
            // Improve chunking strategy for better caching
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                        bootstrap: ['react-bootstrap', 'bootstrap'],
                    },
                },
            },
        },
        // Define global constants
        define: {
            // Expose mode to the client side
            '__APP_MODE__': JSON.stringify(mode),
        },
    };
});
