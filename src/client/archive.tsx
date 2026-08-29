/**
 * Archive view for the Pastoral Cottage skin.
 *
 * Mounted IN PLACE over the workspace tree region by src/client/index.ts.
 * Everything is reused from the native workspace browser:
 *  - the toolbar (incl. the view-options button) stays visible and live; the
 *    archive list mirrors its groupBy/orderBy state by polling the same
 *    persisted store key (dsh.workspace.view.v5)
 *  - rows show the native session title + time and a hover "⋯" menu
 *    (rename / restore / delete) mirroring the native rename/fork/archive menu
 * Data and mutations go through the host-half API (src/index.ts).
 */
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Button,
  IconEllipsisOutline16,
  IconFolderClose16,
  IconFolderOpen16,
  IconTriangleRightFill14,
  Modal,
} from '@deepseek-ai/dsh-client-ui-primitives'

const API = '/plugins/@crack/dsh-web-ui-skin/api'
const VIEW_KEY = 'dsh.workspace.view.v5'

/** No-op for the optional onOpenSession prop. */
const NOOP = (): void => undefined

export interface ArchivedItem {
  sessionId: string
  /** Native displayTitle fallback chain: durable title → cwd basename → id prefix. */
  title: string
  /** Epoch-millis creation timestamp (host header.createdAt). */
  createdAt: number | null
  /** Last prompt time (activity) for the native 'updated' ordering; falls back to createdAt. */
  updatedAt: number | null
}

export interface ArchivedGroup {
  workspaceId: string
  title: string
  sessions: ArchivedItem[]
}

export interface ArchivedData {
  groups: ArchivedGroup[]
  ungrouped: ArchivedItem[]
}

type OrderBy = 'manual' | 'updated'
type GroupBy = 'workspace' | 'flat'

interface ViewState {
  groupBy: GroupBy
  orderBy: OrderBy
  /** Collapsed workspace groups, shared with the native browser (same key). */
  groupExpansion: Record<string, boolean>
}

/** Read the native workspace browser's persisted view state (the exact
 * store the view-options button and group headers write). */
function readViewState(): ViewState {
  try {
    const raw = localStorage.getItem(VIEW_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as {
        groupBy?: unknown
        orderBy?: unknown
        groupExpansion?: unknown
      }
      return {
        groupBy: parsed.groupBy === 'flat' ? 'flat' : 'workspace',
        orderBy: parsed.orderBy === 'manual' ? 'manual' : 'updated',
        groupExpansion:
          parsed.groupExpansion && typeof parsed.groupExpansion === 'object'
            ? (parsed.groupExpansion as Record<string, boolean>)
            : {},
      }
    }
  } catch {
    // ignore
  }
  return { groupBy: 'workspace', orderBy: 'updated', groupExpansion: {} }
}

/** Persist a group-expansion change into the shared native store key. */
function writeGroupExpansion(key: string, expanded: boolean): void {
  try {
    const state = readViewState()
    const next = { ...state.groupExpansion, [key]: expanded }
    localStorage.setItem(VIEW_KEY, JSON.stringify({ ...state, groupExpansion: next }))
  } catch {
    // ignore
  }
}

async function getArchived(): Promise<ArchivedData> {
  const res = await fetch(API + '/archived')
  if (!res.ok) throw new Error('加载归档列表失败')
  const data = (await res.json()) as Partial<ArchivedData>
  return { groups: data.groups ?? [], ungrouped: data.ungrouped ?? [] }
}

async function postAction(action: 'unarchive' | 'delete-session', sessionId: string): Promise<void> {
  const res = await fetch(API + '/' + action, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  })
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error ?? '操作失败')
  }
}

async function renameSession(sessionId: string, title: string): Promise<void> {
  const res = await fetch(API + '/rename-session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sessionId, title }),
  })
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error ?? '重命名失败')
  }
}

/** Relative time label mirroring the native row time (now/minutes/hours/days). */
function timeAgo(ms: number | null): string {
  if (ms === null || ms === undefined) return ''
  const diff = Date.now() - ms
  if (diff < 60_000) return '刚刚'
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  const days = Math.floor(hours / 24)
  return `${days} 天前`
}


/** Context menu item, mirroring the native row menu (rename / restore / delete). */
interface MenuItem {
  id: string
  label: string
  danger?: boolean
}

function ContextMenu({
  x,
  y,
  items,
  onPick,
  onClose,
}: {
  x: number
  y: number
  items: MenuItem[]
  onPick: (id: string) => void
  onClose: () => void
}): React.ReactPortal {
  return createPortal(
    <>
      <div className="skin-menu-mask" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose() }} />
      <div className="skin-menu" style={{ left: x, top: y }} role="menu">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className={item.danger ? 'danger' : ''}
            onClick={() => onPick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>,
    document.body,
  )
}

function SessionRow({
  item,
  busy,
  menuOpen,
  onMenuOpen,
  onOpen,
}: {
  item: ArchivedItem
  busy: string | null
  menuOpen: boolean
  onMenuOpen: (e: React.MouseEvent) => void
  onOpen: (sessionId: string) => void
}): React.ReactElement {
  return (
    <div
      className={'skin-archive-item' + (menuOpen ? ' menu-open' : '')}
      role="treeitem"
      aria-selected={false}
      onClick={() => onOpen(item.sessionId)}
    >
      <span className="skin-archive-title" title={item.title}>
        {item.title}
      </span>
      <span className="skin-archive-time">{timeAgo(item.updatedAt ?? item.createdAt)}</span>
      <span className="skin-archive-actions">
        <button
          type="button"
          className="skin-archive-more"
          aria-label="会话操作"
          disabled={busy === item.sessionId}
          onClick={(e) => {
            e.stopPropagation()
            onMenuOpen(e)
          }}
        >
          <IconEllipsisOutline16 />
        </button>
      </span>
    </div>
  )
}

export function ArchiveView({
  onClose,
  onOpenSession,
}: {
  onClose: () => void
  onOpenSession?: (sessionId: string) => void
}): React.ReactElement {
  const [data, setData] = useState<ArchivedData>({ groups: [], ungrouped: [] })
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<{ groupBy: GroupBy; orderBy: OrderBy }>(readViewState)
  const [menu, setMenu] = useState<{ item: ArchivedItem; x: number; y: number } | null>(null)
  // Native-style rename dialog state (mirrors the workspace browser's
  // session-rename Modal: autofocus+select-all, IME composition guard,
  // Enter to confirm, Escape/mask to close, inline error).
  const [renameTarget, setRenameTarget] = useState<{ sessionId: string; title: string } | null>(null)
  const [renameDraft, setRenameDraft] = useState('')
  const [renaming, setRenaming] = useState(false)
  const [renameError, setRenameError] = useState<string | null>(null)
  const composingRef = useRef(false)

  // Native-style delete confirmation (mirrors the workspace-browser
  // delete Modal: description of consequences, danger action in the
  // footer, pending status while in flight, inline error).
  const [deleteTarget, setDeleteTarget] = useState<ArchivedItem | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const closeDelete = (): void => {
    if (deleting) return
    setDeleteTarget(null)
    setDeleteError(null)
  }

  const confirmDelete = async (): Promise<void> => {
    if (deleting || deleteTarget === null) return
    setDeleting(true)
    setDeleteError(null)
    try {
      await postAction('delete-session', deleteTarget.sessionId)
      setDeleting(false)
      setDeleteTarget(null)
      await refresh()
    } catch (reason) {
      setDeleting(false)
      setDeleteError(reason instanceof Error ? reason.message : String(reason))
    }
  }

  const renameTrimmed = renameDraft.trim()
  const renameBlocked = renaming || renameTrimmed === '' || renameTarget === null

  const closeRename = (): void => {
    if (renaming) return
    setRenameTarget(null)
    setRenameError(null)
  }

  const confirmRename = async (): Promise<void> => {
    if (renameBlocked || renameTarget === null) return
    setRenaming(true)
    setRenameError(null)
    try {
      await renameSession(renameTarget.sessionId, renameTrimmed)
      setRenaming(false)
      setRenameTarget(null)
      await refresh()
    } catch (reason) {
      setRenaming(false)
      setRenameError(reason instanceof Error ? reason.message : String(reason))
    }
  }
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => readViewState().groupExpansion)

  // Mirror the native view-options button: poll the shared persisted store key.
  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = readViewState()
      setView((prev) =>
        prev.groupBy === next.groupBy && prev.orderBy === next.orderBy ? prev : next,
      )
      setExpanded((prev) => {
        for (const key of Object.keys(next.groupExpansion)) {
          if (prev[key] !== next.groupExpansion[key]) return { ...next.groupExpansion }
        }
        return prev
      })
    }, 400)
    return () => window.clearInterval(timer)
  }, [])

  const refresh = useCallback(async () => {
    try {
      setData(await getArchived())
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const act = async (action: 'unarchive' | 'delete-session', item: ArchivedItem): Promise<void> => {
    setBusy(item.sessionId)
    setError(null)
    try {
      await postAction(action, item.sessionId)
      setMenu(null)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(null)
    }
  }

  const handleRename = (item: ArchivedItem): void => {
    setMenu(null)
    setRenameTarget({ sessionId: item.sessionId, title: item.title })
    setRenameDraft(item.title)
    setRenameError(null)
  }

  const handleDelete = (item: ArchivedItem): void => {
    setMenu(null)
    setDeleteTarget(item)
    setDeleteError(null)
  }

  const sortSessions = (sessions: ArchivedItem[]): ArchivedItem[] =>
    view.orderBy === 'updated'
      ? [...sessions].sort((a, b) => (b.updatedAt ?? b.createdAt ?? 0) - (a.updatedAt ?? a.createdAt ?? 0))
      : sessions

  const total = data.groups.reduce((n, g) => n + g.sessions.length, 0) + data.ungrouped.length
  const flat =
    view.groupBy === 'flat'
      ? sortSessions([...data.groups.flatMap((g) => g.sessions), ...data.ungrouped])
      : null

  const openMenu = (e: React.MouseEvent, item: ArchivedItem): void => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMenu({ item, x: Math.max(8, Math.min(rect.right - 140, window.innerWidth - 148)), y: rect.bottom + 4 })
  }

  const onMenuPick = (id: string): void => {
    if (!menu) return
    if (id === 'rename') handleRename(menu.item)
    else if (id === 'unarchive') void act('unarchive', menu.item)
    else if (id === 'delete') handleDelete(menu.item)
  }

  return (
    <div className="skin-archive" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      {error && <div className="skin-archive-error">{error}</div>}
      <div className="skin-archive-list">
        {total === 0 && <div className="skin-archive-empty">暂无归档会话</div>}
        {flat !== null &&
          flat.map((item) => (
            <SessionRow
              key={item.sessionId}
              item={item}
              busy={busy}
              menuOpen={menu?.item.sessionId === item.sessionId}
              onMenuOpen={(e) => openMenu(e, item)}
              onOpen={onOpenSession ?? NOOP}
            />
          ))}
        {flat === null &&
          data.groups.map((group) => {
            const isExpanded = expanded[group.workspaceId] !== false
            return (
              <div key={group.workspaceId} className="skin-archive-group">
                <div
                  className="skin-archive-group-title"
                  role="treeitem"
                  aria-expanded={isExpanded}
                  onClick={() => {
                    const next = !isExpanded
                    setExpanded((prev) => ({ ...prev, [group.workspaceId]: next }))
                    writeGroupExpansion(group.workspaceId, next)
                  }}
                >
                  <span className={'skin-archive-folder' + (isExpanded ? ' open' : '')}>
                    {isExpanded ? <IconFolderOpen16 /> : <IconFolderClose16 />}
                  </span>
                  <span className="skin-archive-chevron">
                    <span className={'skin-archive-arrow' + (isExpanded ? ' open' : '')}>
                      <IconTriangleRightFill14 />
                    </span>
                  </span>
                  <span className="skin-archive-project">
                    <span className="skin-archive-title">{group.title}</span>
                  </span>
                </div>
                {isExpanded &&
                  sortSessions(group.sessions).map((item) => (
                    <SessionRow
                      key={item.sessionId}
                      item={item}
                      busy={busy}
                      menuOpen={menu?.item.sessionId === item.sessionId}
                      onMenuOpen={(e) => openMenu(e, item)}
                      onOpen={onOpenSession ?? NOOP}
                    />
                  ))}
              </div>
            )
          })}
        {flat === null &&
          data.ungrouped.length > 0 && (
            <div className="skin-archive-group">
              <div className="skin-archive-group-title" role="treeitem" aria-expanded>
                <span className="skin-archive-folder open">
                  <IconFolderOpen16 />
                </span>
                <span className="skin-archive-chevron">
                  <span className="skin-archive-arrow open">
                    <IconTriangleRightFill14 />
                  </span>
                </span>
                <span className="skin-archive-project">
                  <span className="skin-archive-title">未分组</span>
                </span>
              </div>
              {sortSessions(data.ungrouped).map((item) => (
                <SessionRow
                  key={item.sessionId}
                  item={item}
                  busy={busy}
                  menuOpen={menu?.item.sessionId === item.sessionId}
                  onMenuOpen={(e) => openMenu(e, item)}
                  onOpen={onOpenSession ?? NOOP}
                />
              ))}
            </div>
          )}
      </div>
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          items={[
            { id: 'rename', label: '重命名' },
            { id: 'unarchive', label: '还原会话' },
            { id: 'delete', label: '删除会话', danger: true },
          ]}
          onPick={onMenuPick}
          onClose={() => setMenu(null)}
        />
      )}
      <Modal
        open={renameTarget !== null}
        onClose={closeRename}
        closeLabel="关闭"
        title="重命名会话"
        footer={
          <>
            <Button variant="outline" disabled={renaming} onClick={closeRename}>
              取消
            </Button>
            <Button variant="primary" disabled={renameBlocked} onClick={confirmRename}>
              重命名
            </Button>
          </>
        }
      >
        <input
          className="skin-rename-input"
          value={renameDraft}
          aria-label="会话名称"
          autoFocus
          disabled={renaming}
          onFocus={(e) => {
            e.target.select()
          }}
          onChange={(e) => {
            setRenameDraft(e.target.value)
            setRenameError(null)
          }}
          onCompositionStart={() => {
            composingRef.current = true
          }}
          onCompositionEnd={() => {
            composingRef.current = false
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !composingRef.current) {
              e.preventDefault()
              confirmRename()
            }
          }}
        />
        {renameError !== null && (
          <div className="skin-rename-error" role="alert">
            {renameError}
          </div>
        )}
      </Modal>
      <Modal
        open={deleteTarget !== null}
        onClose={closeDelete}
        closeLabel="关闭"
        title="删除会话"
        description={
          deleteTarget !== null
            ? `将删除「${deleteTarget.title}」，会话日志将被移除，此操作不可恢复。`
            : undefined
        }
        footer={
          <>
            <Button variant="outline" disabled={deleting} onClick={closeDelete}>
              取消
            </Button>
            <Button
              variant="outline"
              className="skin-delete-action"
              disabled={deleting}
              onClick={confirmDelete}
            >
              删除会话
            </Button>
          </>
        }
      >
        {deleting && (
          <div className="skin-delete-status" role="status">
            正在删除会话…
          </div>
        )}
        {deleteError !== null && (
          <div className="skin-rename-error" role="alert">
            {deleteError}
          </div>
        )}
      </Modal>
    </div>
  )
}
