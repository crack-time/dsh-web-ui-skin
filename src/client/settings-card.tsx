import { useEffect, useState } from 'react'
import { IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import {
  clearPicked,
  currentPicked,
  pickAndSet,
  subscribePicked,
  supportsLocalPick,
} from './local-wallpaper.js'

/**
 * Settings-dialog card for the "skin" skin namespace (dsh rc.7 feature).
 *
 * The host registers the namespace (ctx.settings.register) and serves
 * GET/POST /api/config; the settings dialog's "configurable plugins" tab
 * dispatches the `settings.plugin.item` slot BY namespace key, so this card
 * must be registered into that slot with `key: 'skin'` to show up. The
 * slot system renders our component with `t` (bound to our locale dict) plus
 * whatever `inject()` returns (here: a uSES snapshot hook + applyPatch).
 *
 * The card mirrors the built-in plugin cards (shell / agent-loop /
 * web-search) structurally: a collapsible card shell with a title + chevron
 * header, an "unsaved" badge while a staged edit differs from the server,
 * the form fields in the expanded body, and a staged save / discard footer.
 * We cannot import their PluginCard component (client bundle purity), so the
 * chrome is re-implemented here with the same class names' CSS values.
 */

/** The three knobs the card edits — keep in sync with the host schema. */
export interface SkinSettings {
  wallpaperUrl: string
  archiveButton: boolean
}

export const SKIN_DEFAULTS: SkinSettings = {
  wallpaperUrl: '',
  archiveButton: true,
}

/** Snapshot the card renders from; `loaded` flips once the first read landed. */
export type SkinCardState = SkinSettings & { loaded: boolean }

/** Host endpoint for the URL field's settings read/write. */
export const SKIN_CONFIG_URL = '/plugins/@crack/dsh-web-ui-skin/api/config'

/** Tiny uSES-compatible snapshot store; the slot system exposes `hooks.*` as `use*`. */
export function createSkinCardStore() {
  let state: SkinCardState = { ...SKIN_DEFAULTS, loaded: false }
  const listeners = new Set<() => void>()
  return {
    getSnapshot: (): SkinCardState => state,
    set(next: SkinCardState) {
      state = next
      listeners.forEach((listener) => listener())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

/** Locale dictionary for the card (title / description / labels / hints). */
export const SKIN_CARD_LOCALE = {
  zh: {
    title: '壁纸',
    description: '壁纸设置',
    wallpaperUrl: '自定义壁纸 URL',
    wallpaperUrlHint: '留空使用内置壁纸',
    pick: '选择本机图片…',
    removeLocal: '移除本机图片',
    picked: '当前使用本机图片：',
    unsupported: '当前浏览器不支持本机图片选择（仅 Chrome/Edge）',
    save: '保存',
    saving: '保存中…',
    discard: '放弃修改',
    unsaved: '未保存',
    expand: '展开',
    collapse: '折叠',
    saveFailed: '保存失败，请重试',
  },
  en: {
    title: 'Wallpaper',
    description: 'Wallpaper settings',
    wallpaperUrl: 'Custom wallpaper URL',
    wallpaperUrlHint: 'Leave empty for the bundled wallpaper',
    pick: 'Choose local image…',
    removeLocal: 'Remove local image',
    picked: 'Using local image: ',
    unsupported: 'Local image picking needs Chrome/Edge',
    save: 'Save',
    saving: 'Saving…',
    discard: 'Discard',
    unsaved: 'Unsaved',
    expand: 'Expand',
    collapse: 'Collapse',
    saveFailed: 'Save failed, please retry',
  },
} as const

export type SkinCardProps = {
  t: (key: string) => string
  useSkinCard: <T>(select: (state: SkinCardState) => T) => T
  applyPatch: (patch: Partial<SkinSettings>) => Promise<{ ok: boolean; error?: string }>
}

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

/** The settings-dialog card for the skin namespace (slot key 'skin'). */
export function SkinSettingsCard(props: SkinCardProps) {
  const { t, useSkinCard, applyPatch } = props
  const snapshot = useSkinCard((state) => state)
  const available = snapshot.loaded
  const [open, setOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState(SKIN_DEFAULTS.wallpaperUrl)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)

  const server = snapshot.wallpaperUrl ?? SKIN_DEFAULTS.wallpaperUrl
  const dirty = wallpaper.trim() !== server

  // Sync the staged form to fresh server snapshots, but never clobber an
  // in-progress edit (dirty): server pushes are ignored while the user types.
  useEffect(() => {
    if (dirty) return
    setWallpaper(server)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot])

  if (!available) return null

  async function commit() {
    setSaving(true)
    setFailed(false)
    try {
      const outcome = await applyPatch({ wallpaperUrl: wallpaper.trim() })
      if (!outcome.ok) setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setSaving(false)
    }
  }

  // Picked local wallpaper: the File System Access API opens the native file
  // dialog and hands us a HANDLE to the file in place — nothing is copied to
  // DSH. The handle is persisted (IndexedDB) by local-wallpaper.ts and the
  // skin applies it via the picked-change subscription.
  const [busy, setBusy] = useState(false)
  const [pickedName, setPickedName] = useState<string | null>(null)
  useEffect(() => {
    const sync = () => setPickedName(currentPicked()?.name ?? null)
    sync()
    return subscribePicked(sync)
  }, [])
  const canPickLocally = supportsLocalPick()

  async function handlePick() {
    if (!canPickLocally) return
    setBusy(true)
    setFailed(false)
    const ok = await pickAndSet()
    if (!ok) setFailed(true)
    setBusy(false)
  }

  async function handleClearLocal() {
    setBusy(true)
    setFailed(false)
    await clearPicked()
    setBusy(false)
  }

  const title = t('title')
  return (
    <li
      data-skin-settings
      className={cn('skin-settings-card', open && 'skin-settings-card-open')}
    >
      <button
        type="button"
        className="skin-settings-header"
        aria-expanded={open}
        aria-label={`${t(open ? 'collapse' : 'expand')}: ${title}`}
        onClick={() => setOpen(!open)}
      >
        <span className="skin-settings-headText">
          <span className="skin-settings-name">{title}</span>
          <span className="skin-settings-description">{t('description')}</span>
        </span>
        {dirty ? <span className="skin-settings-pending">{t('unsaved')}</span> : null}
        <IconChevronDownOutline14
          className={cn('skin-settings-chevron', open && 'skin-settings-chevron-open')}
        />
      </button>
      {open ? (
        <div className="skin-settings-body">
          <label className="skin-settings-row">
            <span className="skin-settings-label">{t('wallpaperUrl')}</span>
            <input
              type="text"
              value={wallpaper}
              placeholder="https://…"
              spellCheck={false}
              onChange={(e) => setWallpaper(e.target.value)}
            />
            <span className="skin-settings-controls">
              {canPickLocally ? (
                <button
                  type="button"
                  className="skin-settings-pick"
                  disabled={busy}
                  onClick={() => {
                    void handlePick()
                  }}
                >
                  {t('pick')}
                </button>
              ) : (
                <span className="skin-settings-hint">{t('unsupported')}</span>
              )}
              {pickedName ? (
                <button
                  type="button"
                  className="skin-settings-pick"
                  disabled={busy}
                  onClick={() => {
                    void handleClearLocal()
                  }}
                >
                  {t('removeLocal')}
                </button>
              ) : null}
            </span>
            {pickedName ? (
              <span className="skin-settings-hint">
                {t('picked')}
                {pickedName}
              </span>
            ) : null}
            <span className="skin-settings-hint">{t('wallpaperUrlHint')}</span>
          </label>
          <div className="skin-settings-footer">
            {failed ? (
              <p className="skin-settings-failed" role="status">
                {t('saveFailed')}
              </p>
            ) : null}
            <button
              type="button"
              className="skin-settings-discard"
              disabled={!dirty || saving}
              onClick={() => {
                setWallpaper(server)
                setFailed(false)
              }}
            >
              {t('discard')}
            </button>
            <button
              type="button"
              className="skin-settings-save"
              disabled={!dirty || saving}
              onClick={() => {
                void commit()
              }}
            >
              {saving ? t('saving') : t('save')}
            </button>
          </div>
        </div>
      ) : null}
    </li>
  )
}

/**
 * Register the card into the settings dialog:
 *  - locale dictionary under a namespace we own;
 *  - one `settings.plugin.item` slot entry keyed by the 'skin' namespace.
 * The dialog dispatches it only while the host serves that namespace, so our
 * own registration stays invisible if the settings service is absent.
 */
export function installSkinSettingsCard(
  ctx: ClientContext,
  store: ReturnType<typeof createSkinCardStore>,
): void {
  const dict = 'dsh-web-ui-skin'
  try {
    const locale = (ctx as unknown as { locale?: { register: (ns: string, dict: unknown) => void } }).locale
    locale?.register(dict, SKIN_CARD_LOCALE)
  } catch {}
  try {
    const slots = (ctx as unknown as {
      slots?: {
        inject: (slot: string, provider: () => Generator<unknown, void, unknown>) => void
        register: (options: Record<string, unknown>, component: unknown) => unknown
      }
    }).slots
    slots?.inject('settings.plugin.item', function* () {
      yield slots.register(
        {
          name: 'settings.plugin.item',
          key: 'skin',
          locale: dict,
          inject: () => ({
            hooks: { skinCard: store },
            applyPatch: async (patch: Partial<SkinSettings>) => {
              try {
                const res = await fetch(SKIN_CONFIG_URL, {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ patch }),
                })
                if (!res.ok) {
                  const text = await res.text()
                  return { ok: false, error: text.slice(0, 200) }
                }
                return { ok: true }
              } catch {
                return { ok: false, error: 'network' }
              }
            },
          }),
        },
        SkinSettingsCard,
      )
    })
  } catch {}
}