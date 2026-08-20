import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
/**
 * Register the "ask about selection" affordance. Call once from the skin's
 * apply(); wires up a global selection listener, the floating trigger button,
 * and the modal root, all disposed via the returned disposer.
 */
export declare function registerQuoteAsk(ctx: ClientContext): void;
