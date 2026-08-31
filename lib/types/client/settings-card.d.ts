import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
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
    wallpaperUrl: string;
    archiveButton: boolean;
}
export declare const SKIN_DEFAULTS: SkinSettings;
/** Snapshot the card renders from; `loaded` flips once the first read landed. */
export type SkinCardState = SkinSettings & {
    loaded: boolean;
};
/** Host endpoint for the URL field's settings read/write. */
export declare const SKIN_CONFIG_URL = "/plugins/@crack/dsh-web-ui-skin/api/config";
/** Tiny uSES-compatible snapshot store; the slot system exposes `hooks.*` as `use*`. */
export declare function createSkinCardStore(): {
    getSnapshot: () => SkinCardState;
    set(next: SkinCardState): void;
    subscribe(listener: () => void): () => void;
};
/** Locale dictionary for the card (title / description / labels / hints). */
export declare const SKIN_CARD_LOCALE: {
    readonly zh: {
        readonly title: '壁纸';
        readonly description: '壁纸设置';
        readonly wallpaperUrl: '自定义壁纸 URL';
        readonly wallpaperUrlHint: '留空使用内置壁纸';
        readonly pick: '选择本机图片…';
        readonly removeLocal: '移除本机图片';
        readonly picked: '当前使用本机图片：';
        readonly unsupported: '当前浏览器不支持本机图片选择（仅 Chrome/Edge）';
        readonly save: '保存';
        readonly saving: '保存中…';
        readonly discard: '放弃修改';
        readonly unsaved: '未保存';
        readonly expand: '展开';
        readonly collapse: '折叠';
        readonly saveFailed: '保存失败，请重试';
    };
    readonly en: {
        readonly title: 'Wallpaper';
        readonly description: 'Wallpaper settings';
        readonly wallpaperUrl: 'Custom wallpaper URL';
        readonly wallpaperUrlHint: 'Leave empty for the bundled wallpaper';
        readonly pick: 'Choose local image…';
        readonly removeLocal: 'Remove local image';
        readonly picked: 'Using local image: ';
        readonly unsupported: 'Local image picking needs Chrome/Edge';
        readonly save: 'Save';
        readonly saving: 'Saving…';
        readonly discard: 'Discard';
        readonly unsaved: 'Unsaved';
        readonly expand: 'Expand';
        readonly collapse: 'Collapse';
        readonly saveFailed: 'Save failed, please retry';
    };
};
export type SkinCardProps = {
    t: (key: string) => string;
    useSkinCard: <T>(select: (state: SkinCardState) => T) => T;
    applyPatch: (patch: Partial<SkinSettings>) => Promise<{
        ok: boolean;
        error?: string;
    }>;
};
/** The settings-dialog card for the skin namespace (slot key 'skin'). */
export declare function SkinSettingsCard(props: SkinCardProps): import("react").JSX.Element | null;
/**
 * Register the card into the settings dialog:
 *  - locale dictionary under a namespace we own;
 *  - one `settings.plugin.item` slot entry keyed by the 'skin' namespace.
 * The dialog dispatches it only while the host serves that namespace, so our
 * own registration stays invisible if the settings service is absent.
 */
export declare function installSkinSettingsCard(ctx: ClientContext, store: ReturnType<typeof createSkinCardStore>): void;
