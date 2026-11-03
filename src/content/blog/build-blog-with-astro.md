---
title: 用 Astro 搭一个博客：从零到上线
description: 一份可以直接照做的清单，包含目录结构、内容集合、路由和部署，附常见坑。
pubDate: 2026-08-20
tags: [Astro, 前端]
hue: 210
---

这篇文章记录这个站点是怎么搭起来的，如果你也想用 Astro，可以照着走一遍。

## 为什么是 Astro

静态站点生成器不少，选 Astro 主要是三点：

- **默认零 JavaScript**，页面加载快
- **以内容为中心**，Markdown 是第一公民
- **需要交互时可以局部加**，比如暗色模式，不用整站上框架

## 初始化

最省事的方式是用官方脚手架：

```bash
npm create astro@latest my-blog -- --template blog
cd my-blog
npm install
npm run dev
```

也可以像我这样手动来：先建 `package.json`，只装 `astro`。

```bash
npm install astro @astrojs/rss @astrojs/sitemap
```

## 目录结构

一个够用的博客长这样：

```text
src/
├── components/      # 卡片、标签、页头页脚
├── content/
│   └── blog/        # 所有 Markdown 文章
├── layouts/         # 页面骨架
├── lib/             # 日期格式化、阅读时长
├── pages/           # 路由，文件名即 URL
│   ├── blog/[...slug].astro
│   ├── tags/[tag].astro
│   └── index.astro
├── styles/
└── content.config.ts
```

## 内容集合

Astro 5 之后用 `glob` loader 定义集合：

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

`schema` 里的字段会在构建时校验，写错 frontmatter 会直接报错——这是好事，比上线后才发现少了个字段强。

## 路由

动态路由用 `[...slug].astro`：

```astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id } }));
}
```

## 几个踩过的坑

| 坑 | 现象 | 解法 |
| --- | --- | --- |
| 时区 | 日期少一天 | `z.coerce.date()` 配合 ISO 字符串，别用 `2026-10-20 08:00` |
| 中文 URL | 标签页 404 | 链接用 `encodeURIComponent`，目录名交给框架处理 |
| 主题闪烁 | 刷新时先白后黑 | 在 `<head>` 里内联脚本先设置 `data-theme` |

## 部署

推到 GitHub，接 Cloudflare Pages 或 Vercel，构建设置：

```text
Build command:  npm run build
Output dir:     dist
```

之后每次 `git push` 自动发布。
