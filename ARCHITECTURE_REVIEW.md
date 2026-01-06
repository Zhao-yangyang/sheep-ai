# sheepGPT 项目架构检查报告

> 生成日期: 2026-01-05
> 参考文档: BibiGPT 全栈 AI 实战架构

---

## 一、当前完成状态 vs BibiGPT 架构

| 技术栈模块 | BibiGPT 方案 | 当前状态 | 完成度 |
|-----------|-------------|----------|-------|
| **Runtime** | Bun | ✅ `bun@1.2.10` | 100% |
| **Framework** | Next.js 16 + React 19 | ✅ `next@16` + `react@19` | 100% |
| **API** | tRPC v11 + React Query | ⚠️ 依赖已装，未实现 router | 30% |
| **Database** | Supabase (Postgres + Vector) | ⚠️ 依赖已装，`packages/db` 为空 | 10% |
| **AI** | Vercel AI SDK 6.0 | ✅ `ai@6.0.3` + `@ai-sdk/openai` | 50% |
| **UI** | Tailwind 4 + Shadcn | ❌ 未安装 | 0% |
| **Redis/Queue** | Upstash | ⚠️ .env 配置了，未实现 | 10% |
| **Monorepo** | Bun Workspaces | ✅ 结构完整 | 80% |
| **Husky/Lint** | Husky + Lint-staged + Biome | ✅ 已配置 | 100% |
| **跨平台** | Desktop/Mobile/Plugin | ⚠️ 目录已创建但为空 | 5% |

---

## 二、Monorepo 依赖管理原则

### 2.1 依赖分层策略

Monorepo 的核心理念是**共享逻辑、隔离平台**。依赖安装位置遵循以下原则：

```
sheepgpt-monorepo/
├── package.json              # 根目录：开发工具依赖 (所有包共享)
│   └── devDependencies: typescript, biome, husky, lint-staged
│
├── packages/
│   ├── core/                 # 核心业务逻辑包
│   │   └── dependencies: @trpc/server, ai, zod, zustand, nuqs
│   │
│   ├── db/                   # 数据库包
│   │   └── dependencies: @supabase/supabase-js, supabase (CLI)
│   │
│   └── ui/                   # UI 组件库包
│       └── dependencies: tailwindcss, framer-motion, class-variance-authority
│       └── (Shadcn 组件源码直接复制到此包)
│
└── apps/
    ├── web/                  # Web 应用 (仅 Web 专用依赖)
    │   └── dependencies: next, @sheepgpt/core, @sheepgpt/ui, @sheepgpt/db
    │
    ├── desktop/              # 桌面应用 (仅桌面专用依赖)
    │   └── dependencies: @tauri-apps/api, @sheepgpt/core, @sheepgpt/ui
    │
    ├── mobile/               # 移动应用 (仅移动专用依赖)
    │   └── dependencies: expo, @sheepgpt/core, @sheepgpt/ui
    │
    └── plugin/               # 浏览器插件 (仅插件专用依赖)
        └── dependencies: wxt, @sheepgpt/core, @sheepgpt/ui
```

### 2.2 依赖安装位置速查表

| 依赖类型 | 安装位置 | 原因 |
|---------|---------|------|
| `typescript`, `biome`, `husky` | 根目录 `devDependencies` | 开发工具，所有包共享 |
| `@trpc/server`, `zod`, `ai` | `packages/core` | 核心业务逻辑，被多端引用 |
| `zustand`, `nuqs` | `packages/core` | 状态管理是共享逻辑 |
| `tailwindcss`, `framer-motion` | `packages/ui` | UI 层，被多端引用 |
| `@supabase/supabase-js` | `packages/db` | 数据库客户端，被多端引用 |
| `next` | `apps/web` | 仅 Web 使用的框架 |
| `@tauri-apps/api` | `apps/desktop` | 仅桌面使用 |
| `expo` | `apps/mobile` | 仅移动使用 |
| `wxt` | `apps/plugin` | 仅插件使用 |

### 2.3 packages 与 apps 的职责划分

| 目录 | 职责 | 特点 |
|------|------|------|
| `packages/*` | 共享代码库 | 被多个 apps 引用，不直接运行 |
| `apps/*` | 可运行应用 | 引用 packages，负责平台特定配置 |

---

## 三、当前架构优势

### 3.1 Monorepo 结构正确

```
sheepgpt-monorepo/
├── apps/
│   ├── web/          # Web 主应用 (Next.js 16)
│   ├── desktop/      # 桌面应用 (Tauri) - 预留
│   ├── mobile/       # 移动应用 (Expo) - 预留
│   └── plugin/       # 浏览器插件 (WXT) - 预留
├── packages/
│   ├── core/         # 核心业务逻辑 ("逻辑供应站")
│   ├── db/           # 数据库类型和 Schema - 预留
│   └── ui/           # UI 组件库 - 预留
└── package.json      # Bun Workspaces 配置
```

### 3.2 依赖选择正确

- tRPC v11 (最新 RC 版本)
- Vercel AI SDK 6.0
- Supabase JS v2.89
- React Query v5
- Zod v4 (core) / v3 (web) - **注意：建议统一为 v4**

### 3.3 TypeScript 配置完善

- paths alias 配置 (`@sheepgpt/core`, `@sheepgpt/ui`, `@sheepgpt/db`)
- composite build 启用
- strict mode 开启
- Biome 代码检查

---

## 四、待完善的关键差距

### 优先级 P0 (核心基础)

| 模块 | 当前状态 | 需要完成 |
|------|---------|---------|
| `packages/db` | 空目录 | Supabase 类型生成和 Schema |
| `packages/core` | 仅 placeholder | tRPC router 定义、状态管理 |
| `packages/ui` | 空目录 | Tailwind 4 + Shadcn 组件库 |
| `apps/web` | 基础页面 | 引用 packages，tRPC 客户端集成 |

### 优先级 P1 (业务能力)

| 模块 | 描述 |
|------|------|
| API Routes | tRPC 端点挂载到 Next.js |
| Auth | Supabase 认证集成 (PKCE 流程) |
| AI | AI SDK 调用封装 (generateText/streamText) |
| State | Zustand 全局状态管理 |

### 优先级 P2 (生产就绪)

| 模块 | 描述 |
|------|------|
| Upstash | Rate Limiting + Task Queue (QStash) |
| Analytics | Langfuse (AI 可观测性) / Amplitude (用户行为) |
| CI/CD | GitHub Actions 流水线 |
| Payment | Lemon Squeezy / Stripe 支付集成 |

### 优先级 P3 (跨平台)

| 模块 | 描述 |
|------|------|
| `apps/plugin` | WXT 浏览器插件 |
| `apps/desktop` | Tauri 桌面应用 |
| `apps/mobile` | Expo 移动应用 |

---

## 五、下一步实施计划

### Phase 1: 核心基础搭建

#### Step 1: 初始化 packages/ui (UI 组件库)

```bash
# 进入 ui 包目录
cd packages/ui

# 初始化 package.json
cat > package.json << 'EOF'
{
  "name": "@sheepgpt/ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./*": "./src/*"
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
EOF

# 安装依赖
bun install

# 初始化 Shadcn (组件源码会复制到 src/components/ui/)
bunx shadcn@latest init
```

#### Step 2: 初始化 packages/db (数据库层)

```bash
# 进入 db 包目录
cd packages/db

# 初始化 package.json
cat > package.json << 'EOF'
{
  "name": "@sheepgpt/db",
  "version": "0.1.0",
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/database.types.ts"
  },
  "scripts": {
    "db:types": "supabase gen types typescript --project-id YOUR_PROJECT_ID > src/database.types.ts",
    "db:push": "supabase db push",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.89.0"
  },
  "devDependencies": {
    "supabase": "^2.0.0"
  }
}
EOF

# 安装依赖
bun install

# 初始化 Supabase
bunx supabase init
```

#### Step 3: 完善 packages/core (核心逻辑)

```bash
# 进入 core 包目录
cd packages/core

# 添加状态管理依赖
bun add zustand nuqs

# 创建目录结构
mkdir -p src/trpc/routers
mkdir -p src/hooks
mkdir -p src/stores
mkdir -p src/ai
```

目标结构：

```
packages/core/src/
├── index.ts              # 统一导出
├── trpc/
│   ├── index.ts          # tRPC 初始化
│   ├── context.ts        # 请求上下文 (auth, db)
│   ├── router.ts         # 根 router
│   └── routers/
│       ├── user.ts       # 用户相关
│       └── ai.ts         # AI 相关
├── stores/
│   └── app.store.ts      # Zustand 全局状态
├── hooks/
│   └── use-ai.ts         # AI 相关 hooks
└── ai/
    └── providers.ts      # AI 模型提供商配置
```

#### Step 4: apps/web 集成 packages

```bash
# 进入 web 应用目录
cd apps/web

# 确保引用了所有 packages (package.json 已配置)
# 创建必要目录
mkdir -p app/api/trpc/\[trpc\]
mkdir -p lib
```

目标结构：

```
apps/web/
├── app/
│   ├── api/
│   │   └── trpc/[trpc]/route.ts  # tRPC HTTP 处理 (仅挂载，逻辑在 core)
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    ├── trpc.ts           # tRPC 客户端配置
    └── providers.tsx     # React Query + tRPC Provider
```

---

### Phase 2: 核心业务能力

无论最终业务方向如何，以下模块都是通用的：

| 模块 | 功能 | 安装位置 | 对应文档章节 |
|------|------|---------|-------------|
| 用户认证 | Supabase Auth + PKCE | `packages/db` + `packages/core` | 2.2 Supabase |
| AI 调用封装 | generateText/streamText | `packages/core` | 1.2 Hello World |
| 流式 UI 组件 | Streaming + Skeleton | `packages/ui` | 4.2 流式 UI |
| 配额/限流系统 | Upstash Redis | `packages/core` | 2.4 Task Queue / 5.2 配额 |
| 结构化输出 | Zod Schema | `packages/core` | 1.4 结构化输出 |
| 全局状态 | Zustand | `packages/core` | 4.3 状态管理 |
| URL 状态 | nuqs | `packages/core` | 4.3 状态管理 |

---

### Phase 3: 业务场景建议

既然核心业务还未确定，以下是可以复用此架构的方向：

| 业务方向 | 核心能力 | 架构复用度 |
|---------|---------|-----------|
| AI 写作助手 | streamText + RAG | 90% |
| 文档问答系统 | Embedding + pgvector | 85% |
| 语音转文字工具 | Whisper + Groq | 80% |
| 代码助手 | Tool Calling + Agent | 85% |
| 内容审核/分析 | Vision + Structured Output | 80% |
| 视频/音频摘要 | Map-Reduce + Multi-modal | 95% |

---

## 六、推荐立即执行的命令

```bash
# ========================================
# Step 1: 初始化 packages/ui
# ========================================
cd /path/to/sheepgpt-monorepo/packages/ui
mkdir -p src/components/ui
# 创建 package.json (见上方 Step 1)
bun install
bunx shadcn@latest init

# ========================================
# Step 2: 初始化 packages/db
# ========================================
cd ../db
mkdir -p src
# 创建 package.json (见上方 Step 2)
bun install
bunx supabase init

# ========================================
# Step 3: 完善 packages/core
# ========================================
cd ../core
bun add zustand nuqs
mkdir -p src/trpc/routers src/hooks src/stores src/ai

# ========================================
# Step 4: 创建 apps/web 集成结构
# ========================================
cd ../../apps/web
mkdir -p app/api/trpc/\[trpc\] lib

# ========================================
# Step 5: 根目录重新安装依赖 (链接 workspaces)
# ========================================
cd ../..
bun install
```

---

## 七、技术栈完整配置清单

### 已配置

- [x] Bun 1.2.10 (Runtime)
- [x] Bun Workspaces (Monorepo)
- [x] Next.js 16 (Framework) - `apps/web`
- [x] React 19 (UI Library)
- [x] TypeScript 5.7 (Type Safety)
- [x] Biome (Linting/Formatting) - 根目录
- [x] Husky + Lint-staged (Git Hooks) - 根目录
- [x] tRPC v11 依赖 - `packages/core` (待实现 router)
- [x] Vercel AI SDK 6.0 依赖 - `packages/core` (待实现封装)
- [x] Supabase JS 依赖 - `packages/core` (应迁移到 `packages/db`)

### 待配置

| 依赖 | 目标位置 | 说明 |
|------|---------|------|
| Tailwind CSS 4 | `packages/ui` | UI 样式基础 |
| Shadcn UI | `packages/ui` | 组件源码 |
| Framer Motion | `packages/ui` | 动画库 |
| Zustand | `packages/core` | 全局状态管理 |
| nuqs | `packages/core` | URL 状态同步 |
| Upstash Redis | `packages/core` | 限流/队列 |
| Langfuse | `packages/core` | AI 可观测性 |
| next-intl | `apps/web` | 国际化 (仅 Next.js) |
| WXT | `apps/plugin` | 浏览器插件框架 |
| Tauri | `apps/desktop` | 桌面应用框架 |
| Expo | `apps/mobile` | 移动应用框架 |

---

## 八、注意事项

### 8.1 Zod 版本统一

当前 `packages/core` 使用 Zod v4，`apps/web` 使用 Zod v3。建议统一为 v4：

```bash
cd apps/web
bun add zod@^4.2.1
```

### 8.2 React 版本

当前配置支持 React 18 或 19。Next.js 16 默认使用 React 19，建议保持一致。

### 8.3 跨包引用

apps 引用 packages 时，通过 workspace 协议：

```json
{
  "dependencies": {
    "@sheepgpt/core": "workspace:*",
    "@sheepgpt/ui": "workspace:*",
    "@sheepgpt/db": "workspace:*"
  }
}
```

---

## 九、参考资源

- [BibiGPT 架构文档](https://twitter.com/) - 原始架构参考
- [Next.js 16 文档](https://nextjs.org/docs)
- [tRPC v11 文档](https://trpc.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Bun Workspaces](https://bun.sh/docs/install/workspaces)
- [Tauri](https://tauri.app)
- [Expo](https://expo.dev)
- [WXT](https://wxt.dev)
