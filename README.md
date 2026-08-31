# dsh-archive

会话归档管理插件——面向 [DeepSeek Harness](https://github.com/deepseek-ai/dsh) Web GUI（dsh web）。

## 功能

### 归档会话管理
- 侧边栏"添加工作区"按钮右侧新增归档入口按钮（28px 圆形，匹配原生 iconButton 风格）
- 按钮 hover 显示气泡提示"归档会话" / "工作区会话"（500ms 延迟）
- 点击切换归档视图，原位覆盖工作区列表区域，布局与原生会话树一致
- 归档视图按工作区分组，分组可折叠，时间降序排列
- 每行 hover 出现三点菜单：**重命名 / 还原 / 删除**
  - **重命名**：原生弹窗——自动聚焦全选、中文输入法保护、Enter 确认、Escape/遮罩关闭、错误内联提示
  - **还原（unarchive）**：回到原工作区位置
  - **删除**：原生确认弹窗（红色危险按钮 + 后果说明 + 进行中状态），移除日志文件，不可恢复
- dsh 原生只有归档能力（`archiveSession`），本插件补齐了原生没有的 **重命名 / 恢复 / 删除** 操作

### API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/plugins/@crack/dsh-archive/api/archived` | 获取归档会话列表（按工作区分组） |
| POST | `/plugins/@crack/dsh-archive/api/rename-session` | 重命名会话 |
| POST | `/plugins/@crack/dsh-archive/api/unarchive` | 还原归档会话 |
| POST | `/plugins/@crack/dsh-archive/api/delete-session` | 删除归档会话 |

## 安装

```powershell
# 1. 链接本地包到 dsh web profile（一次性）
dsh plugin --profile web add "link:E:\path\to\dsh-archive"

# 2. 在 profile patch 中注册插件
#    编辑 C:\Users\<you>\.dsh\profiles\web\cordis.patch.yml，追加：
#    - insert:
#        - id: archive
#          name: '@crack/dsh-archive'

# 3. 重启 dsh web
```

## 开发

需要 Node + pnpm；dsh runtime 与 devDependencies 需版本对齐。

```powershell
pnpm install          # 安装构建链（typescript / tsdown）
pnpm run build        # 一次构建：tsc(host) + tsc(client) + tsdown
pnpm run typecheck    # 类型检查
```

- 编辑 `src/client/skin.css`（归档视图样式）或 `src/client/index.ts`（浏览器端逻辑）
- 编辑 `src/index.ts`（宿主端：API 路由）
- 构建完成后浏览器自动热替换（client-hmr，无需刷新/重启）

## 卸载

```powershell
# 1. 从 profile 中移除插件
dsh plugin --profile web remove @crack/dsh-archive

# 2. 删除 cordis.patch.yml 中的 archive 注册行

# 3. 重启 dsh web
```

## 项目结构

```
dsh-archive/
├── src/index.ts                    # host 面：注册 API 路由
├── src/client/index.ts             # 浏览器端逻辑（归档按钮注入 + 归档视图管理）
├── src/client/archive.tsx          # 归档视图 React 组件（原生 Modal/Button 复用）
├── src/client/skin.css             # CSS 样式（归档视图 + 按钮 + 菜单）
├── scripts/skin-inline-plugin.mjs  # tsdown 插件：内联 CSS
├── tsconfig.json / tsconfig.client.json  # host/client 双 program
├── tsdown.config.ts                # client bundle 协议构建
├── lib/client.js                   # 浏览器端 bundle
├── lib/index.js                    # 宿主端入口
├── cordis.patch.yml                # 插件自带注册 patch（参考）
└── package.json                    # dsh.client 声明
```