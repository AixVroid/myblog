import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * 部署在子路径时（例如 GitHub Pages 的项目站 /AixVroid-blog/）需要设置 base。
 * 本地开发不设 BASE_PATH，base 就是 '/'，链接都是干净的根路径。
 *
 * CI 里由 workflow 传：BASE_PATH=/${仓库名}
 */
const base = process.env.BASE_PATH || '/';

// 部署到正式域名后，把 site 改成你的真实地址，sitemap / 绝对链接都依赖它
// CI 里由 workflow 通过 SITE_URL 注入
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
