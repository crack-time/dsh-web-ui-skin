window.__ModuleLoader__.load({ id: "@crack/dsh-web-ui-skin", factory: (require) => {
const css = "/* ============================================\r\n   田园小屋 (Pastoral Cottage) Skin\r\n   3840x2160 吉卜力风格田园插画全屏背景\r\n   半透明毛玻璃面板\r\n   ============================================ */\r\n\r\n/* === 亮色版 === */\r\n/* ---- 壁纸铺在 #root 上 ---- */\r\nbody[data-dsh-skin] #root {\r\n  background-color: #3a6ea5;\r\n  background-size: cover;\r\n  background-position: center center;\r\n  background-attachment: fixed;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n/* ============================================\r\n   Design Token 覆盖 — 亮色\r\n   ============================================ */\r\nbody[data-dsh-skin] {\r\n  /* 品牌色：天空蓝 */\r\n  --dsw-alias-brand-primary: #5a9fd4;\r\n  --dsw-alias-brand-primary-invert: #fff;\r\n  --dsw-alias-brand-text: #4a8fc4;\r\n\r\n  /* 背景：半透明毛玻璃 */\r\n  /* 毛玻璃强度（0..1）：由设置卡片的 glassOpacity 通过 --skin-glass 覆盖\r\n     （客户端内联设置；未设置时用各 token 自己的回退值，等于原外观） */\r\n  --skin-glass: 0.48;\r\n  --dsw-alias-bg-base: rgba(255, 255, 255, var(--skin-glass, 0.48));\r\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, var(--skin-glass, 0.42));\r\n  --dsw-alias-bg-layer-2: rgba(250, 249, 247, 0.90);\r\n  --dsw-alias-bg-layer-3: rgba(240, 237, 230, var(--skin-glass, 0.48));\r\n  --dsw-alias-bg-overlay: rgba(255, 255, 255, 0.68);\r\n  --dsw-alias-bg-mask-1: rgba(0, 0, 0, 0.45);\r\n\r\n  /* 边框 */\r\n  --dsw-alias-border-l1: rgba(90, 159, 212, 0.12);\r\n  --dsw-alias-border-l2: rgba(90, 159, 212, 0.18);\r\n  --dsw-alias-border-l3: rgba(90, 159, 212, 0.25);\r\n\r\n  /* 文字 */\r\n  --dsw-alias-label-primary: #2c3e50;\r\n  --dsw-alias-label-secondary: #46535f;\r\n  --dsw-alias-label-tertiary: #64748a;\r\n  --dsw-alias-label-primary-inverted: #fff;\r\n\r\n  /* 交互 */\r\n  --dsw-alias-interactive-bg-hover: rgba(90, 159, 212, 0.10);\r\n  --dsw-alias-interactive-bg-active: rgba(90, 159, 212, 0.15);\r\n  --dsw-alias-interactive-bg-hover-accent: rgba(90, 159, 212, 0.14);\r\n\r\n  /* 按钮 */\r\n  --dsw-alias-button-primary-fill: #5a9fd4;\r\n  --dsw-alias-button-primary-hover: #4a8fc4;\r\n  --dsw-alias-button-elevated-fill: rgba(255, 255, 255, 0.65);\r\n  --dsw-alias-button-contrast-fill: #3a6ea5;\r\n\r\n  /* 侧边栏 */\r\n  --dsw-specific-sidebar-fill: rgba(248, 245, 240, var(--skin-glass, 0.42));\r\n\r\n  /* 聊天气泡 */\r\n  --dsw-specific-bubble: rgba(255, 255, 255, var(--skin-glass, 0.48));\r\n  --dsw-specific-bubble-highlight: rgba(90, 159, 212, 0.12);\r\n\r\n  /* 输入框 */\r\n  --dsw-specific-input-major: rgba(255, 255, 255, 0.85);\r\n\r\n  /* 菜单 / 选择器 */\r\n  --dsw-specific-menu: #ffffff;\r\n  --dsw-specific-selector: rgba(248, 245, 240, 0.62);\r\n\r\n  /* 代码块 */\r\n  --dsw-alias-markdown-code-block: rgba(248, 245, 240, 0.58);\r\n  --dsw-alias-markdown-inline-code: rgba(248, 245, 240, 0.64);\r\n\r\n  /* Toast / Tooltip */\r\n  --dsw-alias-toast-bg: rgba(45, 75, 105, 0.92);\r\n  --dsw-alias-tooltip-bg: rgba(44, 44, 46, 0.95);\r\n}\r\n\r\n/* ============================================\r\n   Design Token 覆盖 — 暗色\r\n   ============================================ */\r\nbody[data-dsh-skin][data-ds-dark-theme] {\r\n  --dsw-alias-brand-primary: #7ab8e8;\r\n  --dsw-alias-brand-primary-invert: #1a2a3a;\r\n  --dsw-alias-brand-text: #7ab8e8;\r\n\r\n  --dsw-alias-bg-base: rgba(18, 22, 30, var(--skin-glass, 0.52));\r\n  --dsw-alias-bg-layer-1: rgba(22, 26, 34, var(--skin-glass, 0.50));\r\n  --dsw-alias-bg-layer-2: rgba(26, 30, 38, 0.90);\r\n  --dsw-alias-bg-layer-3: rgba(30, 34, 42, var(--skin-glass, 0.46));\r\n  --dsw-alias-bg-overlay: rgba(20, 24, 32, 0.72);\r\n  --dsw-alias-bg-mask-1: rgba(0, 0, 0, 0.55);\r\n\r\n  --dsw-alias-border-l1: rgba(122, 184, 232, 0.10);\r\n  --dsw-alias-border-l2: rgba(122, 184, 232, 0.16);\r\n  --dsw-alias-border-l3: rgba(122, 184, 232, 0.22);\r\n\r\n  --dsw-alias-label-primary: #e0e6ed;\r\n  --dsw-alias-label-secondary: #a0aab4;\r\n  --dsw-alias-label-tertiary: #7a8490;\r\n  --dsw-alias-label-primary-inverted: #1a2a3a;\r\n\r\n  --dsw-alias-interactive-bg-hover: rgba(122, 184, 232, 0.10);\r\n  --dsw-alias-interactive-bg-active: rgba(122, 184, 232, 0.15);\r\n  --dsw-alias-interactive-bg-hover-accent: rgba(122, 184, 232, 0.12);\r\n\r\n  --dsw-alias-button-primary-fill: #4a8ab8;\r\n  --dsw-alias-button-primary-hover: #5a9ac8;\r\n  --dsw-alias-button-elevated-fill: rgba(30, 34, 42, 0.62);\r\n  --dsw-alias-button-contrast-fill: #7ab8e8;\r\n\r\n  --dsw-specific-sidebar-fill: rgba(22, 26, 34, var(--skin-glass, 0.52));\r\n  --dsw-specific-bubble: rgba(26, 30, 38, var(--skin-glass, 0.50));\r\n  --dsw-specific-bubble-highlight: rgba(122, 184, 232, 0.12);\r\n  --dsw-specific-input-major: rgba(18, 22, 30, 0.85);\r\n  --dsw-specific-menu: #161a22;\r\n  --dsw-specific-selector: rgba(26, 30, 38, 0.66);\r\n\r\n  --dsw-alias-markdown-code-block: rgba(22, 26, 34, 0.55);\r\n  --dsw-alias-markdown-inline-code: rgba(26, 30, 38, 0.60);\r\n\r\n  --dsw-alias-toast-bg: rgba(30, 38, 50, 0.92);\r\n  --dsw-alias-tooltip-bg: rgba(22, 26, 34, 0.95);\r\n}\r\n\r\n/* ============================================\r\n   中央聊天区：父容器全透明，壁纸全显示\r\n   （子区域保持现状：气泡/输入卡半透明不变）\r\n   ============================================ */\r\nbody[data-dsh-skin] .wSkVaW_root {\r\n  background: transparent;\r\n}\r\n\r\n/* ============================================\r\n   布局框架（frame）：全透明，壁纸全显示\r\n   （侧栏/详情列有自己的背景，不受影响）\r\n   ============================================ */\r\nbody[data-dsh-skin] .pI_x6G_frame {\r\n  background: transparent;\r\n}\r\n\r\n/* 滚动区内边距收窄到 16px，让消息内容正好 748px（默认 32px 会挤窄） */\r\nbody[data-dsh-skin] .EvIC1a_scroll {\r\n  padding: 16px;\r\n}\r\n\r\n/* ============================================\r\n   会话统计条：放宽到与座位同宽（780px），\r\n   内边距收窄，完整展示统计文本不被省略号截断\r\n   ============================================ */\r\nbody[data-dsh-skin] .EvIC1a_turnStatus {\r\n  max-width: var(--dsh-composer-card-max-width);\r\n  padding: 4px 4px 0;\r\n  font-size: 12px;\r\n}\r\n\r\n/* 原生\"回到底部\"按钮：滚动容器保持为 scrollBody，原生显隐逻辑\r\n   有效；仅改为水平居中、贴输入框上方 16px（默认右对齐且按\r\n   152px 输入框高度预留偏移） */\r\nbody[data-dsh-skin] [data-conversation-scroll] .EvIC1a_toBottomSlot {\r\n  bottom: 16px;\r\n  justify-content: center;\r\n  padding-right: 0;\r\n}\r\n\r\n/* ============================================\r\n   顶部标题栏：透明度与中间文本区一致\r\n   ============================================ */\r\nbody[data-dsh-skin] .wSkVaW_header {\r\n  background: var(--dsw-specific-input-major);\r\n}\r\n\r\n/* ============================================\r\n   侧边栏：透明度与中间文本区一致\r\n   （布局列 .pI_x6G_sidebarCol 保持透明，\r\n    侧栏根 .hHd-Xa_root 使用 input-major）\r\n   ============================================ */\r\nbody[data-dsh-skin] .pI_x6G_sidebarCol {\r\n  background: transparent;\r\n}\r\nbody[data-dsh-skin] .hHd-Xa_root {\r\n  background: var(--dsw-specific-input-major);\r\n}\r\n\r\n/* ============================================\r\n   会话列表底部渐隐条：渐隐进 sidebar-fill 颜色，\r\n   在壁纸上形成白色边界，去掉\r\n   ============================================ */\r\nbody[data-dsh-skin] .qDHVXG_fade {\r\n  display: none;\r\n}\r\n\r\n/* ============================================\r\n   侧栏折叠按钮微调\r\n   ============================================ */\r\n/* 展开态：折叠按钮略左移，不贴右缘 */\r\nbody[data-dsh-skin] .hHd-Xa_logoRow > button:last-child {\r\n  margin-right: 7px;\r\n}\r\n\r\n\r\n\r\n/* 侧边栏归档入口按钮（添加工作区右侧） */\r\nbody[data-dsh-skin] button[data-skin-archive-btn] {\r\n  /* 与原生 iconButton 一致：28px 圆形、label-secondary、hover 同款背景 */\r\n  position: relative;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 28px;\r\n  height: 28px;\r\n  padding: 0;\r\n  border: none;\r\n  background: transparent;\r\n  border-radius: 50%;\r\n  color: var(--dsw-alias-label-secondary, #4a6a8c);\r\n  cursor: pointer;\r\n  flex: none;\r\n  transition: background 0.12s ease;\r\n}\r\nbody[data-dsh-skin] button[data-skin-archive-btn] svg {\r\n  display: block;\r\n}\r\nbody[data-dsh-skin] button[data-skin-archive-btn]:hover {\r\n  background: var(--dsw-alias-interactive-bg-hover);\r\n}\r\n\r\nbody[data-dsh-skin] button[data-skin-archive-btn]:active {\r\n  transform: scale(0.92);\r\n}\r\n/* ============================================\r\n |  归档会话视图（archive view）\r\n |  原位覆盖工作区列表区域 · 布局与原生树一致\r\n |  ============================================ */\r\n/* 工具行解除 60px 宽度限制：第 4 个（归档）按钮不被裁剪，整体左移排列 */\r\nbody[data-dsh-skin] [class*=\"_headerActions\"] {\r\n  max-width: none !important;\r\n}\r\n/* 覆盖层容器：absolute 铺满树区域 */\r\nbody[data-dsh-skin] [data-skin-archive-view] {\r\n  position: absolute;\r\n  inset: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  z-index: 100;\r\n  /* 无背景：与工作区树区域一样直接透出壁纸 */\r\n  background: transparent;\r\n  overflow: hidden;\r\n}\r\nbody[data-dsh-skin] .skin-archive {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n  min-height: 0;\r\n  color: #2b4259;\r\n}\r\n\r\nbody[data-dsh-skin] .skin-menu-mask {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 2147483010;\r\n}\r\nbody[data-dsh-skin] .skin-menu {\r\n  position: fixed;\r\n  z-index: 2147483011;\r\n  min-width: 132px;\r\n  padding: 4px;\r\n  border-radius: 10px;\r\n  /* 与工作区三点菜单/@弹窗同一背景变量（--dsw-specific-menu = 不透明） */\r\n  background: var(--dsw-specific-menu, #ffffff);\r\n  border: 1px solid var(--dsw-alias-divider, rgba(90, 159, 212, 0.25));\r\n  box-shadow: 0 8px 24px rgba(46, 79, 108, 0.18);\r\n  backdrop-filter: blur(12px);\r\n  -webkit-backdrop-filter: blur(12px);\r\n}\r\nbody[data-dsh-skin] .skin-menu button {\r\n  display: block;\r\n  width: 100%;\r\n  text-align: left;\r\n  border: none;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-primary, #2b4259);\r\n  font-size: 13px;\r\n  padding: 6px 10px;\r\n  border-radius: 7px;\r\n  cursor: pointer;\r\n}\r\nbody[data-dsh-skin] .skin-menu button:hover {\r\n  background: var(--dsw-alias-interactive-bg-hover, rgba(90, 159, 212, 0.12));\r\n}\r\nbody[data-dsh-skin] .skin-menu button.danger {\r\n  color: var(--dsw-alias-danger, #c05a5a);\r\n}\r\nbody[data-dsh-skin] .skin-menu button.danger:hover {\r\n  background: rgba(200, 90, 90, 0.1);\r\n}\r\n\r\n/* ============================================\r\n |  归档视图：精确对齐原生 Rows.module.css\r\n |  （行/分组行结构与原生一致：hover 背景、\r\n |   分组行 hover 文件夹→箭头、会话行 hover 时间隐藏）\r\n |  ============================================ */\r\nbody[data-dsh-skin] .skin-archive-error {\r\n  padding: 8px 10px;\r\n  font-size: 12px;\r\n  color: var(--dsw-alias-state-error-primary, #a05a5a);\r\n  background: rgba(200, 90, 90, 0.08);\r\n  border-bottom: 1px solid rgba(200, 90, 90, 0.15);\r\n  flex: none;\r\n}\r\nbody[data-dsh-skin] .skin-archive-list {\r\n  min-height: 0;\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 0 4px 16px;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group {\r\n  position: relative;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group + .skin-archive-group {\r\n  margin-top: 4px;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group > * + * {\r\n  margin-top: 2px;\r\n}\r\nbody[data-dsh-skin] .skin-archive-empty {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  padding: 16px 12px;\r\n  font-size: 13px;\r\n}\r\n/* 分组行：对齐原生 projectRow */\r\nbody[data-dsh-skin] .skin-archive-group-title {\r\n  box-sizing: border-box;\r\n  align-items: center;\r\n  height: 34px;\r\n  gap: 6px;\r\n  padding: 0 8px;\r\n  display: flex;\r\n  cursor: pointer;\r\n  user-select: none;\r\n  color: var(--dsw-alias-label-primary);\r\n  border-radius: 8px;\r\n  transition: background 0.1s ease;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group-title:hover {\r\n  background: var(--dsw-alias-interactive-bg-hover);\r\n}\r\nbody[data-dsh-skin] .skin-archive-folder {\r\n  width: 16px;\r\n  height: 20px;\r\n  color: var(--dsw-alias-label-tertiary);\r\n  flex: none;\r\n  justify-content: center;\r\n  align-items: center;\r\n  display: inline-flex;\r\n}\r\n/* 箭头：默认隐藏，hover 时显示并隐藏文件夹（同原生） */\r\nbody[data-dsh-skin] .skin-archive-chevron {\r\n  width: 16px;\r\n  height: 20px;\r\n  color: var(--dsw-alias-label-tertiary);\r\n  flex: none;\r\n  justify-content: center;\r\n  align-items: center;\r\n  display: none;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group-title:hover .skin-archive-chevron {\r\n  display: inline-flex;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group-title:hover .skin-archive-folder {\r\n  display: none;\r\n}\r\nbody[data-dsh-skin] .skin-archive-arrow {\r\n  display: inline-flex;\r\n  transform: rotate(0deg);\r\n  transition: transform 0.15s var(--ds-ease-in-out, ease);\r\n}\r\nbody[data-dsh-skin] .skin-archive-arrow.open {\r\n  transform: rotate(90deg);\r\n}\r\nbody[data-dsh-skin] .skin-archive-project {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  min-width: 0;\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  overflow: hidden;\r\n}\r\nbody[data-dsh-skin] .skin-archive-group-title .skin-archive-title {\r\n  margin: 0;\r\n}\r\n/* 会话行：对齐原生 sessionRow */\r\nbody[data-dsh-skin] .skin-archive-item {\r\n  cursor: pointer;\r\n  user-select: none;\r\n  color: var(--dsw-alias-label-primary);\r\n  border-radius: 8px;\r\n  align-items: center;\r\n  gap: 0;\r\n  padding: 0 8px;\r\n  display: flex;\r\n  height: 32px;\r\n  animation: skin-row-in 0.15s var(--ds-ease-in-out, ease);\r\n}\r\n@keyframes skin-row-in {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n}\r\nbody[data-dsh-skin] .skin-archive-item:hover,\r\nbody[data-dsh-skin] .skin-archive-item.menu-open {\r\n  background: var(--dsw-alias-interactive-bg-hover);\r\n}\r\nbody[data-dsh-skin] .skin-archive-item .skin-archive-title {\r\n  flex: 1;\r\n  margin: 0 6px 0 4px;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  min-width: 0;\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  overflow: hidden;\r\n}\r\nbody[data-dsh-skin] .skin-archive-item .skin-archive-time {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  flex: none;\r\n  font-size: 12px;\r\n  line-height: 20px;\r\n  white-space: nowrap;\r\n}\r\nbody[data-dsh-skin] .skin-archive-item .skin-archive-actions {\r\n  flex: none;\r\n  align-items: center;\r\n  gap: 12px;\r\n  display: none;\r\n}\r\nbody[data-dsh-skin] .skin-archive-item:hover .skin-archive-actions,\r\nbody[data-dsh-skin] .skin-archive-item.menu-open .skin-archive-actions {\r\n  display: inline-flex;\r\n}\r\n/* hover 时时间隐藏（同原生） */\r\nbody[data-dsh-skin] .skin-archive-item:hover .skin-archive-time,\r\nbody[data-dsh-skin] .skin-archive-item.menu-open .skin-archive-time {\r\n  display: none;\r\n}\r\nbody[data-dsh-skin] .skin-archive-more {\r\n  border: none;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-secondary, #4a6a8c);\r\n  width: 24px;\r\n  height: 24px;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 0;\r\n  flex: none;\r\n}\r\nbody[data-dsh-skin] .skin-archive-more:hover {\r\n  background: var(--dsw-alias-interactive-bg-hover, rgba(90, 159, 212, 0.18));\r\n}\r\nbody[data-dsh-skin] .skin-archive-more:disabled {\r\n  opacity: 0.3;\r\n  cursor: default;\r\n}\r\n\r\n\r\n/* 归档按钮气泡（fixed 于 body，同原生 Tooltip 机制） */\r\nbody[data-dsh-skin] .skin-archive-tip {\r\n  position: fixed;\r\n  transform: translateX(-50%);\r\n  background: var(--dsw-alias-tooltip-bg, #1f2937);\r\n  color: var(--dsw-static-blank-0, #ffffff);\r\n  font-size: 12px;\r\n  line-height: 16px;\r\n  padding: 4px 8px;\r\n  border-radius: 6px;\r\n  white-space: nowrap;\r\n  z-index: 2147483011;\r\n  pointer-events: none;\r\n}\r\n\r\n\r\n/* 重命名对话框输入框（复刻原生 qDHVXG_renameInput 规则，弹窗壳体用原生 Modal） */\r\nbody[data-dsh-skin] .skin-rename-input {\r\n  box-sizing: border-box;\r\n  border: 1px solid var(--dsw-alias-border-l2);\r\n  width: 100%;\r\n  height: 44px;\r\n  color: var(--dsw-alias-label-primary);\r\n  background: 0 0;\r\n  border-radius: 22px;\r\n  outline: none;\r\n  padding: 7px 14px;\r\n  font-size: 14px;\r\n  font-weight: 400;\r\n  line-height: 22px;\r\n}\r\nbody[data-dsh-skin] .skin-rename-input:disabled {\r\n  color: var(--dsw-alias-label-dimmed);\r\n}\r\nbody[data-dsh-skin] .skin-rename-error {\r\n  color: var(--dsw-alias-state-error-primary);\r\n  margin-top: 8px;\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n}\r\n\r\n/* 删除确认弹窗（复刻原生 qDHVXG_deleteAction / qDHVXG_deleteStatus 规则） */\r\nbody[data-dsh-skin] .skin-delete-action:not(:disabled) {\r\n  color: var(--dsw-alias-state-error-primary);\r\n}\r\nbody[data-dsh-skin] .skin-delete-status {\r\n  color: var(--dsw-alias-label-secondary);\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n}\r\n\r\n\r\n\r\n/* ============================================\r\n   设置弹窗 · \"skin\" 设置卡片（rc.7 插件设置卡片）\r\n   卡片外壳样式对齐内置插件卡片（PluginCard.module.css 的同款值）\r\n   ============================================ */\r\nbody[data-dsh-skin] [data-skin-settings].skin-settings-card {\r\n  border: 1px solid var(--dsw-alias-border-l2);\r\n  background: var(--dsw-alias-bg-layer-3);\r\n  border-radius: 12px;\r\n  list-style: none;\r\n  transition: border-color 0.16s, background 0.16s;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings].skin-settings-card:hover {\r\n  border-color: var(--dsw-alias-label-dimmed);\r\n}\r\nbody[data-dsh-skin] [data-skin-settings].skin-settings-card-open {\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  border-color: var(--dsw-alias-label-dimmed);\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-header {\r\n  appearance: none;\r\n  width: 100%;\r\n  font: inherit;\r\n  color: inherit;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  background: 0 0;\r\n  border: 0;\r\n  border-radius: 12px;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 14px 16px;\r\n  display: flex;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-header:focus-visible {\r\n  outline: 2px solid var(--dsw-alias-brand-primary);\r\n  outline-offset: -2px;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-headText {\r\n  flex-direction: column;\r\n  flex: 1;\r\n  gap: 4px;\r\n  min-width: 0;\r\n  display: flex;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-name {\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 15px;\r\n  font-weight: 600;\r\n  line-height: 1.4;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-description {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 13px;\r\n  line-height: 1.5;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-chevron {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  flex: none;\r\n  transition: transform 0.16s;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-chevron-open {\r\n  transform: rotate(180deg);\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-pending {\r\n  white-space: nowrap;\r\n  background: var(--dsw-alias-bg-module-platform, rgba(0, 0, 0, 0.06));\r\n  color: var(--dsw-alias-label-secondary);\r\n  border-radius: 999px;\r\n  flex: none;\r\n  padding: 1px 8px;\r\n  font-size: 11px;\r\n  font-weight: 500;\r\n  line-height: 17px;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-body {\r\n  border-top: 1px solid var(--dsw-alias-border-l2);\r\n  margin: 0 16px;\r\n  padding-bottom: 8px;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n  display: flex;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-row {\r\n  flex-direction: column;\r\n  gap: 4px;\r\n  display: flex;\r\n}\r\n\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-label {\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 13px;\r\n  line-height: 20px;\r\n}\r\n\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-controls {\r\n  align-items: center;\r\n  gap: 12px;\r\n  display: flex;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-pick {\r\n  appearance: none;\r\n  font: inherit;\r\n  cursor: pointer;\r\n  border: 1px solid var(--dsw-alias-border-l2);\r\n  border-radius: 8px;\r\n  padding: 4px 12px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  color: var(--dsw-alias-label-secondary);\r\n  background: 0 0;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-pick:hover {\r\n  color: var(--dsw-alias-label-primary);\r\n  border-color: var(--dsw-alias-label-dimmed);\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-pick:disabled {\r\n  opacity: 0.55;\r\n  cursor: default;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] input[type=\"text\"] {\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  height: 34px;\r\n  padding: 6px 10px;\r\n  border: 1px solid var(--dsw-alias-border-l2);\r\n  border-radius: 8px;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 13px;\r\n}\r\n\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-hint {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-footer {\r\n  border-top: 1px solid var(--dsw-alias-border-l2);\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 12px 0 4px;\r\n  display: flex;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-failed {\r\n  min-width: 0;\r\n  color: var(--dsw-alias-state-error-primary);\r\n  flex: 1;\r\n  margin: 0;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-discard,\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-save {\r\n  appearance: none;\r\n  font: inherit;\r\n  cursor: pointer;\r\n  border: 1px solid transparent;\r\n  border-radius: 8px;\r\n  padding: 5px 14px;\r\n  font-size: 13px;\r\n  line-height: 1.5;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-discard {\r\n  border-color: var(--dsw-alias-border-l2);\r\n  color: var(--dsw-alias-label-secondary);\r\n  background: 0 0;\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-save {\r\n  background: var(--dsw-alias-button-primary-fill, #5a9fd4);\r\n  color: var(--dsw-alias-button-primary-invert, #ffffff);\r\n}\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-save:disabled,\r\nbody[data-dsh-skin] [data-skin-settings] .skin-settings-discard:disabled {\r\n  opacity: 0.55;\r\n  cursor: default;\r\n}\r\n\r\n";

const tagId = "@crack/dsh-web-ui-skin/skin.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@crack/dsh-web-ui-skin";
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
	const res = await fetch("/plugins/@crack/dsh-web-ui-skin/api/archived");
	if (!res.ok) throw new Error("加载归档列表失败");
	const data = await res.json();
	return {
		groups: data.groups ?? [],
		ungrouped: data.ungrouped ?? []
	};
}
async function postAction(action, sessionId) {
	const res = await fetch("/plugins/@crack/dsh-web-ui-skin/api/" + action, {
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
	const res = await fetch("/plugins/@crack/dsh-web-ui-skin/api/rename-session", {
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
//#region lib/client/local-wallpaper.js
/**
* Browser-side "use the picked local file in place" wallpaper source.
*
* A plain <input type="file"> cannot yield a local path, so the File System
* Access API is the zero-copy way to keep using the file at its original
* location: we persist the file HANDLE in IndexedDB (not the bytes), re-ask
* for read permission on boot, and turn the file into a blob URL for the
* skin. Nothing is copied anywhere. Browsers without showOpenFilePicker
* (Safari/Firefox) simply keep the default wallpaper.
*/
const DB_NAME = "dsh-web-ui-skin";
const DB_VERSION = 1;
const STORE = "wallpaper";
const KEY = "picked";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
function idbRequest(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function loadHandle() {
	try {
		const db = await openDb();
		const value = await idbRequest(db.transaction(STORE, "readonly").objectStore(STORE).get(KEY));
		db.close();
		return value ?? null;
	} catch {
		return null;
	}
}
async function storeHandle(handle) {
	try {
		const db = await openDb();
		await idbRequest(db.transaction(STORE, "readwrite").objectStore(STORE).put(handle, KEY));
		db.close();
	} catch {}
}
async function dropHandle() {
	try {
		const db = await openDb();
		await idbRequest(db.transaction(STORE, "readwrite").objectStore(STORE).delete(KEY));
		db.close();
	} catch {}
}
/** Whether this browser can pick local files in place. */
function supportsLocalPick() {
	return typeof window !== "undefined" && typeof window.showOpenFilePicker === "function";
}
const listeners = /* @__PURE__ */ new Set();
/** Subscribe to picked-wallpaper changes (skin re-applies, card re-labels). */
function subscribePicked(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
function publish() {
	listeners.forEach((listener) => listener());
}
/** The currently active picked wallpaper (blob URL + original file name). */
let current = null;
function currentPicked() {
	return current;
}
async function activate(handle) {
	if (!handle) {
		if (current) URL.revokeObjectURL(current.blobUrl);
		current = null;
		publish();
		return;
	}
	if (!(!handle.queryPermission || await handle.queryPermission({ mode: "read" }) === "granted" || (handle.requestPermission ? await handle.requestPermission({ mode: "read" }) === "granted" : false))) return;
	const file = await handle.getFile();
	if (current) URL.revokeObjectURL(current.blobUrl);
	current = {
		blobUrl: URL.createObjectURL(file),
		name: handle.name
	};
	publish();
}
/** Restore the persisted handle (call on skin boot; no-op when absent). */
async function initPicked() {
	await activate(await loadHandle());
}
/** Open the native file dialog and use the picked file in place (zero copy). */
async function pickAndSet() {
	const picker = window.showOpenFilePicker;
	if (typeof picker !== "function") return false;
	try {
		const [handle] = await picker({
			types: [{
				description: "Images",
				accept: {
					"image/jpeg": [".jpg", ".jpeg"],
					"image/png": [".png"],
					"image/webp": [".webp"],
					"image/gif": [".gif"]
				}
			}],
			excludeAcceptAllOption: false
		});
		if (!handle) return false;
		await storeHandle(handle);
		await activate(handle);
		return true;
	} catch {
		return false;
	}
}
/** Forget the picked file and fall back to the URL setting / built-in. */
async function clearPicked() {
	await dropHandle();
	await activate(null);
}
/** Revoke any live blob URL (plugin teardown). */
function disposePicked() {
	if (current) URL.revokeObjectURL(current.blobUrl);
	current = null;
}

//#endregion
//#region lib/client/settings-card.js
const SKIN_DEFAULTS = {
	wallpaperUrl: "",
	glassOpacity: .48,
	archiveButton: true
};
/** Host endpoint for the URL field's settings read/write. */
const SKIN_CONFIG_URL = "/plugins/@crack/dsh-web-ui-skin/api/config";
/** Tiny uSES-compatible snapshot store; the slot system exposes `hooks.*` as `use*`. */
function createSkinCardStore() {
	let state = {
		...SKIN_DEFAULTS,
		loaded: false
	};
	const listeners = /* @__PURE__ */ new Set();
	return {
		getSnapshot: () => state,
		set(next) {
			state = next;
			listeners.forEach((listener) => listener());
		},
		subscribe(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		}
	};
}
/** Locale dictionary for the card (title / description / labels / hints). */
const SKIN_CARD_LOCALE = {
	zh: {
		title: "壁纸",
		description: "壁纸设置",
		wallpaperUrl: "自定义壁纸 URL",
		wallpaperUrlHint: "留空使用内置壁纸",
		pick: "选择本机图片…",
		removeLocal: "移除本机图片",
		picked: "当前使用本机图片：",
		unsupported: "当前浏览器不支持本机图片选择（仅 Chrome/Edge）",
		save: "保存",
		saving: "保存中…",
		discard: "放弃修改",
		unsaved: "未保存",
		expand: "展开",
		collapse: "折叠",
		saveFailed: "保存失败，请重试"
	},
	en: {
		title: "Wallpaper",
		description: "Wallpaper settings",
		wallpaperUrl: "Custom wallpaper URL",
		wallpaperUrlHint: "Leave empty for the bundled wallpaper",
		pick: "Choose local image…",
		removeLocal: "Remove local image",
		picked: "Using local image: ",
		unsupported: "Local image picking needs Chrome/Edge",
		save: "Save",
		saving: "Saving…",
		discard: "Discard",
		unsaved: "Unsaved",
		expand: "Expand",
		collapse: "Collapse",
		saveFailed: "Save failed, please retry"
	}
};
const cn = (...classes) => classes.filter(Boolean).join(" ");
/** The settings-dialog card for the skin namespace (slot key 'skin'). */
function SkinSettingsCard(props) {
	const { t, useSkinCard, applyPatch } = props;
	const snapshot = useSkinCard((state) => state);
	const available = snapshot.loaded;
	const [open, setOpen] = (0, react.useState)(false);
	const [wallpaper, setWallpaper] = (0, react.useState)(SKIN_DEFAULTS.wallpaperUrl);
	const [saving, setSaving] = (0, react.useState)(false);
	const [failed, setFailed] = (0, react.useState)(false);
	const server = snapshot.wallpaperUrl ?? SKIN_DEFAULTS.wallpaperUrl;
	const dirty = wallpaper.trim() !== server;
	(0, react.useEffect)(() => {
		if (dirty) return;
		setWallpaper(server);
	}, [snapshot]);
	if (!available) return null;
	async function commit() {
		setSaving(true);
		setFailed(false);
		try {
			if (!(await applyPatch({ wallpaperUrl: wallpaper.trim() })).ok) setFailed(true);
		} catch {
			setFailed(true);
		} finally {
			setSaving(false);
		}
	}
	const [busy, setBusy] = (0, react.useState)(false);
	const [pickedName, setPickedName] = (0, react.useState)(null);
	(0, react.useEffect)(() => {
		const sync = () => setPickedName(currentPicked()?.name ?? null);
		sync();
		return subscribePicked(sync);
	}, []);
	const canPickLocally = supportsLocalPick();
	async function handlePick() {
		if (!canPickLocally) return;
		setBusy(true);
		setFailed(false);
		if (!await pickAndSet()) setFailed(true);
		setBusy(false);
	}
	async function handleClearLocal() {
		setBusy(true);
		setFailed(false);
		await clearPicked();
		setBusy(false);
	}
	const title = t("title");
	return (0, react_jsx_runtime.jsxs)("li", {
		"data-skin-settings": true,
		className: cn("skin-settings-card", open && "skin-settings-card-open"),
		children: [(0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "skin-settings-header",
			"aria-expanded": open,
			"aria-label": `${t(open ? "collapse" : "expand")}: ${title}`,
			onClick: () => setOpen(!open),
			children: [
				(0, react_jsx_runtime.jsxs)("span", {
					className: "skin-settings-headText",
					children: [(0, react_jsx_runtime.jsx)("span", {
						className: "skin-settings-name",
						children: title
					}), (0, react_jsx_runtime.jsx)("span", {
						className: "skin-settings-description",
						children: t("description")
					})]
				}),
				dirty ? (0, react_jsx_runtime.jsx)("span", {
					className: "skin-settings-pending",
					children: t("unsaved")
				}) : null,
				(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: cn("skin-settings-chevron", open && "skin-settings-chevron-open") })
			]
		}), open ? (0, react_jsx_runtime.jsxs)("div", {
			className: "skin-settings-body",
			children: [(0, react_jsx_runtime.jsxs)("label", {
				className: "skin-settings-row",
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: "skin-settings-label",
						children: t("wallpaperUrl")
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "text",
						value: wallpaper,
						placeholder: "https://…",
						spellCheck: false,
						onChange: (e) => setWallpaper(e.target.value)
					}),
					(0, react_jsx_runtime.jsxs)("span", {
						className: "skin-settings-controls",
						children: [canPickLocally ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: "skin-settings-pick",
							disabled: busy,
							onClick: () => {
								handlePick();
							},
							children: t("pick")
						}) : (0, react_jsx_runtime.jsx)("span", {
							className: "skin-settings-hint",
							children: t("unsupported")
						}), pickedName ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: "skin-settings-pick",
							disabled: busy,
							onClick: () => {
								handleClearLocal();
							},
							children: t("removeLocal")
						}) : null]
					}),
					pickedName ? (0, react_jsx_runtime.jsxs)("span", {
						className: "skin-settings-hint",
						children: [t("picked"), pickedName]
					}) : null,
					(0, react_jsx_runtime.jsx)("span", {
						className: "skin-settings-hint",
						children: t("wallpaperUrlHint")
					})
				]
			}), (0, react_jsx_runtime.jsxs)("div", {
				className: "skin-settings-footer",
				children: [
					failed ? (0, react_jsx_runtime.jsx)("p", {
						className: "skin-settings-failed",
						role: "status",
						children: t("saveFailed")
					}) : null,
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "skin-settings-discard",
						disabled: !dirty || saving,
						onClick: () => {
							setWallpaper(server);
							setFailed(false);
						},
						children: t("discard")
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "skin-settings-save",
						disabled: !dirty || saving,
						onClick: () => {
							commit();
						},
						children: saving ? t("saving") : t("save")
					})
				]
			})]
		}) : null]
	});
}
/**
* Register the card into the settings dialog:
*  - locale dictionary under a namespace we own;
*  - one `settings.plugin.item` slot entry keyed by the 'skin' namespace.
* The dialog dispatches it only while the host serves that namespace, so our
* own registration stays invisible if the settings service is absent.
*/
function installSkinSettingsCard(ctx, store) {
	const dict = "dsh-web-ui-skin";
	try {
		ctx.locale?.register(dict, SKIN_CARD_LOCALE);
	} catch {}
	try {
		const slots = ctx.slots;
		slots?.inject("settings.plugin.item", function* () {
			yield slots.register({
				name: "settings.plugin.item",
				key: "skin",
				locale: dict,
				inject: () => ({
					hooks: { skinCard: store },
					applyPatch: async (patch) => {
						try {
							const res = await fetch(SKIN_CONFIG_URL, {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({ patch })
							});
							if (!res.ok) return {
								ok: false,
								error: (await res.text()).slice(0, 200)
							};
							return { ok: true };
						} catch {
							return {
								ok: false,
								error: "network"
							};
						}
					}
				})
			}, SkinSettingsCard);
		});
	} catch {}
}

//#endregion
//#region lib/client/index.js
const BG_URL = "/plugins/@crack/dsh-web-ui-skin/bg.jpg";
const BG = `url("${BG_URL}") center center / cover no-repeat fixed #3a6ea5`;
let settings = {};
/** Whether the sidebar archive entry may be shown (settings.archiveButton). */
let archiveEnabled = true;
/** Snapshot source for the settings-dialog card (kept in sync on refresh). */
const cardStore = createSkinCardStore();
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
	const body = document.body;
	const root = document.getElementById("root");
	body.dataset.dshSkin = "";
	installSkinSettingsCard(ctx, cardStore);
	let currentBg = BG;
	function applyBg() {
		root.style.background = currentBg;
	}
	function clamp01(v) {
		return Math.min(1, Math.max(0, v));
	}
	/** Apply all settings-card knobs to the live page. */
	function applyConfig() {
		const url = (settings.wallpaperUrl ?? "").trim();
		const src = currentPicked()?.blobUrl ?? (url || BG_URL);
		const applyBgSrc = (fit) => {
			currentBg = `url("${src}") center center / ${fit} no-repeat fixed #3a6ea5`;
			applyBg();
		};
		const probe = new Image();
		probe.onload = () => {
			const winAspect = window.innerWidth / Math.max(1, window.innerHeight);
			const imgAspect = probe.naturalWidth / Math.max(1, probe.naturalHeight);
			const fit = imgAspect < winAspect * .85 || imgAspect > winAspect * 1.18 ? "contain" : "cover";
			applyBgSrc(fit);
		};
		probe.onerror = () => applyBgSrc("cover");
		probe.src = src;
		const glass = clamp01(typeof settings.glassOpacity === "number" ? settings.glassOpacity : .48);
		body.style.setProperty("--skin-glass", String(glass));
		archiveEnabled = settings.archiveButton !== false;
	}
	applyConfig();
	subscribePicked(() => applyConfig());
	initPicked();
	const obs = new MutationObserver(() => {
		if (root.style.background !== currentBg) applyBg();
	});
	obs.observe(root, {
		attributes: true,
		attributeFilter: ["style"]
	});
	function moveSeat() {
		document.querySelectorAll(".wSkVaW_scrollBody").forEach((sb) => {
			if (sb.querySelector("[data-conversation-composer-overlay]")) return;
			const root = sb.closest(".wSkVaW_root");
			const active = !!root && root.dataset.phase === "active";
			const seat = sb.querySelector(":scope > [data-composer-seat]");
			if (active && seat && seat.parentNode === sb) sb.insertAdjacentElement("afterend", seat);
			else if (!active) (sb.parentNode ? sb.parentNode.querySelectorAll(":scope > [data-composer-seat]") : []).forEach((s) => {
				if (s.parentNode !== sb) sb.appendChild(s);
			});
		});
	}
	function atBottomNow(panel) {
		const floor = Math.max(0, panel.scrollHeight - panel.clientHeight);
		return panel.scrollTop >= floor - 25;
	}
	let seatRO = null;
	let lastSeat = null;
	function onSeatResize() {
		const sb = document.querySelector(".wSkVaW_scrollBody");
		if (sb && atBottomNow(sb)) sb.scrollTop = sb.scrollHeight;
	}
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
	let lastCrumbs = null;
	function onDomChange() {
		if (archiveEnabled) ensureArchiveButton();
		else {
			document.querySelectorAll("[data-skin-archive-btn]").forEach((el) => el.remove());
			closeArchiveView();
		}
		moveSeat();
		const seat = document.querySelector("[data-composer-seat]");
		if (seat !== lastSeat) {
			if (seatRO) seatRO.disconnect();
			seatRO = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onSeatResize) : null;
			if (seatRO && seat) seatRO.observe(seat);
			lastSeat = seat;
		}
		const chatActive = !!document.querySelector(".wSkVaW_scrollBody .EvIC1a_root");
		const crumb = document.querySelector(".wSkVaW_crumbs");
		const crumbText = crumb ? crumb.textContent : "";
		const sb = document.querySelector(".wSkVaW_scrollBody");
		if (chatActive && sb) {
			if (crumbText !== lastCrumbs) {
				lastCrumbs = crumbText;
				sb.scrollTop = sb.scrollHeight;
			}
		} else if (!chatActive) lastCrumbs = crumbText;
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
	async function refreshConfig() {
		for (let attempt = 0;; attempt++) try {
			const res = await fetch(SKIN_CONFIG_URL, { cache: "no-store" });
			if (!res.ok) throw new Error("config endpoint: " + res.status);
			settings = await res.json();
			applyConfig();
			onDomChange();
			cardStore.set({
				loaded: true,
				wallpaperUrl: settings.wallpaperUrl ?? SKIN_DEFAULTS.wallpaperUrl,
				glassOpacity: settings.glassOpacity ?? SKIN_DEFAULTS.glassOpacity,
				archiveButton: settings.archiveButton ?? SKIN_DEFAULTS.archiveButton
			});
			return;
		} catch {
			if (attempt >= 3) return;
			await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
		}
	}
	refreshConfig();
	let offRemote = null;
	try {
		const remote = ctx.get("remote");
		if (remote) offRemote = remote.$on("settings/document-updated", () => {
			refreshConfig();
		});
	} catch {}
	try {
		ctx.effect(() => () => {
			obs.disconnect();
			obs2.disconnect();
			if (seatRO) seatRO.disconnect();
			offRemote?.();
			disposePicked();
			delete body.dataset.dshSkin;
			root.style.removeProperty("background");
			body.style.removeProperty("--skin-glass");
			document.querySelectorAll("[data-skin-archive-btn]").forEach((el) => el.remove());
			closeArchiveView();
		}, "dsh-web-ui-skin: background");
	} catch {}
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map