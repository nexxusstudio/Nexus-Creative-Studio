import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode !== "production" ? [runtimeErrorOverlay()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "public"),
    emptyOutDir: true,
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['wouter', '@tanstack/react-query'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          utils: ['clsx', 'tailwind-merge', 'date-fns', 'zod'],
          icons: ['lucide-react', 'react-icons'],
          animations: ['framer-motion'],
          data: ['@supabase/supabase-js', 'drizzle-orm'],
          forms: ['react-hook-form', '@hookform/resolvers']
        },
        chunkFileNames: (chunkInfo: any) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo: any) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    open: false,
    cors: true,
    fs: {
      strict: true,
      deny: ["**/.*", "**/node_modules/**"],
    },
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'wouter',
      '@supabase/supabase-js',
      '@tanstack/react-query',
      'framer-motion',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'zod'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2022',
    format: 'esm',
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  define: {
    __DEV__: mode === 'development',
    __PROD__: mode === 'production',
  }
}));
