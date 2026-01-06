# sheepGPT - AI SaaS 架构学习项目

基于 BibiGPT 架构的现代化 AI SaaS 实践项目，采用 2025 年最新技术栈。

## 🚀 技术栈

### 核心架构
- **Framework**: Next.js 16 + React 19
- **API**: tRPC v11 + React Query
- **Database**: Supabase (Postgres + Vector)
- **AI**: Vercel AI SDK 6.0
- **UI**: Tailwind CSS + Shadcn UI

### 跨平台支持
- **Web** (Next.js)
- **Desktop** (Tauri)
- **Extension** (WXT)
- **Mobile** (Expo)

### 开发工具
- **Package Manager**: Bun (快 20 倍!)
- **Monorepo**: Bun Workspaces
- **Linting**: Biome (替代 ESLint + Prettier)
- **Type Safety**: TypeScript + tRPC + Zod

## 📦 项目结构

```
sheepgpt-monorepo/
├── apps/
│   ├── web/          # Next.js Web 应用
│   ├── desktop/      # Tauri 桌面应用
│   ├── plugin/       # WXT 浏览器插件
│   └── mobile/       # Expo 移动应用
├── packages/
│   ├── core/         # 共享业务逻辑
│   ├── ui/           # Shadcn UI 组件
│   └── db/           # 数据库 Schema
└── README.md
```

## 🛠️ 快速开始

### 1. 安装依赖

```bash
# 推荐使用 Bun (比 npm 快 20 倍!)
curl -fsSL https://bun.sh/install | bash

# 或使用 npm
npm install
```

### 2. 环境配置

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，添加你的 API 密钥
```

### 3. 数据库设置

```bash
# 推送数据库 Schema
bun run db:push

# 生成 TypeScript 类型
bun run db:types
```

### 4. 启动开发服务器

```bash
# 启动 Web 应用
bun run dev

# 或启动所有应用
bun run dev:all
```

## 🎯 核心功能

### AI 功能
- [x] 视频转录 (Groq Whisper)
- [x] 智能摘要 (Map-Reduce + Prompt Chain)
- [x] RAG 语义搜索 (pgvector)
- [x] 多模态分析 (GPT-5 + Gemini)

### 开发体验
- [x] 全栈类型安全 (tRPC)
- [x] 流式 UI (Streaming)
- [x] 实时订阅 (tRPC Subscriptions)
- [x] 错误边界 (Error Boundaries)

### 商业化
- [ ] 支付集成 (Lemon Squeezy)
- [ ] 用户配额管理
- [ ] 限流保护 (Redis)
- [ ] 使用统计

## 🏗️ 架构亮点

### 1. 类型安全体系
```typescript
// 前后端共享类型
export const ContentSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  // ... 自动生成 TypeScript 类型
});

// 编译时发现错误，而非运行时
const content: Content = await trpc.content.get.query({ id: '123' });
```

### 2. AI 集成
```typescript
// Vercel AI SDK - 统一接口
const summary = await summarizeContent(transcript, segments, {
  length: 'medium',
  contentType: 'tutorial',
});
```

### 3. 流式 UI
```typescript
// 实时流式输出
for await (const chunk of summarizeContentStream(transcript, segments)) {
  updateUI(chunk);
}
```

### 4. 数据库设计
```sql
-- 向量搜索 (pgvector)
CREATE EXTENSION vector;

-- RLS 安全防护
CREATE POLICY user_content_policy ON user_contents
  USING (auth.uid() = user_id);
```

## 📚 学习资源

### 核心技术文档
- [Next.js 16](https://nextjs.org/docs)
- [tRPC](https://trpc.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Supabase](https://supabase.com/docs)
- [Bun](https://bun.sh/docs)

### AI 最佳实践
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [RAG Architecture](https://python.langchain.com/docs/extras/pull_request_template)
- [Vector Databases](https://www.pinecone.io/learn/vector-database/)

## 🔄 开发工作流

### 1. 添加新功能

```bash
# 1. 在 packages/core 中添加业务逻辑
mkdir packages/core/src/api/trpc/server/routers/my-feature.ts

# 2. 定义类型和 Schema
export const MyFeatureSchema = z.object({
  // ... 定义输入输出
});

# 3. 实现 tRPC 路由
export const myFeatureRouter = {
  myProcedure: protectedProcedure
    .input(MyFeatureSchema)
    .query(async ({ ctx, input }) => {
      // 业务逻辑
    }),
};

# 4. 前端使用
const { data } = useTRPCQuery('myFeature.myProcedure', {
  input: { /* ... */ }
});
```

### 2. 添加 AI 功能

```typescript
// 1. 在 packages/core/lib/ai/ 中实现
export async function myAIFunction(input: string): Promise<Result> {
  const { text } = await generateText({
    model: openai('gpt-4'),
    messages: [{ role: 'user', content: input }]
  });
  return parseResult(text);
}

// 2. 在 tRPC 路由中调用
export const aiRouter = {
  myAI: protectedProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await myAIFunction(input.query);
    }),
};
```

### 3. 数据库迁移

```sql
-- 1. 创建迁移文件
-- packages/db/migrations/2024_01_01_add_feature.sql

ALTER TABLE user_contents ADD COLUMN new_feature jsonb;

-- 2. 推送变更
bun run db:push

-- 3. 自动生成类型
bun run db:types
```

## 🎓 学习路径

### 阶段 1: 基础架构 (当前阶段)
- [x] Monorepo 设置
- [x] tRPC 类型安全
- [x] 基础 AI 集成
- [x] 项目结构

### 阶段 2: 核心功能
- [ ] 视频转录流程
- [ ] 摘要引擎
- [ ] RAG 搜索
- [ ] 流式 UI

### 阶段 3: 数据库
- [ ] Supabase 设置
- [ ] RLS 策略
- [ ] pgvector 向量搜索
- [ ] 实时订阅

### 阶段 4: 前端
- [ ] Shadcn UI
- [ ] 状态管理 (Zustand + React Query)
- [ ] 国际化 (i18n)
- [ ] 响应式设计

### 阶段 5: 商业化
- [ ] 支付系统
- [ ] 用户配额
- [ ] 限流保护
- [ ] 统计分析

### 阶段 6: 跨平台
- [ ] 浏览器插件
- [ ] 桌面应用
- [ ] 移动应用
- [ ] 自动化部署

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范
- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `refactor:` 代码重构
- `test:` 测试相关

## 📄 许可证

MIT License

## 🙏 致谢

- [BibiGPT](https://github.com/bibigpt) - 原始架构参考
- [Next.js](https://nextjs.org/) - React 框架
- [tRPC](https://trpc.io/) - 端到端类型安全
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 集成
- [Supabase](https://supabase.com/) - 后端即服务

---

**开始你的 AI SaaS 之旅！** 🚀
