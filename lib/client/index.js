import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { ArchiveView } from './archive.js';
import { SKIN_CONFIG_URL, SKIN_DEFAULTS, createSkinCardStore, installSkinSettingsCard, } from './settings-card.js';
import { currentPicked, disposePicked, initPicked, subscribePicked, } from './local-wallpaper.js';
// Wallpaper served by the host route (src/index.ts registers it).
const BG_URL = '/plugins/@crack/dsh-web-ui-skin/bg.jpg';
const BG = `url("${BG_URL}") center center / cover no-repeat fixed #3a6ea5`;
let settings = {};
/** Whether the sidebar archive entry may be shown (settings.archiveButton). */
let archiveEnabled = true;
/** Snapshot source for the settings-dialog card (kept in sync on refresh). */
const cardStore = createSkinCardStore();
/** Client-side service inject declaration — the services this plugin reads
 * through ctx (locale, slots, remote). This is the runtime declaration the
 * ModuleLoader wires; package.json dsh.client.inject is the loader's graph
 * metadata / access guard and lists provider module names — the two lists are
 * different things and are intentionally not identical. */
export const inject = ['locale', 'slots', 'remote'];
export function apply(ctx) {
    const body = document.body;
    const root = document.getElementById('root');
    body.dataset.dshSkin = '';
    // Settings-dialog card: registers the locale dict and the `settings.plugin.item` slot entry.
    installSkinSettingsCard(ctx, cardStore);
    // Inline style beats CSS rules. DSH theme may re-set root.style.background
    // on token overrides, so we guard with a MutationObserver.
    let currentBg = BG;
    function applyBg() {
        root.style.background = currentBg;
    }
    /** Apply all settings-card knobs to the live page. */
    function applyConfig() {
        // Wallpaper source precedence: picked local file (zero-copy handle from
        // the File System Access API) → settings URL → bundled asset.
        // Adaptive fit: once the image's real dimensions are known, use `cover`
        // only when its aspect ratio is close to the viewport's (fills the
        // screen, tiny crop); otherwise switch to `contain` so the WHOLE picture
        // stays visible — no more truncation for portrait/panorama uploads.
        const url = (settings.wallpaperUrl ?? '').trim();
        const src = currentPicked()?.blobUrl ?? (url || BG_URL);
        const applyBgSrc = (fit) => {
            currentBg = `url("${src}") center center / ${fit} no-repeat fixed #3a6ea5`;
            applyBg();
        };
        const probe = new Image();
        probe.onload = () => {
            const winAspect = window.innerWidth / Math.max(1, window.innerHeight);
            const imgAspect = probe.naturalWidth / Math.max(1, probe.naturalHeight);
            const fit = imgAspect < winAspect * 0.85 || imgAspect > winAspect * 1.18
                ? 'contain'
                : 'cover';
            applyBgSrc(fit);
        };
        probe.onerror = () => applyBgSrc('cover');
        probe.src = src;
        archiveEnabled = settings.archiveButton !== false;
    }
    applyConfig();
    // Picked local wallpaper (File System Access API handle): restore it on
    // boot and re-apply whenever the card picks or clears one.
    subscribePicked(() => applyConfig());
    void initPicked();
    const obs = new MutationObserver(() => {
        if (root.style.background !== currentBg)
            applyBg();
    });
    obs.observe(root, { attributes: true, attributeFilter: ['style'] });
    // Sidebar archive entry: a button injected right after the native
    // "Add workspace" button (headerActions row). It toggles the in-place
    // archive view over the workspace tree region (ArchiveView).
    // Tooltip: fixed-position bubble appended to body (the native Tooltip
    // mechanism) — headerActions clips absolutely-positioned children.
    let tipTimer = null;
    let tipEl = null;
    function showTip(btn) {
        const rect = btn.getBoundingClientRect();
        const tip = document.createElement('div');
        tip.className = 'skin-archive-tip';
        // Archive view open → this button switches back to the workspace list.
        tip.textContent = archiveRoot ? '工作区会话' : '归档会话';
        tip.style.left = rect.left + rect.width / 2 + 'px';
        tip.style.top = rect.bottom + 8 + 'px';
        document.body.appendChild(tip);
        tipEl = tip;
    }
    function hideTip() {
        if (tipTimer !== null) {
            window.clearTimeout(tipTimer);
            tipTimer = null;
        }
        if (tipEl) {
            tipEl.remove();
            tipEl = null;
        }
    }
    function ensureArchiveButton() {
        if (document.querySelector('[data-skin-archive-btn]'))
            return;
        const labels = ['添加工作区', 'Add workspace', 'Add workspace…'];
        for (const btn of document.querySelectorAll('button[aria-label]')) {
            const label = (btn.getAttribute('aria-label') || '').trim();
            if (labels.includes(label)) {
                const b = document.createElement('button');
                b.type = 'button';
                b.dataset.skinArchiveBtn = '';
                b.setAttribute('aria-label', '归档会话');
                // Folder icon matching the native IconFolderClose16 (same path).
                b.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="currentColor" transform="translate(1.5 2.429)" d="M5.05582 0.518756L4.50669 0.86654L5.05582 0.518756ZM13 9.4837L13.65 9.4837L13.65 3.53962L13 3.53962L12.35 3.53962L12.35 9.4837L13 9.4837ZM11.3264 1.86603L11.3264 1.21603L6.52313 1.21603L6.52313 1.86603L6.52313 2.51603L11.3264 2.51603L11.3264 1.86603ZM5.58054 1.34727L6.12968 0.999489L5.60495 0.170972L5.05582 0.518756L4.50669 0.86654L5.03141 1.69506L5.58054 1.34727ZM4.11323 1.23058e-13L4.11323 -0.65L1.67359 -0.65L1.67359 5.00699e-14L1.67359 0.65L4.11323 0.65L4.11323 1.23058e-13ZM0 1.67359L-0.65 1.67359L-0.65 9.4837L0 9.4837L0.65 9.4837L0.65 1.67359L0 1.67359ZM11.3264 11.1573L11.3264 10.5073L1.67359 10.5073L1.67359 11.1573L1.67359 11.8073L11.3264 11.8073L11.3264 11.1573ZM0 9.4837L-0.65 9.4837C-0.65 10.767 0.390308 11.8073 1.67359 11.8073L1.67359 11.1573L1.67359 10.5073C1.10828 10.5073 0.65 10.049 0.65 9.4837L0 9.4837ZM1.67359 5.00699e-14L1.67359 -0.65C0.390307 -0.65 -0.65 0.390309 -0.65 1.67359L0 1.67359L0.65 1.67359C0.65 1.10828 1.10828 0.65 1.67359 0.65L1.67359 5.00699e-14ZM5.05582 0.518756L5.60495 0.170972C5.28121 -0.340193 4.71829 -0.65 4.11323 -0.65L4.11323 1.23058e-13L4.11323 0.65C4.27282 0.65 4.4213 0.731715 4.50669 0.86654L5.05582 0.518756ZM6.52313 1.86603L6.52313 1.21603C6.36354 1.21603 6.21507 1.13431 6.12968 0.999489L5.58054 1.34727L5.03141 1.69506C5.35515 2.20622 5.91808 2.51603 6.52313 2.51603L6.52313 1.86603ZM13 3.53962L13.65 3.53962C13.65 2.25634 12.6097 1.21603 11.3264 1.21603L11.3264 1.86603L11.3264 2.51603C11.8917 2.51603 12.35 2.97431 12.35 3.53962L13 3.53962ZM13 9.4837L12.35 9.4837C12.35 10.049 11.8917 10.5073 11.3264 10.5073L11.3264 11.1573L11.3264 11.8073C12.6097 11.8073 13.65 10.767 13.65 9.4837L13 9.4837Z"/></svg>';
                b.addEventListener('click', () => toggleArchiveView());
                b.addEventListener('mouseenter', () => {
                    if (tipTimer !== null)
                        window.clearTimeout(tipTimer);
                    tipTimer = window.setTimeout(() => showTip(b), 500);
                });
                b.addEventListener('mouseleave', hideTip);
                btn.insertAdjacentElement('afterend', b);
                return;
            }
        }
    }
    // ChatView keeps its instance across session switches (slot key is the
    // registration entry, not the session id), so dsh's "first open" scroll
    // logic never runs again and switching conversations inherits the old
    // scroll position. Detect the switch via the header breadcrumbs and
    // settle at the bottom once; afterwards only keep the list pinned
    // while the user is already at the bottom (streaming content).
    let lastCrumbs = null;
    function onDomChange() {
        if (archiveEnabled)
            ensureArchiveButton();
        else {
            // Settings card turned the archive entry off: drop the button (and any
            // open overlay) until it is turned back on.
            document.querySelectorAll('[data-skin-archive-btn]').forEach((el) => el.remove());
            closeArchiveView();
        }
        const chatActive = !!document.querySelector('.wSkVaW_scrollBody .EvIC1a_root');
        const crumb = document.querySelector('.wSkVaW_crumbs');
        const crumbText = crumb ? crumb.textContent : '';
        const sb = document.querySelector('.wSkVaW_scrollBody');
        if (chatActive && sb) {
            if (crumbText !== lastCrumbs) {
                // Session switched (or first load): settle at the bottom once.
                lastCrumbs = crumbText;
                sb.scrollTop = sb.scrollHeight;
            }
        }
        else if (!chatActive) {
            lastCrumbs = crumbText;
        }
    }
    onDomChange();
    // Archive view: mounted IN PLACE over the workspace tree region (the same
    // spot the native session list occupies), toggled by the sidebar button.
    let archiveRoot = null;
    let archiveHost = null;
    let archiveTarget = null;
    let hiddenNative = [];
    function openArchiveView() {
        const btn = document.querySelector('button[data-skin-archive-btn]');
        // headerActions → sectionHeader → the tree region (its next sibling).
        const header = btn?.parentElement?.parentElement;
        const target = header?.nextElementSibling ?? header?.parentElement;
        if (!target || archiveRoot)
            return;
        const host = document.createElement('div');
        host.dataset.skinArchiveView = '';
        target.style.position = 'relative';
        // Hide the native tree content (the overlay is fully transparent, so the
        // native rows must not show through underneath).
        hiddenNative = [];
        for (const child of Array.from(target.children)) {
            child.style.display = 'none';
            hiddenNative.push(child);
        }
        target.appendChild(host);
        archiveTarget = target;
        archiveHost = host;
        archiveRoot = createRoot(host);
        archiveRoot.render(createElement(ArchiveView, {
            onClose: closeArchiveView,
            onOpenSession: (id) => {
                try {
                    ;
                    ctx.sessions?.open?.(id);
                }
                catch { }
            },
        }));
    }
    function closeArchiveView() {
        archiveRoot?.unmount();
        archiveRoot = null;
        archiveHost?.remove();
        archiveHost = null;
        if (archiveTarget)
            archiveTarget.style.position = '';
        archiveTarget = null;
        for (const el of hiddenNative)
            el.style.display = '';
        hiddenNative = [];
    }
    function toggleArchiveView() {
        if (archiveRoot)
            closeArchiveView();
        else
            openArchiveView();
    }
    // onDomChange runs several DOM queries + a seat move; coalesce the
    // MutationObserver bursts (streaming re-renders fire them at a high rate)
    // into one pass per animation frame. The initial onDomChange() above stays
    // synchronous so the boot state applies before the first paint.
    let domScheduled = false;
    const scheduleDomChange = () => {
        if (domScheduled)
            return;
        domScheduled = true;
        requestAnimationFrame(() => {
            domScheduled = false;
            onDomChange();
        });
    };
    const obs2 = new MutationObserver(scheduleDomChange);
    obs2.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-phase', 'data-conversation-composer-overlay'],
    });
    // Settings card: pull the resolved config once, then live-apply on every
    // `settings/document-updated` wire event (emitted by the host after a card
    // write commits).
    async function refreshConfig() {
        // The host route may not be registered yet when the browser bundle boots,
        // so back off and retry a few times before giving up; the wire
        // subscription below also re-fetches on every `settings/document-updated`.
        for (let attempt = 0;; attempt++) {
            try {
                const res = await fetch(SKIN_CONFIG_URL, { cache: 'no-store' });
                if (!res.ok)
                    throw new Error('config endpoint: ' + res.status);
                settings = (await res.json());
                applyConfig();
                onDomChange();
                cardStore.set({
                    loaded: true,
                    wallpaperUrl: settings.wallpaperUrl ?? SKIN_DEFAULTS.wallpaperUrl,
                    archiveButton: settings.archiveButton ?? SKIN_DEFAULTS.archiveButton,
                });
                return;
            }
            catch {
                if (attempt >= 3)
                    return;
                await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
            }
        }
    }
    void refreshConfig();
    let offRemote = null;
    try {
        const remote = ctx.get('remote');
        if (remote) {
            offRemote = remote.$on('settings/document-updated', () => {
                void refreshConfig();
            });
        }
    }
    catch { }
    try {
        ctx.effect(() => () => {
            obs.disconnect();
            obs2.disconnect();
            offRemote?.();
            disposePicked();
            delete body.dataset.dshSkin;
            root.style.removeProperty('background');
            document.querySelectorAll('[data-skin-archive-btn]').forEach((el) => el.remove());
            closeArchiveView();
        }, 'dsh-web-ui-skin: background');
    }
    catch { }
}
