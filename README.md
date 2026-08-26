# dsh-web-ui-skin

田园小屋皮肤（Pastoral Cottage Skin）—— 面向 DeepSeek Harness Web GUI（dsh web）的纯 UI 换肤插件。

![田园小屋皮肤](docs/screenshot.jpg)

## 功能

### 壁纸与整体氛围
- 3840x2160 田园风格壁纸全屏铺底，**自适应缩放**：图片比例接近屏幕时 `cover` 铺满，竖图/超宽图自动切 `contain` 完整显示、不裁剪
- `#root` / 布局 frame 全透明，壁纸完全透出；明暗主题自动适配
- 天空蓝品牌色、柔和边框、细滚动条；tooltip 深底白字

### 壁纸设置卡片（dsh rc.7 设置页扩展）
- 在 GUI **设置 → 插件 → 插件配置** 页新增「壁纸」卡片（与内置 shell/agent-loop/web-search 卡片同款可折叠外观、暂存式保存/放弃、未保存徽章）
- **选择本机图片**：用浏览器 File System Access API 弹系统文件对话框，**文件原地使用、零拷贝**（不复制进 DSH）；句柄持久化在浏览器 IndexedDB，重启后自动恢复；仅 Chrome/Edge 支持，其他浏览器不显示该入口
- **移除本机图片**：清除句柄，回退到 URL 设置或内置壁纸
- **自定义壁纸 URL**：手动填远程图片地址；来源优先级 = 本机图片 > URL > 内置壁纸
- 设置通过宿主 `ctx.settings` 持久化（`cottage` 命名空间），改动即时生效、无需重启
- API：`/plugins/@crack/dsh-web-ui-skin/api`（GET/POST /config）
- **要求 dsh ≥ rc.7**（设置卡片机制在 rc.7 引入）；本机图片选择要求 Chromium 内核浏览器


### 面板与透明度
- 中央消息面板：与输入框同宽（780px）居中、85% 不透明、直角，左右边缘 2px 渐变淡出，与壁纸平滑衔接
- 顶部标题栏、侧边栏、输入区（统计条 + 输入卡）统一使用 `--dsw-specific-input-major`（85%），透明度一致
- 消息内容保持 748px 阅读宽度

### 滚动与输入区布局
- 输入框座位整体移出滚动容器：消息滚动在输入框顶部截断，文本不会从输入框后面穿过
- 会话切换自动滚动到底部；加载历史/新消息时保持底部
- 自绘"回到底部"按钮：水平居中于面板、位于输入框上方，滚离底部自动出现，点击平滑回底
- 保留 dsh 原生滚动监听，流式输出自动跟随

### 特殊状态
- 新建对话（hero 欢迎态）：解除面板约束，恢复全宽布局，标题与输入框居中悬浮于壁纸
- 轨迹页（点击"轨迹"后展示的一切，含弹层/菜单）：保持 dsh 默认外观（明暗主题均生效）
- 会话统计条加宽至与输入框同宽，完整显示轮次/步数/耗时等指标
- 侧栏会话列表底部渐隐条移除


### 归档会话管理（皮肤扩展）
- 侧边栏"添加工作区"按钮右侧新增 📦 归档入口
- 面板列出全部归档会话（标签 = 工作目录名，时间 = 创建时间）
- 分组与排序跟随原生"视图选项"（按工作区/单列、按时间/手动），分组可折叠
- 每行 hover 出现三点菜单：**重命名 / 还原 / 删除**
  - 重命名：与工作区会话重命名一致的原生弹窗——自动聚焦全选、中文输入法保护、Enter 确认、Escape/遮罩关闭、错误内联提示
  - 还原（unarchive）：回到原工作区位置
  - 删除：与工作区一致的原生确认弹窗（红色危险按钮 + 后果说明 + 进行中状态），移除日志文件，不可恢复
- dsh 原生只有归档能力（archiveSession），本插件补齐了原生没有的 **重命名 / 恢复 / 删除** 操作
- API：`/plugins/@crack/dsh-web-ui-skin/api`（GET /archived、POST /rename-session、POST /unarchive、POST /delete-session）


### 输入框 @ 文件/会话引用（已移除——由 dsh 原生提供）
- dsh rc.8 起，原生 `@` 菜单支持引用文件和会话，本插件曾自带的实现已删除，避免与原生功能冲突。


## 安装

插件通过符号链接安装到 dsh web profile：

```powershell
# 1. 链接安装（一次性）
dsh plugin --profile web add "link:E:\path\to\dsh-web-ui-skin"

# 2. 在 profile patch 中注册插件行
#    编辑 C:\Users\<you>\.dsh\profiles\web\cordis.patch.yml，追加：
#    - insert:
#        - id: dsh-web-ui-skin
#          name: '@crack/dsh-web-ui-skin'

# 3. 保存后 dsh 自动热重载（boot HMR 重读 patch），无需重启
```

## 开发

需要 Node + pnpm；**dsh 运行时与 devDependencies 均需 0.1.0-rc.7**（设置卡片为 rc.7 新能力）。

```powershell
pnpm install          # 安装构建链（typescript / tsdown）
pnpm run build        # 一次构建：tsc(host) + tsc(client) + tsdown
pnpm run watch        # 监听模式：改 src/ 自动重建
pnpm run typecheck    # 类型检查
```

- 编辑 `src/client/skin.css`（样式）或 `src/client/index.ts`（浏览器端逻辑）
- 替换 `assets/bg.jpg`（壁纸原图，由 host 路由 serve）
- 构建完成后浏览器自动热替换（client-hmr，无需刷新/重启）

## 卸载

1. 删除 `cordis.patch.yml` 中的 `dsh-web-ui-skin` 注册行
2. 重启 dsh web
3. （可选）`dsh plugin --profile web remove @crack/dsh-web-ui-skin`

## 项目结构

```
dsh-web-ui-skin/
├── src/index.ts                    # host 面：注册 bg.jpg / api 路由 + skin 设置命名空间
├── src/client/index.ts             # 浏览器端逻辑（apply）+ 配置实时应用
├── src/client/settings-card.tsx    # 设置弹窗壁纸卡片（可折叠外壳 + 本机图片/URL）
├── src/client/local-wallpaper.ts   # File System Access API 零拷贝本机图片（IndexedDB 句柄）
├── src/client/archive.tsx          # 归档视图 React 组件（原生 Modal/Button 复用）
├── src/client/skin.css             # 皮肤 CSS 源文件（构建时内联注入）
├── assets/bg.jpg                   # 壁纸原图（host 路由 serve）
├── scripts/skin-inline-plugin.mjs  # tsdown 插件：内联 CSS
├── scripts/dev.mjs                 # watch 并行构建
├── tsconfig.json / tsconfig.client.json  # host/client 双 program
├── tsdown.config.ts                # client bundle 协议构建
├── lib/client.js                   # 浏览器端 bundle（已构建，clone 即用）
├── lib/index.js                    # 宿主端入口
├── cordis.patch.yml                # 插件自带注册 patch（参考）
├── skin.json                       # 皮肤元数据
└── package.json                    # dsh.client 声明（devDeps 钉定 0.1.0-rc.7）
```

## 图片来源与版权

- 壁纸：《田园小屋风景》4K（3840x2160），来源于 [彼岸图网](https://pic.netbian.com/tupian/34434.html)（[原文页面](https://pic.netbian.com/tupian/34434.html)）
- 彼岸图网声明：壁纸图片资源来源于互联网和网友分享，**请勿用于商业用途**，图片版权归原创作者所有
- 本插件仅供个人学习与使用，**禁止任何商业用途**；如需商用或分发，请自行替换为你拥有版权的图片
- 如涉及侵权，请联系原作者或彼岸图网（客服QQ55346968）处理，作者会第一时间移除相关资源

## 说明

- 纯 UI 换肤，不修改 DSH 自带代码；归档弹窗与工作区 UI 像素级一致
- 壁纸为个人图片，如用于分发请替换为你拥有版权的图片
- DSH 版本升级若改变 token 名或组件结构，需同步微调皮肤 CSS
