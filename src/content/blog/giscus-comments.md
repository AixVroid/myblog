---
title: 用 Giscus 给静态博客加评论
description: 静态站点没有后端，但可以把评论托管到 GitHub Discussions，十分钟接完。
pubDate: 2026-10-10
tags: [Astro, 工具]
hue: 200
---

静态博客没有数据库，加评论通常有三种解法：

| 方案 | 原理 | 代价 |
| --- | --- | --- |
| 第三方 SaaS | Disqus 等托管服务 | 加载慢、有广告、数据不在自己手里 |
| 自建服务 | Waline / Artalk + 服务器 | 要维护一个后端 |
| GitHub Discussions | Giscus 把评论映射到 issue | 读者需要 GitHub 账号 |

我选了第三种，因为**不用维护任何东西**。

## 步骤

### 1. 准备仓库

新建一个公开仓库（可以就叫 `blog-comments`），在 `Settings → General → Features` 里勾选 **Discussions**。

### 2. 安装 giscus app

打开 <https://github.com/apps/giscus>，授权它访问这个仓库。

### 3. 拿到配置

去 <https://giscus.app/zh-CN>，填入仓库名，页面会生成一段配置：

```html
<script
  src="https://giscus.app/client.js"
  data-repo="you/blog-comments"
  data-repo-id="R_kgDO..."
  data-category="Announcements"
  data-category-id="DIC_kwDO..."
  data-mapping="pathname"
  data-theme="light"
  crossorigin="anonymous"
  async
></script>
```

其中 `repoId` 和 `categoryId` 是必填的，漏了会加载失败。

### 4. 填进配置

我把它放在 `src/consts.ts` 的 `GISCUS` 里，页面根据 `enabled` 决定渲染评论区还是提示框：

```ts
export const GISCUS = {
  enabled: true,
  repo: 'you/blog-comments',
  repoId: 'R_kgDO...',
  category: 'Announcements',
  categoryId: 'DIC_kwDO...',
};
```

## 深色模式同步

Giscus 在 iframe 里，父页面改不了它的样式，只能发消息：

```ts
frame.contentWindow.postMessage(
  { giscus: { setConfig: { theme: 'dark_dimmed' } } },
  'https://giscus.app'
);
```

在主题切换时调用一次即可。注意 `targetOrigin` 必须是 `https://giscus.app`。

## 一个取舍

读者必须登录 GitHub 才能评论。


