// tsdown plugin: inline skin.css into the client bundle and emit the
// same <style data-plugin> injection the original hand-written build-client.js
// produced. Pure global CSS (:global), no class map. The wallpaper itself is
// no longer inlined: the host route (src/index.ts) serves assets/bg.jpg.
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSS_PATH = resolve(__dirname, '../src/client/skin.css')
const PLUGIN_ID = '@crack/dsh-archive'
const CSS_TAG_ID = PLUGIN_ID + '/skin.css'

export function skinInlinePlugin() {
  return {
    name: 'skin-inline',
    banner() {
      const css = readFileSync(CSS_PATH, 'utf8').replace(/\n{3,}/g, '\n\n')
      return [
        'const css = ' + JSON.stringify(css) + ';',
        '',
        'const tagId = ' + JSON.stringify(CSS_TAG_ID) + ';',
        'if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {',
        '\tconst tag = document.createElement("style");',
        '\ttag.dataset.plugin = ' + JSON.stringify(PLUGIN_ID) + ';',
        '\ttag.dataset.pluginCss = tagId;',
        '\ttag.textContent = css;',
        '\tdocument.head.appendChild(tag);',
        '}',
        ''
      ].join('\n')
    },
  }
}