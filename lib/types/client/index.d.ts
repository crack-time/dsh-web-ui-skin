import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
/**
 * Resolved skin settings, read from the host /api/config endpoint and
 * refreshed on every `settings/document-updated` wire event, so dsh rc.7's
 * "skin" settings card edits apply live (no page reload).
 */
/** Client-side service inject declaration — the services this plugin reads
 * through ctx (locale, slots, remote). This is the runtime declaration the
 * ModuleLoader wires; package.json dsh.client.inject is the loader's graph
 * metadata / access guard and lists provider module names — the two lists are
 * different things and are intentionally not identical. */
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
