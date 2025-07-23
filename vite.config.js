import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({
            include: ['buffer', 'process', 'util'],
            globals: {
                Buffer: true,
                global: true,
                process: true,
            },
        }),
        tsconfigPaths(),
        svgr({
            svgrOptions: {
                icon: true,
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
            },
        }),
    ],
    define: {
        'process.env': {},
        global: {},
    },
});
