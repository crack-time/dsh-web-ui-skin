import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, IconEllipsisOutline16, IconFolderClose16, IconFolderOpen16, IconTriangleRightFill14, Modal, } from '@deepseek-ai/dsh-client-ui-primitives';
import { ARCHIVE_LOCALE, formatText } from './archive-locale.js';
const API = '/plugins/@crack/dsh-archive/api';
const VIEW_KEY = 'dsh.workspace.view.v5';
/** Fallback translate — reads from ARCHIVE_LOCALE directly when no DSH t is available. */
const LANG = typeof navigator !== 'undefined' && navigator.language && navigator.language.toLowerCase().startsWith('zh')
    ? 'zh'
    : 'en';
function tFallback(key, vars) {
    const dict = ARCHIVE_LOCALE[LANG];
    const template = dict[key] ?? key;
    return vars ? formatText(template, vars) : template;
}
/** No-op for the optional onOpenSession prop. */
const NOOP = () => undefined;
/** Read the native workspace browser's persisted view state (the exact
 * store the view-options button and group headers write). */
function readViewState() {
    try {
        const raw = localStorage.getItem(VIEW_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                groupBy: parsed.groupBy === 'flat' ? 'flat' : 'workspace',
                orderBy: parsed.orderBy === 'manual' ? 'manual' : 'updated',
                groupExpansion: parsed.groupExpansion && typeof parsed.groupExpansion === 'object'
                    ? parsed.groupExpansion
                    : {},
            };
        }
    }
    catch {
        // ignore
    }
    return { groupBy: 'workspace', orderBy: 'updated', groupExpansion: {} };
}
/** Persist a group-expansion change into the shared native store key. */
function writeGroupExpansion(key, expanded) {
    try {
        const state = readViewState();
        const next = { ...state.groupExpansion, [key]: expanded };
        localStorage.setItem(VIEW_KEY, JSON.stringify({ ...state, groupExpansion: next }));
    }
    catch {
        // ignore
    }
}
async function getArchived() {
    const res = await fetch(API + '/archived');
    if (!res.ok)
        throw new Error(tFallback('loadFailed'));
    const data = (await res.json());
    return { groups: data.groups ?? [], ungrouped: data.ungrouped ?? [] };
}
async function postAction(action, sessionId) {
    const res = await fetch(API + '/' + action, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId }),
    });
    if (!res.ok) {
        const data = (await res.json().catch(() => null));
        throw new Error(data?.error ?? tFallback('actionFailed'));
    }
}
async function renameSession(sessionId, title) {
    const res = await fetch(API + '/rename-session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId, title }),
    });
    if (!res.ok) {
        const data = (await res.json().catch(() => null));
        throw new Error(data?.error ?? tFallback('renameFailed'));
    }
}
/** Relative time label mirroring the native row time (now/minutes/hours/days). */
function timeAgo(ms, tr) {
    if (ms === null || ms === undefined)
        return '';
    const diff = Date.now() - ms;
    if (diff < 60000)
        return tr('justNow');
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60)
        return tr('minutesAgo', { n: minutes });
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return tr('hoursAgo', { n: hours });
    const days = Math.floor(hours / 24);
    return tr('daysAgo', { n: days });
}
function ContextMenu({ x, y, items, onPick, onClose, }) {
    return createPortal(_jsxs(_Fragment, { children: [_jsx("div", { className: "skin-menu-mask", onClick: onClose, onContextMenu: (e) => { e.preventDefault(); onClose(); } }), _jsx("div", { className: "skin-menu", style: { left: x, top: y }, role: "menu", children: items.map((item) => (_jsx("button", { type: "button", role: "menuitem", className: item.danger ? 'danger' : '', onClick: () => onPick(item.id), children: item.label }, item.id))) })] }), document.body);
}
function SessionRow({ item, busy, menuOpen, tr, onMenuOpen, onOpen, }) {
    return (_jsxs("div", { className: 'skin-archive-item' + (menuOpen ? ' menu-open' : ''), role: "treeitem", "aria-selected": false, onClick: () => onOpen(item.sessionId), children: [_jsx("span", { className: "skin-archive-title", title: item.title, children: item.title }), _jsx("span", { className: "skin-archive-time", children: timeAgo(item.updatedAt ?? item.createdAt, tr) }), _jsx("span", { className: "skin-archive-actions", children: _jsx("button", { type: "button", className: "skin-archive-more", "aria-label": tr('sessionActions'), disabled: busy === item.sessionId, onClick: (e) => {
                        e.stopPropagation();
                        onMenuOpen(e);
                    }, children: _jsx(IconEllipsisOutline16, {}) }) })] }));
}
export function ArchiveView({ t, onClose, onOpenSession, }) {
    /** Translate function with placeholder support — uses DSH t if available, fallback otherwise. */
    const tr = (key, vars) => {
        const template = t?.(key) ?? tFallback(key);
        return vars ? formatText(template, vars) : template;
    };
    const [data, setData] = useState({ groups: [], ungrouped: [] });
    const [busy, setBusy] = useState(null);
    const [error, setError] = useState(null);
    const [view, setView] = useState(readViewState);
    const [menu, setMenu] = useState(null);
    // Native-style rename dialog state (mirrors the workspace browser's
    // session-rename Modal: autofocus+select-all, IME composition guard,
    // Enter to confirm, Escape/mask to close, inline error).
    const [renameTarget, setRenameTarget] = useState(null);
    const [renameDraft, setRenameDraft] = useState('');
    const [renaming, setRenaming] = useState(false);
    const [renameError, setRenameError] = useState(null);
    const composingRef = useRef(false);
    // Native-style delete confirmation (mirrors the workspace-browser
    // delete Modal: description of consequences, danger action in the
    // footer, pending status while in flight, inline error).
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const closeDelete = () => {
        if (deleting)
            return;
        setDeleteTarget(null);
        setDeleteError(null);
    };
    const confirmDelete = async () => {
        if (deleting || deleteTarget === null)
            return;
        setDeleting(true);
        setDeleteError(null);
        try {
            await postAction('delete-session', deleteTarget.sessionId);
            setDeleting(false);
            setDeleteTarget(null);
            await refresh();
        }
        catch (reason) {
            setDeleting(false);
            setDeleteError(reason instanceof Error ? reason.message : String(reason));
        }
    };
    // Keyboard access: while the delete confirmation is open, Enter confirms
    // the danger action (mirroring how the rename input uses Enter). The Modal
    // already handles Escape→onClose, so only the confirm key is added here.
    useEffect(() => {
        if (deleteTarget === null)
            return;
        const onKeyDown = (e) => {
            if (e.key !== 'Enter')
                return;
            e.preventDefault();
            void confirmDelete();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [deleteTarget, deleting]);
    const renameTrimmed = renameDraft.trim();
    const renameBlocked = renaming || renameTrimmed === '' || renameTarget === null;
    const closeRename = () => {
        if (renaming)
            return;
        setRenameTarget(null);
        setRenameError(null);
    };
    const confirmRename = async () => {
        if (renameBlocked || renameTarget === null)
            return;
        setRenaming(true);
        setRenameError(null);
        try {
            await renameSession(renameTarget.sessionId, renameTrimmed);
            setRenaming(false);
            setRenameTarget(null);
            await refresh();
        }
        catch (reason) {
            setRenaming(false);
            setRenameError(reason instanceof Error ? reason.message : String(reason));
        }
    };
    const [expanded, setExpanded] = useState(() => readViewState().groupExpansion);
    // Mirror the native view-options button: poll the shared persisted store key.
    useEffect(() => {
        const timer = window.setInterval(() => {
            const next = readViewState();
            setView((prev) => prev.groupBy === next.groupBy && prev.orderBy === next.orderBy ? prev : next);
            setExpanded((prev) => {
                for (const key of Object.keys(next.groupExpansion)) {
                    if (prev[key] !== next.groupExpansion[key])
                        return { ...next.groupExpansion };
                }
                return prev;
            });
        }, 400);
        return () => window.clearInterval(timer);
    }, []);
    const refresh = useCallback(async () => {
        try {
            setData(await getArchived());
            setError(null);
        }
        catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, []);
    useEffect(() => {
        void refresh();
    }, [refresh]);
    const act = async (action, item) => {
        setBusy(item.sessionId);
        setError(null);
        try {
            await postAction(action, item.sessionId);
            setMenu(null);
            await refresh();
        }
        catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
        finally {
            setBusy(null);
        }
    };
    const handleRename = (item) => {
        setMenu(null);
        setRenameTarget({ sessionId: item.sessionId, title: item.title });
        setRenameDraft(item.title);
        setRenameError(null);
    };
    const handleDelete = (item) => {
        setMenu(null);
        setDeleteTarget(item);
        setDeleteError(null);
    };
    const sortSessions = (sessions) => view.orderBy === 'updated'
        ? [...sessions].sort((a, b) => (b.updatedAt ?? b.createdAt ?? 0) - (a.updatedAt ?? a.createdAt ?? 0))
        : sessions;
    const total = data.groups.reduce((n, g) => n + g.sessions.length, 0) + data.ungrouped.length;
    const flat = view.groupBy === 'flat'
        ? sortSessions([...data.groups.flatMap((g) => g.sessions), ...data.ungrouped])
        : null;
    const openMenu = (e, item) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMenu({ item, x: Math.max(8, Math.min(rect.right - 140, window.innerWidth - 148)), y: rect.bottom + 4 });
    };
    const onMenuPick = (id) => {
        if (!menu)
            return;
        if (id === 'rename')
            handleRename(menu.item);
        else if (id === 'unarchive')
            void act('unarchive', menu.item);
        else if (id === 'delete')
            handleDelete(menu.item);
    };
    return (_jsxs("div", { className: "skin-archive", onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: [error && _jsx("div", { className: "skin-archive-error", children: error }), _jsxs("div", { className: "skin-archive-list", children: [total === 0 && _jsx("div", { className: "skin-archive-empty", children: tr('noArchivedSessions') }), flat !== null &&
                        flat.map((item) => (_jsx(SessionRow, { item: item, busy: busy, tr: tr, menuOpen: menu?.item.sessionId === item.sessionId, onMenuOpen: (e) => openMenu(e, item), onOpen: onOpenSession ?? NOOP }, item.sessionId))), flat === null &&
                        data.groups.map((group) => {
                            const isExpanded = expanded[group.workspaceId] !== false;
                            return (_jsxs("div", { className: "skin-archive-group", children: [_jsxs("div", { className: "skin-archive-group-title", role: "treeitem", "aria-expanded": isExpanded, onClick: () => {
                                            const next = !isExpanded;
                                            setExpanded((prev) => ({ ...prev, [group.workspaceId]: next }));
                                            writeGroupExpansion(group.workspaceId, next);
                                        }, children: [_jsx("span", { className: 'skin-archive-folder' + (isExpanded ? ' open' : ''), children: isExpanded ? _jsx(IconFolderOpen16, {}) : _jsx(IconFolderClose16, {}) }), _jsx("span", { className: "skin-archive-chevron", children: _jsx("span", { className: 'skin-archive-arrow' + (isExpanded ? ' open' : ''), children: _jsx(IconTriangleRightFill14, {}) }) }), _jsx("span", { className: "skin-archive-project", children: _jsx("span", { className: "skin-archive-title", children: group.title }) })] }), isExpanded &&
                                        sortSessions(group.sessions).map((item) => (_jsx(SessionRow, { item: item, busy: busy, tr: tr, menuOpen: menu?.item.sessionId === item.sessionId, onMenuOpen: (e) => openMenu(e, item), onOpen: onOpenSession ?? NOOP }, item.sessionId)))] }, group.workspaceId));
                        }), flat === null &&
                        data.ungrouped.length > 0 && (_jsxs("div", { className: "skin-archive-group", children: [_jsxs("div", { className: "skin-archive-group-title", role: "treeitem", "aria-expanded": true, children: [_jsx("span", { className: "skin-archive-folder open", children: _jsx(IconFolderOpen16, {}) }), _jsx("span", { className: "skin-archive-chevron", children: _jsx("span", { className: "skin-archive-arrow open", children: _jsx(IconTriangleRightFill14, {}) }) }), _jsx("span", { className: "skin-archive-project", children: _jsx("span", { className: "skin-archive-title", children: tr('ungrouped') }) })] }), sortSessions(data.ungrouped).map((item) => (_jsx(SessionRow, { item: item, busy: busy, tr: tr, menuOpen: menu?.item.sessionId === item.sessionId, onMenuOpen: (e) => openMenu(e, item), onOpen: onOpenSession ?? NOOP }, item.sessionId)))] }))] }), menu && (_jsx(ContextMenu, { x: menu.x, y: menu.y, items: [
                    { id: 'rename', label: tr('rename') },
                    { id: 'unarchive', label: tr('restoreSession') },
                    { id: 'delete', label: tr('deleteSession'), danger: true },
                ], onPick: onMenuPick, onClose: () => setMenu(null) })), _jsxs(Modal, { open: renameTarget !== null, onClose: closeRename, closeLabel: tr('close'), title: tr('renameSession'), footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", disabled: renaming, onClick: closeRename, children: tr('cancel') }), _jsx(Button, { variant: "primary", disabled: renameBlocked, onClick: confirmRename, children: tr('confirmRename') })] }), children: [_jsx("input", { className: "skin-rename-input", value: renameDraft, "aria-label": tr('sessionName'), autoFocus: true, disabled: renaming, onFocus: (e) => {
                            e.target.select();
                        }, onChange: (e) => {
                            setRenameDraft(e.target.value);
                            setRenameError(null);
                        }, onCompositionStart: () => {
                            composingRef.current = true;
                        }, onCompositionEnd: () => {
                            composingRef.current = false;
                        }, onKeyDown: (e) => {
                            if (e.key === 'Enter' && !composingRef.current) {
                                e.preventDefault();
                                confirmRename();
                            }
                        } }), renameError !== null && (_jsx("div", { className: "skin-rename-error", role: "alert", children: renameError }))] }), _jsxs(Modal, { open: deleteTarget !== null, onClose: closeDelete, closeLabel: tr('close'), title: tr('deleteSessionTitle'), description: deleteTarget !== null
                    ? tr('deleteDescription', { title: deleteTarget.title })
                    : undefined, footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", disabled: deleting, onClick: closeDelete, children: tr('cancel') }), _jsx(Button, { variant: "outline", className: "skin-delete-action", disabled: deleting, onClick: confirmDelete, children: tr('confirmDelete') })] }), children: [deleting && (_jsx("div", { className: "skin-delete-status", role: "status", children: tr('deleting') })), deleteError !== null && (_jsx("div", { className: "skin-rename-error", role: "alert", children: deleteError }))] })] }));
}
