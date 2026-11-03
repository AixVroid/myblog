/**
 * 站点级配置：改这里就能换名字、导航和评论设置。
 */
export const SITE = {
  /** 浏览器标签页与首页大标题 */
  title: 'AixVroid的个人blog',
  author: 'AixVroid',
  description: '一个用 Astro 搭建的个人博客，记录技术笔记与日常思考。',
  /**
   * 站点根地址，仅作兜底。
   * 正式地址由 astro.config.mjs 的 site 决定（CI 里按仓库名自动注入）。
   */
  url: 'https://example.com',
  lang: 'zh-CN',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog', label: '文章' },
    { href: '/tags', label: '标签' },
    { href: '/works', label: '项目' },
  ],
  social: [
    { href: 'https://github.com/AixVroid', label: 'GitHub' },
    { href: 'mailto:h1413109143@163.com', label: '邮箱' },
  ],
};

/**
 * Giscus 评论配置。
 * 启用步骤：
 *   1. 建一个公开仓库，在 Settings → General → Features 勾选 Discussions
 *   2. 安装 giscus app：https://github.com/apps/giscus
 *   3. 打开 https://giscus.app/zh-CN 填入仓库，复制 repo / repoId / categoryId
 *   4. 填到下面，并把 enabled 改成 true
 */
export const GISCUS = {
  enabled: true,
  repo: 'AixVroid/myblog',
  repoId: 'R_kgDOHvnNkw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOHvnNK84DKTc9',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  inputPosition: 'bottom',
  lang: 'zh-CN',
};
