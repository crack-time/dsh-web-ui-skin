import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ArchiveView } from './archive.js'
import { SessionIdBadge } from './session-id-badge.js'
import { ARCHIVE_LOCALE } from './archive-locale.js'

/**
 * Client entry for the Archive plugin.
 *
 * Registers the archive button in the sidebar, the archive view overlay,
 * and the session ID badge in the header.
 * Locale dictionary is registered for the 'dsh-archive' namespace.
 */

type TranslateFn = (key: string) => string;

type LocaleRuntime = {
    register(namespace: string, dict: Record<string, Record<string, string>>): void | Promise<void>;
    bind(namespace: string): TranslateFn;
    getLocale(): { active: string };
    subscribe(fn: () => void): () => void;
};

declare module '@deepseek-ai/cordis' {
    interface Context {
        locale?: LocaleRuntime;
    }
}

const DICT = 'dsh-archive'

/** Client-side service inject declaration. */
export const inject = ['locale', 'slots', 'remote']

export function apply(ctx: ClientContext): void {
  // Register locale dictionary for the 'dsh-archive' namespace.
  ctx.locale?.register?.(DICT, ARCHIVE_LOCALE)

  // Bind a stable translate function from DSH locale system.
  // It reads the active locale at call time, so it automatically
  // responds to language switches without manual detection.
  const t: TranslateFn = ctx.locale?.bind?.(DICT) ?? ((key: string) => key)

  /** Fallback translate that reads from ARCHIVE_LOCALE directly,
   *  used for DOM elements outside the React tree (tooltips, aria-labels). */
  function tFallback(key: string): string {
    const active = ctx.locale?.getLocale?.()?.active ?? 'en'
    const lang: 'zh' | 'en' = active.startsWith('zh') ? 'zh' : 'en'
    const dict = (ARCHIVE_LOCALE as Record<string, Record<string, string>>)[lang]
    return dict?.[key] ?? key
  }

  // Sidebar archive entry: a button injected right after the native
  // "Add workspace" button (headerActions row). It toggles the in-place
  // archive view over the workspace tree region (ArchiveView).
  // Tooltip: fixed-position bubble appended to body (the native Tooltip
  // mechanism) — headerActions clips absolutely-positioned children.
  let tipTimer: number | null = null
  let tipEl: HTMLElement | null = null
  function showTip(btn: HTMLElement) {
    const rect = btn.getBoundingClientRect()
    const tip = document.createElement('div')
    tip.className = 'skin-archive-tip'
    // Archive view open → this button switches back to the workspace list.
    tip.textContent = archiveRoot ? tFallback('workspaceSessions') : tFallback('archiveSessions')
    tip.style.left = rect.left + rect.width / 2 + 'px'
    tip.style.top = rect.bottom + 8 + 'px'
    document.body.appendChild(tip)
    tipEl = tip
  }
  function hideTip() {
    if (tipTimer !== null) {
      window.clearTimeout(tipTimer)
      tipTimer = null
    }
    if (tipEl) {
      tipEl.remove()
      tipEl = null
    }
  }
  function ensureArchiveButton() {
    if (document.querySelector('[data-skin-archive-btn]')) return
    const labels = ['添加工作区', 'Add workspace', 'Add workspace…']
    for (const btn of document.querySelectorAll('button[aria-label]')) {
      const label = (btn.getAttribute('aria-label') || '').trim()
      if (labels.includes(label)) {
        const b = document.createElement('button')
        b.type = 'button'
        b.dataset.skinArchiveBtn = ''
        b.setAttribute('aria-label', tFallback('archiveSessions'))
        // Folder icon matching the native IconFolderClose16 (same path).
        b.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="currentColor" transform="translate(1.5 2.429)" d="M5.05582 0.518756L4.50669 0.86654L5.05582 0.518756ZM13 9.4837L13.65 9.4837L13.65 3.53962L13 3.53962L12.35 3.53962L12.35 9.4837L13 9.4837ZM11.3264 1.86603L11.3264 1.21603L6.52313 1.21603L6.52313 1.86603L6.52313 2.51603L11.3264 2.51603L11.3264 1.86603ZM5.58054 1.34727L6.12968 0.999489L5.60495 0.170972L5.05582 0.518756L4.50669 0.86654L5.03141 1.69506L5.58054 1.34727ZM4.11323 1.23058e-13L4.11323 -0.65L1.67359 -0.65L1.67359 5.00699e-14L1.67359 0.65L4.11323 0.65L4.11323 1.23058e-13ZM0 1.67359L-0.65 1.67359L-0.65 9.4837L0 9.4837L0.65 9.4837L0.65 1.67359L0 1.67359ZM11.3264 11.1573L11.3264 10.5073L1.67359 10.5073L1.67359 11.1573L1.67359 11.8073L11.3264 11.8073L11.3264 11.1573ZM0 9.4837L-0.65 9.4837C-0.65 10.767 0.390308 11.8073 1.67359 11.8073L1.67359 11.1573L1.67359 10.5073C1.10828 10.5073 0.65 10.049 0.65 9.4837L0 9.4837ZM1.67359 5.00699e-14L1.67359 -0.65C0.390307 -0.65 -0.65 0.390309 -0.65 1.67359L0 1.67359L0.65 1.67359C0.65 1.10828 1.10828 0.65 1.67359 0.65L1.67359 5.00699e-14ZM5.05582 0.518756L5.60495 0.170972C5.28121 -0.340193 4.71829 -0.65 4.11323 -0.65L4.11323 1.23058e-13L4.11323 0.65C4.27282 0.65 4.4213 0.731715 4.50669 0.86654L5.05582 0.518756ZM6.52313 1.86603L6.52313 1.21603C6.36354 1.21603 6.21507 1.13431 6.12968 0.999489L5.58054 1.34727L5.03141 1.69506C5.35515 2.20622 5.91808 2.51603 6.52313 2.51603L6.52313 1.86603ZM13 3.53962L13.65 3.53962C13.65 2.25634 12.6097 1.21603 11.3264 1.21603L11.3264 1.86603L11.3264 2.51603C11.8917 2.51603 12.35 2.97431 12.35 3.53962L13 3.53962ZM13 9.4837L12.35 9.4837C12.35 10.049 11.8917 10.5073 11.3264 10.5073L11.3264 11.1573L11.3264 11.8073C12.6097 11.8073 13.65 10.767 13.65 9.4837L13 9.4837Z"/></svg>'
        b.addEventListener('click', () => toggleArchiveView())
        b.addEventListener('mouseenter', () => {
          if (tipTimer !== null) window.clearTimeout(tipTimer)
          tipTimer = window.setTimeout(() => showTip(b), 500)
        })
        b.addEventListener('mouseleave', hideTip)
        btn.insertAdjacentElement('afterend', b)
        return
      }
    }
  }

  function onDomChange() {
    ensureArchiveButton()
  }
  onDomChange()

  // ── Session ID badge in header ──────────────────────────────────────
  const slots = ctx.get('slots') as any;
  slots?.inject?.('conversation.session.header.actions', function* () {
    yield slots.register({
      name: 'conversation.session.header.actions',
      id: 'archive-session-id',
      order: -4,
      locale: 'dsh-archive',
      inject: (sessionId: string) => ({ hooks: {}, sessionId }),
    }, SessionIdBadge);
  });

  // Archive view: mounted IN PLACE over the workspace tree region (the same
  // spot the native session list occupies), toggled by the sidebar button.
  let archiveRoot: ReturnType<typeof createRoot> | null = null
  let archiveHost: HTMLElement | null = null
  let archiveTarget: HTMLElement | null = null
  let hiddenNative: HTMLElement[] = []
  function openArchiveView() {
    const btn = document.querySelector<HTMLElement>('button[data-skin-archive-btn]')
    // headerActions → sectionHeader → the tree region (its next sibling).
    const header = btn?.parentElement?.parentElement
    const target = (header?.nextElementSibling as HTMLElement | null) ?? header?.parentElement
    if (!target || archiveRoot) return
    const host = document.createElement('div')
    host.dataset.skinArchiveView = ''
    target.style.position = 'relative'
    // Hide the native tree content (the overlay is fully transparent, so the
    // native rows must not show through underneath).
    hiddenNative = []
    for (const child of Array.from(target.children) as HTMLElement[]) {
      child.style.display = 'none'
      hiddenNative.push(child)
    }
    target.appendChild(host)
    archiveTarget = target
    archiveHost = host
    archiveRoot = createRoot(host)
    archiveRoot.render(
      createElement(ArchiveView, {
        t,
        onClose: closeArchiveView,
        onOpenSession: (id) => {
          try {
            ;(ctx as unknown as { sessions?: { open?: (sid: string) => void } }).sessions?.open?.(id)
          } catch {}
        },
      }),
    )
  }
  function closeArchiveView() {
    archiveRoot?.unmount()
    archiveRoot = null
    archiveHost?.remove()
    archiveHost = null
    if (archiveTarget) archiveTarget.style.position = ''
    archiveTarget = null
    for (const el of hiddenNative) el.style.display = ''
    hiddenNative = []
  }
  function toggleArchiveView() {
    if (archiveRoot) closeArchiveView()
    else openArchiveView()
  }
  // onDomChange runs several DOM queries + a seat move; coalesce the
  // MutationObserver bursts (streaming re-renders fire them at a high rate)
  // into one pass per animation frame. The initial onDomChange() above stays
  // synchronous so the boot state applies before the first paint.
  let domScheduled = false
  const scheduleDomChange = (): void => {
    if (domScheduled) return
    domScheduled = true
    requestAnimationFrame(() => {
      domScheduled = false
      onDomChange()
    })
  }
  const obs2 = new MutationObserver(scheduleDomChange)
  obs2.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-phase', 'data-conversation-composer-overlay'],
  })

  try {
    ctx.effect(() => () => {
      obs2.disconnect()

      document.querySelectorAll('[data-skin-archive-btn]').forEach((el) => el.remove())
      closeArchiveView()
    }, 'dsh-archive: archive')
  } catch {}
}