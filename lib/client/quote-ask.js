/**
 * "Ask about selection" feature for the Pastoral Cottage skin.
 *
 * Interaction mirrors ChatGPT's "Ask ChatGPT": select a fragment of an
 * assistant reply -> a floating native-styled button appears -> click to
 * open a native Modal showing the quoted selection plus a question input ->
 * confirm writes "<blockquote> + question" into the composer draft (no
 * auto-send; user reviews and presses Enter). UI is built entirely from
 * @deepseek-ai/dsh-client-ui-primitives so it matches the native DSH look
 * across light/dark/system themes and the skin's glass theme.
 */
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Modal, ReadBlock } from '@deepseek-ai/dsh-client-ui-primitives';
/** Hard caps to keep drafts and previews sane. */
const MAX_QUOTE_CHARS = 4000;
const MAX_QUESTION_CHARS = 2000;
const PREVIEW_MAX_LINES = 12;
/** SVG icon for the floating trigger (speech bubble with a quotation mark). */
const QUOTE_ICON = createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true }, createElement('path', {
    fill: 'currentColor',
    d: 'M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6.414l-2.707 2.707A1 1 0 0 1 2 13.414V3Zm4.5 5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0 0 1Zm-1-2.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0 0 1Z',
}));
/** Split text into numbered lines for ReadBlock preview. */
function toPreviewLines(text) {
    return text.split('\n').map((t, i) => ({ number: i + 1, text: t }));
}
/** Wrap the quoted text in 「」 delimiters for visual cohesion in the textarea.
 *  The model understands 「...」 as quoted/reference content. */
function toBlockquote(text) {
    const trimmed = text.length > MAX_QUOTE_CHARS
        ? text.slice(0, MAX_QUOTE_CHARS) + '\n…'
        : text;
    return '「' + trimmed.replace(/\n/g, '\n') + '」';
}
/** Dialog body: quoted preview + question textarea + action buttons.
 *  The textarea DOM element is stored in the outer closure (questionEl) so
 *  we can read its live .value at submit time regardless of React re-renders. */
function QuoteAskDialog(props) {
    const { selectedText, open, onMountTextarea, onClose, onSubmit } = props;
    const handleSubmit = () => {
        // Read live value from the DOM element captured by onMountTextarea.
        // This survives React re-renders because the element reference lives
        // in the outer closure, not in component-local state.
        onSubmit();
    };
    return createElement(Modal, {
        open,
        onClose,
        title: '追问选中内容',
        closeLabel: '关闭',
        description: '选中的片段将作为引用附在问题前，一起填入输入框。',
        footer: createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 8 } }, createElement(Button, { variant: 'ghost', onClick: onClose }, '取消'), createElement(Button, { variant: 'primary', onClick: handleSubmit }, '确定')),
    }, createElement(ReadBlock, {
        lines: toPreviewLines(selectedText),
        totalLines: selectedText.split('\n').length,
        maxLines: PREVIEW_MAX_LINES,
        className: 'skin-quote-preview',
    }), createElement('textarea', {
        ref: onMountTextarea,
        placeholder: '关于这段内容，你想问什么？',
        maxLength: MAX_QUESTION_CHARS,
        rows: 3,
        style: {
            marginTop: 12,
            width: '100%',
            boxSizing: 'border-box',
            padding: '8px 12px',
            borderRadius: 'var(--dsw-radius-md, 6px)',
            border: '1px solid var(--dsw-border-default, #ccc)',
            background: 'var(--dsw-bg-input, transparent)',
            color: 'var(--dsw-fg-default, inherit)',
            fontFamily: 'inherit',
            fontSize: '14px',
            lineHeight: '20px',
            resize: 'vertical',
            outline: 'none',
        },
    }));
}
/**
 * Register the "ask about selection" affordance. Call once from the skin's
 * apply(); wires up a global selection listener, the floating trigger button,
 * and the modal root, all disposed via the returned disposer.
 */
export function registerQuoteAsk(ctx) {
    let triggerBtn = null;
    let dialogRoot = null;
    let dialogHost = null;
    let pendingText = '';
    let questionEl = null;
    /** Resolve current session id via rc.8 sessions.selection store. */
    function currentSessionId() {
        try {
            const sessions = ctx.sessions;
            if (!sessions)
                return undefined;
            const selSnap = sessions.selection?.getSnapshot?.();
            if (selSnap?.sessionId)
                return selSnap.sessionId;
            return undefined;
        }
        catch (e) {
            console.error('[quote-ask] currentSessionId failed:', e);
            return undefined;
        }
    }
    /** Resolve the composer shell for the given session. */
    function shellFor(sessionId) {
        try {
            const viaGet = ctx.get?.('conversation');
            const shell = viaGet?.input?.shell?.(sessionId);
            if (shell)
                return shell;
            const viaProp = ctx.conversation;
            return viaProp?.input?.shell?.(sessionId);
        }
        catch (e) {
            console.error('[quote-ask] shellFor failed:', e);
            return undefined;
        }
    }
    function hideTrigger() {
        if (triggerBtn) {
            triggerBtn.remove();
            triggerBtn = null;
        }
    }
    function closeDialog() {
        if (dialogRoot) {
            dialogRoot.unmount();
            dialogRoot = null;
        }
        if (dialogHost) {
            dialogHost.remove();
            dialogHost = null;
        }
        pendingText = '';
        questionEl = null;
    }
    /** Submit: append blockquote + question to the composer draft and focus. */
    function submitQuestion(question) {
        const sid = currentSessionId();
        if (!sid) {
            console.error('[quote-ask] submit aborted: no session id');
            closeDialog();
            return;
        }
        const shell = shellFor(sid);
        if (!shell?.state?.getSnapshot || !shell.setDraft) {
            console.error('[quote-ask] submit aborted: shell unavailable', { sid });
            closeDialog();
            return;
        }
        const current = shell.state.getSnapshot().draft ?? '';
        const quote = toBlockquote(pendingText.slice(0, MAX_QUOTE_CHARS));
        const sep = current.length > 0 ? '\n\n' : '';
        const newDraft = current + sep + quote + '\n\n' + question;
        console.log('[quote-ask] setDraft:', { sid, draftLen: newDraft.length });
        shell.setDraft(newDraft);
        const ta = document.querySelector('.uV2eYG_input');
        if (ta) {
            ta.focus();
            try {
                ta.setSelectionRange(ta.value.length, ta.value.length);
            }
            catch { }
        }
        closeDialog();
    }
    function showTrigger(rect) {
        hideTrigger();
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.skinQuoteAsk = '';
        btn.setAttribute('aria-label', '追问选中内容');
        Object.assign(btn.style, {
            position: 'fixed',
            left: Math.min(window.innerWidth - 48, Math.max(8, rect.right + 4)) + 'px',
            top: Math.min(window.innerHeight - 40, Math.max(8, rect.bottom + 4)) + 'px',
            zIndex: '10000',
            padding: '4px 10px',
            borderRadius: 'var(--dsw-radius-md, 6px)',
            border: '1px solid var(--dsw-border-default, rgba(0,0,0,0.12))',
            background: 'var(--dsw-bg-subtle, rgba(0,0,0,0.04))',
            color: 'var(--dsw-fg-default, inherit)',
            cursor: 'pointer',
            fontSize: '13px',
            lineHeight: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: 'var(--dsw-shadow-sm, 0 1px 2px rgba(0,0,0,0.08))',
        });
        btn.textContent = '追问';
        btn.onclick = () => {
            const sel = window.getSelection();
            const text = (sel?.toString() ?? '').trim();
            if (!text)
                return;
            pendingText = text;
            if (!dialogHost) {
                dialogHost = document.createElement('div');
                dialogHost.dataset.skinQuoteAskDialog = '';
                document.body.appendChild(dialogHost);
                dialogRoot = createRoot(dialogHost);
            }
            questionEl = null;
            const mountTextarea = (el) => {
                questionEl = el;
                if (el)
                    requestAnimationFrame(() => el.focus());
            };
            const doSubmit = () => {
                const q = (questionEl?.value ?? '').trim().slice(0, MAX_QUESTION_CHARS);
                if (q)
                    submitQuestion(q);
            };
            dialogRoot?.render(createElement(QuoteAskDialog, {
                selectedText: pendingText,
                open: true,
                onMountTextarea: mountTextarea,
                onClose: closeDialog,
                onSubmit: doSubmit,
            }));
        };
        document.body.appendChild(btn);
        triggerBtn = btn;
    }
    function evaluateSelection() {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
            hideTrigger();
            return;
        }
        const text = (sel.toString() ?? '').trim();
        if (!text) {
            hideTrigger();
            return;
        }
        const anchor = sel.anchorNode;
        if (!anchor) {
            hideTrigger();
            return;
        }
        const anchorEl = (anchor.nodeType === Node.TEXT_NODE ? anchor.parentElement : anchor);
        if (!anchorEl) {
            hideTrigger();
            return;
        }
        const inFlow = !!anchorEl.closest('.Md3f7G_flowItem, .gdEzaW_bubble');
        const inComposer = !!anchorEl.closest('[data-composer-seat], .uV2eYG_input, .uV2eYG_root');
        if (!inFlow || inComposer) {
            hideTrigger();
            return;
        }
        try {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) {
                hideTrigger();
                return;
            }
            showTrigger(rect);
        }
        catch {
            hideTrigger();
        }
    }
    const onSelectionChange = () => evaluateSelection();
    const onMouseUp = () => requestAnimationFrame(evaluateSelection);
    document.addEventListener('selectionchange', onSelectionChange);
    document.addEventListener('mouseup', onMouseUp);
    ctx.effect(() => () => {
        document.removeEventListener('selectionchange', onSelectionChange);
        document.removeEventListener('mouseup', onMouseUp);
        hideTrigger();
        closeDialog();
    }, 'dsh-web-ui-skin: quote-ask');
}
