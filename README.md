# 屿音电商 C 端统一前台 (Yuyin C-Unified-Frontend)

![屿音品牌首页](https://raw.githubusercontent.com/wushiboW/Yuyin-E-commerce-platform-fe/main/front-end/c-unified-frontend/public/banner.png)

> 高奢极简·东方哲学 — 一套设计系统，三端无缝体验

## 🎬 项目演示

### 登录页沉浸式体验

<video src="https://raw.githubusercontent.com/wushiboW/Yuyin-E-commerce-platform-fe/main/front-end/c-unified-frontend/public/media/login-demo.webm" controls width="100%"></video>

*山峦水墨 · 东方留白 · 动态品牌叙事 (20s / 5.8MB)*

### 首页全屏品牌叙事

<video src="https://raw.githubusercontent.com/wushiboW/Yuyin-E-commerce-platform-fe/main/front-end/c-unified-frontend/public/media/home-demo.mp4" controls width="100%"></video>

*从「高奢极简·东方哲学」到「雅致生活·从容自在」到「简约即丰盈」，三段式品牌内容滚动呈现（52s / 5.1MB）。*

> 视频源文件已纳入仓库 `public/media/` 目录,使用 GitHub raw CDN 分发,首次 push 后即生效。

---

屿音电商面向 C 端用户的统一前端应用,整合用户中心、电商主应用、购物系统、支付金融中心、订单中心、营销活动中心六大模块,提供**一个应用、一次加载、无缝跳转**的全流程购物体验。

## ✨ 核心特性

| 特性 | 说明 |
|------|------|
| 🎨 **品牌统一** | 严格遵循「高奢极简·东方哲学」品牌 VI,墨黑/月白/金砂/竹青/楮色五色克制运用 |
| 📱 **三端同源** | 桌面端 1440+ / 移动端 H5 360px / 微信小程序 一套代码、三端渲染 |
| ⚡ **极简首屏** | 主入口 JS 414KB(gzip),最大单 chunk 277KB,首屏 3 秒内可交互 |
| 🔤 **字体自托管** | Noto Sans/Serif SC 字符子集化后 1.0MB(原 11MB,降 -90.3%) |
| 🧩 **路由级代码分割** | 6 大功能模块按页拆包,访问时按需加载,无重复请求 |
| 🌗 **深浅主题** | 同一套设计令牌驱动,自动适配用户系统偏好 |

## 🛠 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript 5 |
| 构建 | Vite 5(manualChunks 智能分包) |
| 样式 | Tailwind CSS 3 + CSS Variables 主题令牌 |
| 路由 | React Router DOM 6 |
| 状态 | Zustand(全局) + TanStack React Query(服务端) |
| 网络 | Axios + 统一请求拦截器(鉴权/错误/重试) |
| 三端 | DesktopLayout / MobileLayout / MiniProgramLayout |

## 📁 项目结构

```
front-end/c-unified-frontend/
├── public/
│   ├── fonts/         # 字符子集化 Noto SC(6 weights, 1MB)
│   ├── media/         # 演示视频(登录页 webm+mp4 双格式)
│   └── videos/        # 登录页背景视频(login-bg.mp4 / login-bg2.mp4)
├── src/
│   ├── api/           # 统一 API 层,封装所有后端微服务
│   ├── components/    # 17 个原子组件(Button/Input/Card/...)
│   ├── contexts/      # React Context(Navbar 等)
│   ├── features/      # 六大功能模块
│   │   ├── cart/      #   购物车
│   │   ├── marketing/ #   营销活动
│   │   ├── order/     #   订单中心
│   │   ├── payment/   #   支付金融
│   │   ├── product/   #   商品模块
│   │   └── user/      #   用户中心(Login/Profile)
│   ├── hooks/         # 自定义 Hooks
│   ├── layouts/       # 三端布局组件
│   ├── stores/        # Zustand stores
│   └── styles/        # globals.css(@font-face + 主题令牌)
├── index.html         # 含字体预加载
├── vite.config.ts     # manualChunks 函数式分包
└── package.json
```

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器(默认 http://localhost:3000)
npm run dev

# 3. 生产构建
npm run build

# 4. 预览构建产物
npm run preview
```

### 环境变量

| 文件 | 用途 |
|------|------|
| `.env.development` | 开发环境(localhost:8080) |
| `.env.production` | 生产环境(api.yuyin.com) |

### 脚本命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式启动 |
| `npm run dev:prod` | 生产环境配置启动 |
| `npm run build` | 默认构建 |
| `npm run build:dev` | 开发环境构建 |
| `npm run build:prod` | 生产环境构建 |
| `npm run type-check` | TypeScript 类型检查 |
| `npm run preview` | 预览构建产物 |

## 📐 三端适配

本项目遵循屿音电商「C 端统一前台 + B 端独立中台」架构,同时适配三种客户端:

- **🖥 桌面端 (Desktop)** — 1440px+ 宽屏,完整顶部导航 + 侧边分类
- **📱 移动端 H5 (Mobile)** — 360px 唯一断点,单列流式,底部 Tab 栏
- **💬 微信小程序 (MiniProgram)** — 原生导航 + 自定义 TabBar,主包 < 2MB

自动检测设备类型并切换对应布局,共享同一套路由、状态管理、设计令牌。

## 🎨 设计规范

参考 [`./CLAUDE.md`](./CLAUDE.md),遵循:

- **品牌调性优先**:极简克制、留白为王、东方哲学
- **移动优先**:360px 断点,所有按钮 ≥ 44px 触控区
- **原子化组件**:单一职责、低耦合高内聚
- **性能优先**:路由级懒加载、字体子集化、关键资源 preload
- **可访问性**:WCAG 2.1 颜色对比度、语义化 HTML、键盘导航

## 📊 性能基线(2026-06)

| 指标 | 基线 | 优化后 | 变化 |
|------|------|--------|------|
| JS 总大小(gzip) | 430KB | 414KB | **-3.7%** |
| 最大单 chunk(gzip) | 321KB | 277KB | **-13.8%** |
| 字体文件 | 11.0MB | 1.0MB | **-90.3%** |
| 首屏可交互(估算) | < 3.5s | < 3.0s | -0.5s |

> 详细 bundle 分析、字体子集化 PoC、性能验证报告见 [`.omc/plans/first-load-bundle-optimization.BASELINE.md`](./.omc/plans/first-load-bundle-optimization.BASELINE.md)

## 📚 相关文档

- [设计开发规范(本仓库根目录 CLAUDE.md)](../../.claude/CLAUDE.md)
- [服务地址与端口](../../project_materials/SERVICES.md)
- [系统架构图](../../architecture_diagram/)
- [Bundle 优化方案](./.omc/plans/first-load-bundle-optimization.md)

---

> 屿音电商 — 高奢极简·东方哲学
> *传承东方美学,融合现代设计,为忙碌造从容,雅致的生活空间*
