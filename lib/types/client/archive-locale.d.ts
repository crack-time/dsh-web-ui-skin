/**
 * Locale dictionary for the Archive plugin.
 *
 * Separated from components so i18n data and UI code stay independent:
 * locale changes never touch the component, and the dictionary can be
 * consumed by tests or other seats without pulling React in.
 */
export declare const ARCHIVE_LOCALE: {
    zh: {
        archiveSessions: string;
        workspaceSessions: string;
        sessionActions: string;
        noArchivedSessions: string;
        ungrouped: string;
        rename: string;
        restoreSession: string;
        deleteSession: string;
        close: string;
        renameSession: string;
        cancel: string;
        confirmRename: string;
        sessionName: string;
        deleteSessionTitle: string;
        deleteDescription: string;
        deleting: string;
        confirmDelete: string;
        loadFailed: string;
        actionFailed: string;
        renameFailed: string;
        justNow: string;
        minutesAgo: string;
        hoursAgo: string;
        daysAgo: string;
    };
    en: {
        archiveSessions: string;
        workspaceSessions: string;
        sessionActions: string;
        noArchivedSessions: string;
        ungrouped: string;
        rename: string;
        restoreSession: string;
        deleteSession: string;
        close: string;
        renameSession: string;
        cancel: string;
        confirmRename: string;
        sessionName: string;
        deleteSessionTitle: string;
        deleteDescription: string;
        deleting: string;
        confirmDelete: string;
        loadFailed: string;
        actionFailed: string;
        renameFailed: string;
        justNow: string;
        minutesAgo: string;
        hoursAgo: string;
        daysAgo: string;
    };
};
export type ArchiveTextKey = keyof typeof ARCHIVE_LOCALE.zh;
/**
 * Simple placeholder replacement for the `{key}` syntax used in locale values.
 * Example: `'{n} min ago'.replace('{n}', '5')` → `'5 min ago'`.
 */
export declare function formatText(template: string, vars: Record<string, string | number>): string;
