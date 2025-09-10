import path from 'node:path';
import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import cleanCss from 'vite-plugin-clean-css';
import autoprefixer from 'autoprefixer';
import combineMediaQuery from 'postcss-combine-media-query';
import spritemap from '@spiriit/vite-plugin-svg-spritemap';
import imagemin from '@vheemstra/vite-plugin-imagemin';
import svgo from 'imagemin-svgo';
import webp from 'imagemin-webp';
import vue from '@vitejs/plugin-vue';
import restart from 'vite-plugin-restart';
import envs from './config/envs';

export default defineConfig({
  base: './',
  server: {
    port: envs.port,
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer, combineMediaQuery],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@': path.resolve(__dirname, envs.paths.source),
    },
  },
  plugins: [
    vituum({
      pages: {
        dir: `${envs.paths.source}/pug`,
        normalizeBasePath: true,
      },
    }),
    pug({
      root: envs.paths.source,
      globals: {
        devmode: envs.devmode,
      },
      options: {
        pretty: !envs.devmode,
      },
    }),
    cleanCss(),
    spritemap(`${envs.paths.source}/svgsprite/*.svg`, {
      prefix: false,
      output: {
        filename: '../images/svgsprite[extname]',
      },
      styles: false,
      injectSVGOnDev: true,
    }),
    imagemin({
      plugins: {
        svg: svgo({
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeUselessStrokeAndFill: false,
                  cleanupIds: false,
                },
              },
            },
            {
              prefixIds: false,
            },
          ],
        }),
      },
      makeWebp: {
        plugins: {
          png: webp({
            quality: 100,
            lossless: true,
          }),
          jpg: webp({
            quality: 100,
            lossless: true,
          }),
        },
        formatFilePath: file => `${file.replace(/(.*)\.[^.]+$/, '$1')}.webp`,
      },
    }),
    vue(),
    restart({
      delay: 0,
      restart: [`${envs.paths.source}/svgsprite/**`],
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        'top-level-await': true,
      },
    },
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    modulePreload: false,
    rollupOptions: {
      input: [
        `${envs.paths.source}/pug/*.pug`,
        `${envs.paths.source}/js/main.js`,
        `${envs.paths.source}/scss/main.scss`,
      ],
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: assets => {
          let folder = assets.name.split('.').pop();

          if (/png|jpe?g|svg|ico/i.test(folder)) {
            folder = 'images';
          }

          if (/ttf|woff2|woff?/i.test(folder)) {
            folder = 'fonts';
          }

          return `${folder}/[name][extname]`;
        },
      },
    },
  },
});
