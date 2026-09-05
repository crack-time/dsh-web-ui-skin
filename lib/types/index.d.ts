import type { Context } from '@deepseek-ai/cordis';
/** Required services: the web route registry, the workspace registry, session persistence, its projection cache. */
declare const inject: string[];
declare function apply(ctx: Context): void;
export { apply, inject };
