export interface ArchivedItem {
    sessionId: string;
    /** Native displayTitle fallback chain: durable title → cwd basename → id prefix. */
    title: string;
    /** Epoch-millis creation timestamp (host header.createdAt). */
    createdAt: number | null;
    /** Last prompt time (activity) for the native 'updated' ordering; falls back to createdAt. */
    updatedAt: number | null;
}
export interface ArchivedGroup {
    workspaceId: string;
    title: string;
    sessions: ArchivedItem[];
}
export interface ArchivedData {
    groups: ArchivedGroup[];
    ungrouped: ArchivedItem[];
}
export declare function ArchiveView({ t, onClose, onOpenSession, }: {
    t?: (key: string) => string;
    onClose: () => void;
    onOpenSession?: (sessionId: string) => void;
}): React.ReactElement;
