/**
 * 拼接部署用的 base 前缀。
 *
 * - 本地开发：BASE_URL 是 '/'，url('/blog') → '/blog'
 * - GitHub Pages 项目站：BASE_URL 是 '/AixVroid-blog/'，url('/blog') → '/AixVroid-blog/blog'
 *
 * 所有站内链接和静态资源路径都应该经过这里，
 * 这样换部署地址时只改 astro.config.mjs，模板不用动。
 */
const raw = import.meta.env.BASE_URL;
/** 统一成以 / 结尾，避免拼出 /foo/bar 这种缺斜杠的路径 */
const BASE = raw.endsWith('/') ? raw : raw + '/';

export function url(path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? BASE + clean : BASE;
}

/** 去掉 base 前缀后的当前路径，用于导航高亮判断 */
export function pathWithoutBase(pathname: string): string {
  const base = BASE.replace(/\/$/, '');
  if (!base) return pathname;
  const stripped = pathname.slice(base.length);
  return stripped === '' ? '/' : stripped;
}
