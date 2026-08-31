import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const STYLES = {
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        borderRadius: '999px',
        border: 'none',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '17px',
        color: 'var(--dsw-alias-text-2, rgba(0,0,0,0.6))',
        background: 'transparent',
        whiteSpace: 'nowrap',
        cursor: 'default',
        // userSelect omitted — text should be selectable for copy
    },
    icon: {
        width: '14px',
        height: '14px',
        opacity: 0.6,
    },
};
export function SessionIdBadge(props) {
    const sessionId = props.sessionId;
    if (!sessionId)
        return null;
    // Show full session ID for easy copy
    return (_jsxs("span", { style: STYLES.badge, title: sessionId, children: [_jsx("svg", { style: STYLES.icon, viewBox: "0 0 16 16", fill: "none", children: _jsx("path", { fill: "currentColor", d: "M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm3 3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Z" }) }), sessionId] }));
}
