// tsdown client bundle protocol (mirrors DSH packages/client/tsdown.client.ts):
// input  = lib/client/index.js (tsc client program output)
// output = lib/client.js (CJS closure-factory, window.__ModuleLoader__.load format)
import { defineConfig } from 'tsdown'
import { skinInlinePlugin } from './scripts/skin-inline-plugin.mjs'

export default defineConfig({
  name: '@crack/dsh-web-ui-skin/client',
  entry: { client: 'lib/client/index.js' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  // react is a platform module: the browser ModuleLoader resolves it from the
  // frozen module table (dsh-client-web/src/platform), never bundled.
  deps: {
    neverBundle: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', '@deepseek-ai/dsh-client-ui-primitives'],
  },
  dts: false,
  sourcemap: true,
  clean: false,
  minify: false,
  hash: false,
  plugins: [skinInlinePlugin()],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: 'window.__ModuleLoader__.load({ id: "@crack/dsh-web-ui-skin", factory: (require) => {',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
    footer: 'return module.exports; } });',
  },
})
