/**
 * Locale dictionary for the Archive plugin.
 *
 * Separated from components so i18n data and UI code stay independent:
 * locale changes never touch the component, and the dictionary can be
 * consumed by tests or other seats without pulling React in.
 */

export const ARCHIVE_LOCALE = {
    zh: {
        // Sidebar archive button tooltip
        archiveSessions: '归档会话',
        workspaceSessions: '工作区会话',
        // Session row aria label
        sessionActions: '会话操作',
        // Empty state
        noArchivedSessions: '暂无归档会话',
        ungrouped: '未分组',
        // Context menu items
        rename: '重命名',
        restoreSession: '还原会话',
        deleteSession: '删除会话',
        // Rename modal
        close: '关闭',
        renameSession: '重命名会话',
        cancel: '取消',
        confirmRename: '重命名',
        sessionName: '会话名称',
        // Delete modal
        deleteSessionTitle: '删除会话',
        deleteDescription: '将删除「{title}」，会话日志将被移除，此操作不可恢复。',
        deleting: '正在删除会话…',
        confirmDelete: '删除会话',
        // Error messages
        loadFailed: '加载归档列表失败',
        actionFailed: '操作失败',
        renameFailed: '重命名失败',
        // Time labels
        justNow: '刚刚',
        minutesAgo: '{n} 分钟前',
        hoursAgo: '{n} 小时前',
        daysAgo: '{n} 天前',
    },
    en: {
        // Sidebar archive button tooltip
        archiveSessions: 'Archived sessions',
        workspaceSessions: 'Workspace sessions',
        // Session row aria label
        sessionActions: 'Session actions',
        // Empty state
        noArchivedSessions: 'No archived sessions',
        ungrouped: 'Ungrouped',
        // Context menu items
        rename: 'Rename',
        restoreSession: 'Restore session',
        deleteSession: 'Delete session',
        // Rename modal
        close: 'Close',
        renameSession: 'Rename session',
        cancel: 'Cancel',
        confirmRename: 'Rename',
        sessionName: 'Session name',
        // Delete modal
        deleteSessionTitle: 'Delete session',
        deleteDescription: '「{title}」will be deleted. Session logs will be removed. This action cannot be undone.',
        deleting: 'Deleting session…',
        confirmDelete: 'Delete session',
        // Error messages
        loadFailed: 'Failed to load archived sessions',
        actionFailed: 'Action failed',
        renameFailed: 'Rename failed',
        // Time labels
        justNow: 'just now',
        minutesAgo: '{n} min ago',
        hoursAgo: '{n} hr ago',
        daysAgo: '{n} d ago',
    },
};

export type ArchiveTextKey = keyof typeof ARCHIVE_LOCALE.zh;

/**
 * Simple placeholder replacement for the `{key}` syntax used in locale values.
 * Example: `'{n} min ago'.replace('{n}', '5')` → `'5 min ago'`.
 */
export function formatText(template: string, vars: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, key: string) =>
        key in vars ? String(vars[key]) : `{${key}}`,
    );
}
