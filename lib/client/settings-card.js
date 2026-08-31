import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives';
import { clearPicked, currentPicked, pickAndSet, subscribePicked, supportsLocalPick, } from './local-wallpaper.js';
export const SKIN_DEFAULTS = {
    wallpaperUrl: '',
    archiveButton: true,
};
/** Host endpoint for the URL field's settings read/write. */
export const SKIN_CONFIG_URL = '/plugins/@crack/dsh-web-ui-skin/api/config';
/** Tiny uSES-compatible snapshot store; the slot system exposes `hooks.*` as `use*`. */
export function createSkinCardStore() {
    let state = { ...SKIN_DEFAULTS, loaded: false };
    const listeners = new Set();
    return {
        getSnapshot: () => state,
        set(next) {
            state = next;
            listeners.forEach((listener) => listener());
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
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
};
const cn = (...classes) => classes.filter(Boolean).join(' ');
/** The settings-dialog card for the skin namespace (slot key 'skin'). */
export function SkinSettingsCard(props) {
    const { t, useSkinCard, applyPatch } = props;
    const snapshot = useSkinCard((state) => state);
    const available = snapshot.loaded;
    const [open, setOpen] = useState(false);
    const [wallpaper, setWallpaper] = useState(SKIN_DEFAULTS.wallpaperUrl);
    const [saving, setSaving] = useState(false);
    const [failed, setFailed] = useState(false);
    const server = snapshot.wallpaperUrl ?? SKIN_DEFAULTS.wallpaperUrl;
    const dirty = wallpaper.trim() !== server;
    // Sync the staged form to fresh server snapshots, but never clobber an
    // in-progress edit (dirty): server pushes are ignored while the user types.
    useEffect(() => {
        if (dirty)
            return;
        setWallpaper(server);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snapshot]);
    if (!available)
        return null;
    async function commit() {
        setSaving(true);
        setFailed(false);
        try {
            const outcome = await applyPatch({ wallpaperUrl: wallpaper.trim() });
            if (!outcome.ok)
                setFailed(true);
        }
        catch {
            setFailed(true);
        }
        finally {
            setSaving(false);
        }
    }
    // Picked local wallpaper: the File System Access API opens the native file
    // dialog and hands us a HANDLE to the file in place — nothing is copied to
    // DSH. The handle is persisted (IndexedDB) by local-wallpaper.ts and the
    // skin applies it via the picked-change subscription.
    const [busy, setBusy] = useState(false);
    const [pickedName, setPickedName] = useState(null);
    useEffect(() => {
        const sync = () => setPickedName(currentPicked()?.name ?? null);
        sync();
        return subscribePicked(sync);
    }, []);
    const canPickLocally = supportsLocalPick();
    async function handlePick() {
        if (!canPickLocally)
            return;
        setBusy(true);
        setFailed(false);
        const ok = await pickAndSet();
        if (!ok)
            setFailed(true);
        setBusy(false);
    }
    async function handleClearLocal() {
        setBusy(true);
        setFailed(false);
        await clearPicked();
        setBusy(false);
    }
    const title = t('title');
    return (_jsxs("li", { "data-skin-settings": true, className: cn('skin-settings-card', open && 'skin-settings-card-open'), children: [_jsxs("button", { type: "button", className: "skin-settings-header", "aria-expanded": open, "aria-label": `${t(open ? 'collapse' : 'expand')}: ${title}`, onClick: () => setOpen(!open), children: [_jsxs("span", { className: "skin-settings-headText", children: [_jsx("span", { className: "skin-settings-name", children: title }), _jsx("span", { className: "skin-settings-description", children: t('description') })] }), dirty ? _jsx("span", { className: "skin-settings-pending", children: t('unsaved') }) : null, _jsx(IconChevronDownOutline14, { className: cn('skin-settings-chevron', open && 'skin-settings-chevron-open') })] }), open ? (_jsxs("div", { className: "skin-settings-body", children: [_jsxs("label", { className: "skin-settings-row", children: [_jsx("span", { className: "skin-settings-label", children: t('wallpaperUrl') }), _jsx("input", { type: "text", value: wallpaper, placeholder: "https://\u2026", spellCheck: false, onChange: (e) => setWallpaper(e.target.value) }), _jsxs("span", { className: "skin-settings-controls", children: [canPickLocally ? (_jsx("button", { type: "button", className: "skin-settings-pick", disabled: busy, onClick: () => {
                                            void handlePick();
                                        }, children: t('pick') })) : (_jsx("span", { className: "skin-settings-hint", children: t('unsupported') })), pickedName ? (_jsx("button", { type: "button", className: "skin-settings-pick", disabled: busy, onClick: () => {
                                            void handleClearLocal();
                                        }, children: t('removeLocal') })) : null] }), pickedName ? (_jsxs("span", { className: "skin-settings-hint", children: [t('picked'), pickedName] })) : null, _jsx("span", { className: "skin-settings-hint", children: t('wallpaperUrlHint') })] }), _jsxs("div", { className: "skin-settings-footer", children: [failed ? (_jsx("p", { className: "skin-settings-failed", role: "status", children: t('saveFailed') })) : null, _jsx("button", { type: "button", className: "skin-settings-discard", disabled: !dirty || saving, onClick: () => {
                                    setWallpaper(server);
                                    setFailed(false);
                                }, children: t('discard') }), _jsx("button", { type: "button", className: "skin-settings-save", disabled: !dirty || saving, onClick: () => {
                                    void commit();
                                }, children: saving ? t('saving') : t('save') })] })] })) : null] }));
}
/**
 * Register the card into the settings dialog:
 *  - locale dictionary under a namespace we own;
 *  - one `settings.plugin.item` slot entry keyed by the 'skin' namespace.
 * The dialog dispatches it only while the host serves that namespace, so our
 * own registration stays invisible if the settings service is absent.
 */
export function installSkinSettingsCard(ctx, store) {
    const dict = 'dsh-web-ui-skin';
    try {
        const locale = ctx.locale;
        locale?.register(dict, SKIN_CARD_LOCALE);
    }
    catch { }
    try {
        const slots = ctx.slots;
        slots?.inject('settings.plugin.item', function* () {
            yield slots.register({
                name: 'settings.plugin.item',
                key: 'skin',
                locale: dict,
                inject: () => ({
                    hooks: { skinCard: store },
                    applyPatch: async (patch) => {
                        try {
                            const res = await fetch(SKIN_CONFIG_URL, {
                                method: 'POST',
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({ patch }),
                            });
                            if (!res.ok) {
                                const text = await res.text();
                                return { ok: false, error: text.slice(0, 200) };
                            }
                            return { ok: true };
                        }
                        catch {
                            return { ok: false, error: 'network' };
                        }
                    },
                }),
            }, SkinSettingsCard);
        });
    }
    catch { }
}
