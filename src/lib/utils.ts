/** 2026-10-31 → 2026.10.31 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

/** 用于 <time datetime=""> 的 ISO 日期 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * 粗略估算阅读时长：中文按 350 字/分钟，英文按 220 词/分钟。
 */
export function readingTime(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]+/g, ' ');

  const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) ?? []).length;
  const latin = (text.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, ' ').match(/[A-Za-z0-9]+/g) ?? [])
    .length;

  return Math.max(1, Math.ceil(cjk / 350 + latin / 220));
}

/** 由任意字符串稳定地生成一个色相，用于卡片封面和标签配色 */
export function hueFromString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) % 360;
  }
  return hash;
}

/** 按日期倒序 */
export function byDateDesc<T extends { data: { pubDate: Date } }>(a: T, b: T): number {
  return b.data.pubDate.getTime() - a.data.pubDate.getTime();
}

/** 统计所有标签及数量，按数量倒序 */
export function collectTags(posts: { data: { tags: string[] } }[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh')));
}
