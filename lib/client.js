window.__ModuleLoader__.load({ id: "@crack/dsh-archive", factory: (require) => {
const css = "/* ============================================\n   田园小屋 (Pastoral Cottage) Skin\n   全屏壁纸背景\n   ============================================ */\n\n/* === 亮色版 === */\n\n/* ============================================\n   侧栏折叠按钮微调\n   ============================================ */\n/* 展开态：折叠按钮略左移，不贴右缘 */\n.hHd-Xa_logoRow > button:last-child {\n  margin-right: 7px;\n}\n\n/* 侧边栏归档入口按钮（添加工作区右侧） */\nbutton[data-skin-archive-btn] {\n  /* 与原生 iconButton 一致：28px 圆形、label-secondary、hover 同款背景 */\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  background: transparent;\n  border-radius: 50%;\n  color: var(--dsw-alias-label-secondary, #4a6a8c);\n  cursor: pointer;\n  flex: none;\n  transition: background 0.12s ease;\n}\nbutton[data-skin-archive-btn] svg {\n  display: block;\n}\nbutton[data-skin-archive-btn]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\nbutton[data-skin-archive-btn]:active {\n  transform: scale(0.92);\n}\n/* ============================================\n |  归档会话视图（archive view）\n |  原位覆盖工作区列表区域 · 布局与原生树一致\n |  ============================================ */\n/* 工具行解除 60px 宽度限制：第 4 个（归档）按钮不被裁剪，整体左移排列 */\n[class*=\"_headerActions\"] {\n  max-width: none !important;\n}\n/* 覆盖层容器：absolute 铺满树区域 */\n[data-skin-archive-view] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  z-index: 100;\n  /* 无背景：与工作区树区域一样直接透出壁纸 */\n  background: transparent;\n  overflow: hidden;\n}\n.skin-archive {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  min-height: 0;\n  color: #2b4259;\n}\n\n.skin-menu-mask {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483010;\n}\n.skin-menu {\n  position: fixed;\n  z-index: 2147483011;\n  min-width: 132px;\n  padding: 4px;\n  border-radius: 10px;\n  /* 与工作区三点菜单/@弹窗同一背景变量（--dsw-specific-menu = 不透明） */\n  background: var(--dsw-specific-menu, #ffffff);\n  border: 1px solid var(--dsw-alias-divider, rgba(90, 159, 212, 0.25));\n  box-shadow: 0 8px 24px rgba(46, 79, 108, 0.18);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n}\n.skin-menu button {\n  display: block;\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  color: var(--dsw-alias-label-primary, #2b4259);\n  font-size: 13px;\n  padding: 6px 10px;\n  border-radius: 7px;\n  cursor: pointer;\n}\n.skin-menu button:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(90, 159, 212, 0.12));\n}\n.skin-menu button.danger {\n  color: var(--dsw-alias-danger, #c05a5a);\n}\n.skin-menu button.danger:hover {\n  background: rgba(200, 90, 90, 0.1);\n}\n\n/* ============================================\n |  归档视图：精确对齐原生 Rows.module.css\n |  （行/分组行结构与原生一致：hover 背景、\n |   分组行 hover 文件夹→箭头、会话行 hover 时间隐藏）\n |  ============================================ */\n.skin-archive-error {\n  padding: 8px 10px;\n  font-size: 12px;\n  color: var(--dsw-alias-state-error-primary, #a05a5a);\n  background: rgba(200, 90, 90, 0.08);\n  border-bottom: 1px solid rgba(200, 90, 90, 0.15);\n  flex: none;\n}\n.skin-archive-list {\n  min-height: 0;\n  flex: 1;\n  overflow-y: auto;\n  padding: 0 4px 16px;\n}\n.skin-archive-group {\n  position: relative;\n}\n.skin-archive-group + .skin-archive-group {\n  margin-top: 4px;\n}\n.skin-archive-group > * + * {\n  margin-top: 2px;\n}\n.skin-archive-empty {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 16px 12px;\n  font-size: 13px;\n}\n/* 分组行：对齐原生 projectRow */\n.skin-archive-group-title {\n  box-sizing: border-box;\n  align-items: center;\n  height: 34px;\n  gap: 6px;\n  padding: 0 8px;\n  display: flex;\n  cursor: pointer;\n  user-select: none;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 8px;\n  transition: background 0.1s ease;\n}\n.skin-archive-group-title:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.skin-archive-folder {\n  width: 16px;\n  height: 20px;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  display: inline-flex;\n}\n/* 箭头：默认隐藏，hover 时显示并隐藏文件夹（同原生） */\n.skin-archive-chevron {\n  width: 16px;\n  height: 20px;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  display: none;\n}\n.skin-archive-group-title:hover .skin-archive-chevron {\n  display: inline-flex;\n}\n.skin-archive-group-title:hover .skin-archive-folder {\n  display: none;\n}\n.skin-archive-arrow {\n  display: inline-flex;\n  transform: rotate(0deg);\n  transition: transform 0.15s var(--ds-ease-in-out, ease);\n}\n.skin-archive-arrow.open {\n  transform: rotate(90deg);\n}\n.skin-archive-project {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  font-size: 14px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.skin-archive-group-title .skin-archive-title {\n  margin: 0;\n}\n/* 会话行：对齐原生 sessionRow */\n.skin-archive-item {\n  cursor: pointer;\n  user-select: none;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 8px;\n  align-items: center;\n  gap: 0;\n  padding: 0 8px;\n  display: flex;\n  height: 32px;\n  animation: skin-row-in 0.15s var(--ds-ease-in-out, ease);\n}\n@keyframes skin-row-in {\n  from {\n    opacity: 0;\n  }\n}\n.skin-archive-item:hover,\n.skin-archive-item.menu-open {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.skin-archive-item .skin-archive-title {\n  flex: 1;\n  margin: 0 6px 0 4px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  font-size: 14px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.skin-archive-item .skin-archive-time {\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  font-size: 12px;\n  line-height: 20px;\n  white-space: nowrap;\n}\n.skin-archive-item .skin-archive-actions {\n  flex: none;\n  align-items: center;\n  gap: 12px;\n  display: none;\n}\n.skin-archive-item:hover .skin-archive-actions,\n.skin-archive-item.menu-open .skin-archive-actions {\n  display: inline-flex;\n}\n/* hover 时时间隐藏（同原生） */\n.skin-archive-item:hover .skin-archive-time,\n.skin-archive-item.menu-open .skin-archive-time {\n  display: none;\n}\n.skin-archive-more {\n  border: none;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #4a6a8c);\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex: none;\n}\n.skin-archive-more:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(90, 159, 212, 0.18));\n}\n.skin-archive-more:disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n\n/* 归档按钮气泡（fixed 于 body，同原生 Tooltip 机制） */\n.skin-archive-tip {\n  position: fixed;\n  transform: translateX(-50%);\n  background: var(--dsw-alias-tooltip-bg, #1f2937);\n  color: var(--dsw-static-blank-0, #ffffff);\n  font-size: 12px;\n  line-height: 16px;\n  padding: 4px 8px;\n  border-radius: 6px;\n  white-space: nowrap;\n  z-index: 2147483011;\n  pointer-events: none;\n}\n\n/* 重命名对话框输入框（复刻原生 qDHVXG_renameInput 规则，弹窗壳体用原生 Modal） */\n.skin-rename-input {\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  width: 100%;\n  height: 44px;\n  color: var(--dsw-alias-label-primary);\n  background: 0 0;\n  border-radius: 22px;\n  outline: none;\n  padding: 7px 14px;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 22px;\n}\n.skin-rename-input:disabled {\n  color: var(--dsw-alias-label-dimmed);\n}\n.skin-rename-error {\n  color: var(--dsw-alias-state-error-primary);\n  margin-top: 8px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n/* 删除确认弹窗（复刻原生 qDHVXG_deleteAction / qDHVXG_deleteStatus 规则） */\n.skin-delete-action:not(:disabled) {\n  color: var(--dsw-alias-state-error-primary);\n}\n.skin-delete-status {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n}";

const tagId = "@crack/dsh-archive/skin.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@crack/dsh-archive";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}

var module = { exports: {} }; var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let react = require("react");
let react_dom_client = require("react-dom/client");
let react_jsx_runtime = require("react/jsx-runtime");
let react_dom = require("react-dom");
let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

//#region lib/client/archive.js
/**
* Archive view for the Pastoral Cottage skin.
*
* Mounted IN PLACE over the workspace tree region by src/client/index.ts.
* Everything is reused from the native workspace browser:
*  - the toolbar (incl. the view-options button) stays visible and live; the
*    archive list mirrors its groupBy/orderBy state by polling the same
*    persisted store key (dsh.workspace.view.v5)
*  - rows show the native session title + time and a hover "⋯" menu
*    (rename / restore / delete) mirroring the native rename/fork/archive menu
* Data and mutations go through the host-half API (src/index.ts).
*/
const VIEW_KEY = "dsh.workspace.view.v5";
/** No-op for the optional onOpenSession prop. */
const NOOP = () => void 0;
/** Read the native workspace browser's persisted view state (the exact
* store the view-options button and group headers write). */
function readViewState() {
	try {
		const raw = localStorage.getItem(VIEW_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			return {
				groupBy: parsed.groupBy === "flat" ? "flat" : "workspace",
				orderBy: parsed.orderBy === "manual" ? "manual" : "updated",
				groupExpansion: parsed.groupExpansion && typeof parsed.groupExpansion === "object" ? parsed.groupExpansion : {}
			};
		}
	} catch {}
	return {
		groupBy: "workspace",
		orderBy: "updated",
		groupExpansion: {}
	};
}
/** Persist a group-expansion change into the shared native store key. */
function writeGroupExpansion(key, expanded) {
	try {
		const state = readViewState();
		const next = {
			...state.groupExpansion,
			[key]: expanded
		};
		localStorage.setItem(VIEW_KEY, JSON.stringify({
			...state,
			groupExpansion: next
		}));
	} catch {}
}
async function getArchived() {
	const res = await fetch("/plugins/@crack/dsh-archive/api/archived");
	if (!res.ok) throw new Error("加载归档列表失败");
	const data = await res.json();
	return {
		groups: data.groups ?? [],
		ungrouped: data.ungrouped ?? []
	};
}
async function postAction(action, sessionId) {
	const res = await fetch("/plugins/@crack/dsh-archive/api/" + action, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ sessionId })
	});
	if (!res.ok) {
		const data = await res.json().catch(() => null);
		throw new Error(data?.error ?? "操作失败");
	}
}
async function renameSession(sessionId, title) {
	const res = await fetch("/plugins/@crack/dsh-archive/api/rename-session", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			sessionId,
			title
		})
	});
	if (!res.ok) {
		const data = await res.json().catch(() => null);
		throw new Error(data?.error ?? "重命名失败");
	}
}
/** Relative time label mirroring the native row time (now/minutes/hours/days). */
function timeAgo(ms) {
	if (ms === null || ms === void 0) return "";
	const diff = Date.now() - ms;
	if (diff < 6e4) return "刚刚";
	const minutes = Math.floor(diff / 6e4);
	if (minutes < 60) return `${minutes} 分钟前`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} 小时前`;
	return `${Math.floor(hours / 24)} 天前`;
}
function ContextMenu({ x, y, items, onPick, onClose }) {
	return (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("div", {
		className: "skin-menu-mask",
		onClick: onClose,
		onContextMenu: (e) => {
			e.preventDefault();
			onClose();
		}
	}), (0, react_jsx_runtime.jsx)("div", {
		className: "skin-menu",
		style: {
			left: x,
			top: y
		},
		role: "menu",
		children: items.map((item) => (0, react_jsx_runtime.jsx)("button", {
			type: "button",
			role: "menuitem",
			className: item.danger ? "danger" : "",
			onClick: () => onPick(item.id),
			children: item.label
		}, item.id))
	})] }), document.body);
}
function SessionRow({ item, busy, menuOpen, onMenuOpen, onOpen }) {
	return (0, react_jsx_runtime.jsxs)("div", {
		className: "skin-archive-item" + (menuOpen ? " menu-open" : ""),
		role: "treeitem",
		"aria-selected": false,
		onClick: () => onOpen(item.sessionId),
		children: [
			(0, react_jsx_runtime.jsx)("span", {
				className: "skin-archive-title",
				title: item.title,
				children: item.title
			}),
			(0, react_jsx_runtime.jsx)("span", {
				className: "skin-archive-time",
				children: timeAgo(item.updatedAt ?? item.createdAt)
			}),
			(0, react_jsx_runtime.jsx)("span", {
				className: "skin-archive-actions",
				children: (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "skin-archive-more",
					"aria-label": "会话操作",
					disabled: busy === item.sessionId,
					onClick: (e) => {
						e.stopPropagation();
						onMenuOpen(e);
					},
					children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEllipsisOutline16, {})
				})
			})
		]
	});
}
function ArchiveView({ onClose, onOpenSession }) {
	const [data, setData] = (0, react.useState)({
		groups: [],
		ungrouped: []
	});
	const [busy, setBusy] = (0, react.useState)(null);
	const [error, setError] = (0, react.useState)(null);
	const [view, setView] = (0, react.useState)(readViewState);
	const [menu, setMenu] = (0, react.useState)(null);
	const [renameTarget, setRenameTarget] = (0, react.useState)(null);
	const [renameDraft, setRenameDraft] = (0, react.useState)("");
	const [renaming, setRenaming] = (0, react.useState)(false);
	const [renameError, setRenameError] = (0, react.useState)(null);
	const composingRef = (0, react.useRef)(false);
	const [deleteTarget, setDeleteTarget] = (0, react.useState)(null);
	const [deleting, setDeleting] = (0, react.useState)(false);
	const [deleteError, setDeleteError] = (0, react.useState)(null);
	const closeDelete = () => {
		if (deleting) return;
		setDeleteTarget(null);
		setDeleteError(null);
	};
	const confirmDelete = async () => {
		if (deleting || deleteTarget === null) return;
		setDeleting(true);
		setDeleteError(null);
		try {
			await postAction("delete-session", deleteTarget.sessionId);
			setDeleting(false);
			setDeleteTarget(null);
			await refresh();
		} catch (reason) {
			setDeleting(false);
			setDeleteError(reason instanceof Error ? reason.message : String(reason));
		}
	};
	const renameTrimmed = renameDraft.trim();
	const renameBlocked = renaming || renameTrimmed === "" || renameTarget === null;
	const closeRename = () => {
		if (renaming) return;
		setRenameTarget(null);
		setRenameError(null);
	};
	const confirmRename = async () => {
		if (renameBlocked || renameTarget === null) return;
		setRenaming(true);
		setRenameError(null);
		try {
			await renameSession(renameTarget.sessionId, renameTrimmed);
			setRenaming(false);
			setRenameTarget(null);
			await refresh();
		} catch (reason) {
			setRenaming(false);
			setRenameError(reason instanceof Error ? reason.message : String(reason));
		}
	};
	const [expanded, setExpanded] = (0, react.useState)(() => readViewState().groupExpansion);
	(0, react.useEffect)(() => {
		const timer = window.setInterval(() => {
			const next = readViewState();
			setView((prev) => prev.groupBy === next.groupBy && prev.orderBy === next.orderBy ? prev : next);
			setExpanded((prev) => {
				for (const key of Object.keys(next.groupExpansion)) if (prev[key] !== next.groupExpansion[key]) return { ...next.groupExpansion };
				return prev;
			});
		}, 400);
		return () => window.clearInterval(timer);
	}, []);
	const refresh = (0, react.useCallback)(async () => {
		try {
			setData(await getArchived());
			setError(null);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		}
	}, []);
	(0, react.useEffect)(() => {
		refresh();
	}, [refresh]);
	const act = async (action, item) => {
		setBusy(item.sessionId);
		setError(null);
		try {
			await postAction(action, item.sessionId);
			setMenu(null);
			await refresh();
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		} finally {
			setBusy(null);
		}
	};
	const handleRename = (item) => {
		setMenu(null);
		setRenameTarget({
			sessionId: item.sessionId,
			title: item.title
		});
		setRenameDraft(item.title);
		setRenameError(null);
	};
	const handleDelete = (item) => {
		setMenu(null);
		setDeleteTarget(item);
		setDeleteError(null);
	};
	const sortSessions = (sessions) => view.orderBy === "updated" ? [...sessions].sort((a, b) => (b.updatedAt ?? b.createdAt ?? 0) - (a.updatedAt ?? a.createdAt ?? 0)) : sessions;
	const total = data.groups.reduce((n, g) => n + g.sessions.length, 0) + data.ungrouped.length;
	const flat = view.groupBy === "flat" ? sortSessions([...data.groups.flatMap((g) => g.sessions), ...data.ungrouped]) : null;
	const openMenu = (e, item) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMenu({
			item,
			x: Math.max(8, Math.min(rect.right - 140, window.innerWidth - 148)),
			y: rect.bottom + 4
		});
	};
	const onMenuPick = (id) => {
		if (!menu) return;
		if (id === "rename") handleRename(menu.item);
		else if (id === "unarchive") act("unarchive", menu.item);
		else if (id === "delete") handleDelete(menu.item);
	};
	return (0, react_jsx_runtime.jsxs)("div", {
		className: "skin-archive",
		onClick: (e) => e.stopPropagation(),
		onKeyDown: (e) => e.stopPropagation(),
		children: [
			error && (0, react_jsx_runtime.jsx)("div", {
				className: "skin-archive-error",
				children: error
			}),
			(0, react_jsx_runtime.jsxs)("div", {
				className: "skin-archive-list",
				children: [
					total === 0 && (0, react_jsx_runtime.jsx)("div", {
						className: "skin-archive-empty",
						children: "暂无归档会话"
					}),
					flat !== null && flat.map((item) => (0, react_jsx_runtime.jsx)(SessionRow, {
						item,
						busy,
						menuOpen: menu?.item.sessionId === item.sessionId,
						onMenuOpen: (e) => openMenu(e, item),
						onOpen: onOpenSession ?? NOOP
					}, item.sessionId)),
					flat === null && data.groups.map((group) => {
						const isExpanded = expanded[group.workspaceId] !== false;
						return (0, react_jsx_runtime.jsxs)("div", {
							className: "skin-archive-group",
							children: [(0, react_jsx_runtime.jsxs)("div", {
								className: "skin-archive-group-title",
								role: "treeitem",
								"aria-expanded": isExpanded,
								onClick: () => {
									const next = !isExpanded;
									setExpanded((prev) => ({
										...prev,
										[group.workspaceId]: next
									}));
									writeGroupExpansion(group.workspaceId, next);
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: "skin-archive-folder" + (isExpanded ? " open" : ""),
										children: isExpanded ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpen16, {}) : (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderClose16, {})
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: "skin-archive-chevron",
										children: (0, react_jsx_runtime.jsx)("span", {
											className: "skin-archive-arrow" + (isExpanded ? " open" : ""),
											children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
										})
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: "skin-archive-project",
										children: (0, react_jsx_runtime.jsx)("span", {
											className: "skin-archive-title",
											children: group.title
										})
									})
								]
							}), isExpanded && sortSessions(group.sessions).map((item) => (0, react_jsx_runtime.jsx)(SessionRow, {
								item,
								busy,
								menuOpen: menu?.item.sessionId === item.sessionId,
								onMenuOpen: (e) => openMenu(e, item),
								onOpen: onOpenSession ?? NOOP
							}, item.sessionId))]
						}, group.workspaceId);
					}),
					flat === null && data.ungrouped.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
						className: "skin-archive-group",
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: "skin-archive-group-title",
							role: "treeitem",
							"aria-expanded": true,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: "skin-archive-folder open",
									children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpen16, {})
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: "skin-archive-chevron",
									children: (0, react_jsx_runtime.jsx)("span", {
										className: "skin-archive-arrow open",
										children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
									})
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: "skin-archive-project",
									children: (0, react_jsx_runtime.jsx)("span", {
										className: "skin-archive-title",
										children: "未分组"
									})
								})
							]
						}), sortSessions(data.ungrouped).map((item) => (0, react_jsx_runtime.jsx)(SessionRow, {
							item,
							busy,
							menuOpen: menu?.item.sessionId === item.sessionId,
							onMenuOpen: (e) => openMenu(e, item),
							onOpen: onOpenSession ?? NOOP
						}, item.sessionId))]
					})
				]
			}),
			menu && (0, react_jsx_runtime.jsx)(ContextMenu, {
				x: menu.x,
				y: menu.y,
				items: [
					{
						id: "rename",
						label: "重命名"
					},
					{
						id: "unarchive",
						label: "还原会话"
					},
					{
						id: "delete",
						label: "删除会话",
						danger: true
					}
				],
				onPick: onMenuPick,
				onClose: () => setMenu(null)
			}),
			(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: renameTarget !== null,
				onClose: closeRename,
				closeLabel: "关闭",
				title: "重命名会话",
				footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					disabled: renaming,
					onClick: closeRename,
					children: "取消"
				}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					disabled: renameBlocked,
					onClick: confirmRename,
					children: "重命名"
				})] }),
				children: [(0, react_jsx_runtime.jsx)("input", {
					className: "skin-rename-input",
					value: renameDraft,
					"aria-label": "会话名称",
					autoFocus: true,
					disabled: renaming,
					onFocus: (e) => {
						e.target.select();
					},
					onChange: (e) => {
						setRenameDraft(e.target.value);
						setRenameError(null);
					},
					onCompositionStart: () => {
						composingRef.current = true;
					},
					onCompositionEnd: () => {
						composingRef.current = false;
					},
					onKeyDown: (e) => {
						if (e.key === "Enter" && !composingRef.current) {
							e.preventDefault();
							confirmRename();
						}
					}
				}), renameError !== null && (0, react_jsx_runtime.jsx)("div", {
					className: "skin-rename-error",
					role: "alert",
					children: renameError
				})]
			}),
			(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: deleteTarget !== null,
				onClose: closeDelete,
				closeLabel: "关闭",
				title: "删除会话",
				description: deleteTarget !== null ? `将删除「${deleteTarget.title}」，会话日志将被移除，此操作不可恢复。` : void 0,
				footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					disabled: deleting,
					onClick: closeDelete,
					children: "取消"
				}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					className: "skin-delete-action",
					disabled: deleting,
					onClick: confirmDelete,
					children: "删除会话"
				})] }),
				children: [deleting && (0, react_jsx_runtime.jsx)("div", {
					className: "skin-delete-status",
					role: "status",
					children: "正在删除会话…"
				}), deleteError !== null && (0, react_jsx_runtime.jsx)("div", {
					className: "skin-rename-error",
					role: "alert",
					children: deleteError
				})]
			})
		]
	});
}

//#endregion
//#region lib/client/index.js
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
const inject = [
	"locale",
	"slots",
	"remote"
];
function apply(ctx) {
	document.body;
	document.getElementById("root");
	let tipTimer = null;
	let tipEl = null;
	function showTip(btn) {
		const rect = btn.getBoundingClientRect();
		const tip = document.createElement("div");
		tip.className = "skin-archive-tip";
		tip.textContent = archiveRoot ? "工作区会话" : "归档会话";
		tip.style.left = rect.left + rect.width / 2 + "px";
		tip.style.top = rect.bottom + 8 + "px";
		document.body.appendChild(tip);
		tipEl = tip;
	}
	function hideTip() {
		if (tipTimer !== null) {
			window.clearTimeout(tipTimer);
			tipTimer = null;
		}
		if (tipEl) {
			tipEl.remove();
			tipEl = null;
		}
	}
	function ensureArchiveButton() {
		if (document.querySelector("[data-skin-archive-btn]")) return;
		const labels = [
			"添加工作区",
			"Add workspace",
			"Add workspace…"
		];
		for (const btn of document.querySelectorAll("button[aria-label]")) {
			const label = (btn.getAttribute("aria-label") || "").trim();
			if (labels.includes(label)) {
				const b = document.createElement("button");
				b.type = "button";
				b.dataset.skinArchiveBtn = "";
				b.setAttribute("aria-label", "归档会话");
				b.innerHTML = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path fill=\"currentColor\" transform=\"translate(1.5 2.429)\" d=\"M5.05582 0.518756L4.50669 0.86654L5.05582 0.518756ZM13 9.4837L13.65 9.4837L13.65 3.53962L13 3.53962L12.35 3.53962L12.35 9.4837L13 9.4837ZM11.3264 1.86603L11.3264 1.21603L6.52313 1.21603L6.52313 1.86603L6.52313 2.51603L11.3264 2.51603L11.3264 1.86603ZM5.58054 1.34727L6.12968 0.999489L5.60495 0.170972L5.05582 0.518756L4.50669 0.86654L5.03141 1.69506L5.58054 1.34727ZM4.11323 1.23058e-13L4.11323 -0.65L1.67359 -0.65L1.67359 5.00699e-14L1.67359 0.65L4.11323 0.65L4.11323 1.23058e-13ZM0 1.67359L-0.65 1.67359L-0.65 9.4837L0 9.4837L0.65 9.4837L0.65 1.67359L0 1.67359ZM11.3264 11.1573L11.3264 10.5073L1.67359 10.5073L1.67359 11.1573L1.67359 11.8073L11.3264 11.8073L11.3264 11.1573ZM0 9.4837L-0.65 9.4837C-0.65 10.767 0.390308 11.8073 1.67359 11.8073L1.67359 11.1573L1.67359 10.5073C1.10828 10.5073 0.65 10.049 0.65 9.4837L0 9.4837ZM1.67359 5.00699e-14L1.67359 -0.65C0.390307 -0.65 -0.65 0.390309 -0.65 1.67359L0 1.67359L0.65 1.67359C0.65 1.10828 1.10828 0.65 1.67359 0.65L1.67359 5.00699e-14ZM5.05582 0.518756L5.60495 0.170972C5.28121 -0.340193 4.71829 -0.65 4.11323 -0.65L4.11323 1.23058e-13L4.11323 0.65C4.27282 0.65 4.4213 0.731715 4.50669 0.86654L5.05582 0.518756ZM6.52313 1.86603L6.52313 1.21603C6.36354 1.21603 6.21507 1.13431 6.12968 0.999489L5.58054 1.34727L5.03141 1.69506C5.35515 2.20622 5.91808 2.51603 6.52313 2.51603L6.52313 1.86603ZM13 3.53962L13.65 3.53962C13.65 2.25634 12.6097 1.21603 11.3264 1.21603L11.3264 1.86603L11.3264 2.51603C11.8917 2.51603 12.35 2.97431 12.35 3.53962L13 3.53962ZM13 9.4837L12.35 9.4837C12.35 10.049 11.8917 10.5073 11.3264 10.5073L11.3264 11.1573L11.3264 11.8073C12.6097 11.8073 13.65 10.767 13.65 9.4837L13 9.4837Z\"/></svg>";
				b.addEventListener("click", () => toggleArchiveView());
				b.addEventListener("mouseenter", () => {
					if (tipTimer !== null) window.clearTimeout(tipTimer);
					tipTimer = window.setTimeout(() => showTip(b), 500);
				});
				b.addEventListener("mouseleave", hideTip);
				btn.insertAdjacentElement("afterend", b);
				return;
			}
		}
	}
	function onDomChange() {
		ensureArchiveButton();
	}
	onDomChange();
	let archiveRoot = null;
	let archiveHost = null;
	let archiveTarget = null;
	let hiddenNative = [];
	function openArchiveView() {
		const header = document.querySelector("button[data-skin-archive-btn]")?.parentElement?.parentElement;
		const target = header?.nextElementSibling ?? header?.parentElement;
		if (!target || archiveRoot) return;
		const host = document.createElement("div");
		host.dataset.skinArchiveView = "";
		target.style.position = "relative";
		hiddenNative = [];
		for (const child of Array.from(target.children)) {
			child.style.display = "none";
			hiddenNative.push(child);
		}
		target.appendChild(host);
		archiveTarget = target;
		archiveHost = host;
		archiveRoot = (0, react_dom_client.createRoot)(host);
		archiveRoot.render((0, react.createElement)(ArchiveView, {
			onClose: closeArchiveView,
			onOpenSession: (id) => {
				try {
					ctx.sessions?.open?.(id);
				} catch {}
			}
		}));
	}
	function closeArchiveView() {
		archiveRoot?.unmount();
		archiveRoot = null;
		archiveHost?.remove();
		archiveHost = null;
		if (archiveTarget) archiveTarget.style.position = "";
		archiveTarget = null;
		for (const el of hiddenNative) el.style.display = "";
		hiddenNative = [];
	}
	function toggleArchiveView() {
		if (archiveRoot) closeArchiveView();
		else openArchiveView();
	}
	let domScheduled = false;
	const scheduleDomChange = () => {
		if (domScheduled) return;
		domScheduled = true;
		requestAnimationFrame(() => {
			domScheduled = false;
			onDomChange();
		});
	};
	const obs2 = new MutationObserver(scheduleDomChange);
	obs2.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["data-phase", "data-conversation-composer-overlay"]
	});
	try {
		ctx.effect(() => () => {
			obs2.disconnect();
			document.querySelectorAll("[data-skin-archive-btn]").forEach((el) => el.remove());
			closeArchiveView();
		}, "dsh-archive: archive");
	} catch {}
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map