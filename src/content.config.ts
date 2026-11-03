import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    // 保留原始 Markdown，卡片据此估算阅读时长
    retainBody: true,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** 草稿不会出现在列表、标签页和 RSS 里 */
    draft: z.boolean().default(false),
    /** 卡片封面的色相 0-360，留空则按标题自动生成 */
    hue: z.number().min(0).max(360).optional(),
  }),
});

export const collections = { blog };
