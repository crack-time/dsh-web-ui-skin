import type { Context as ClientContext } from '@deepseek-ai/cordis';
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
    getLocale(): {
        active: string;
    };
    subscribe(fn: () => void): () => void;
};
declare module '@deepseek-ai/cordis' {
    interface Context {
        locale?: LocaleRuntime;
    }
}
/** Client-side service inject declaration. */
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
