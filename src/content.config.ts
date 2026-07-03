import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 部落格文章：src/content/blog/<lang>/<slug>.md
// frontmatter 與 content-strategy 產線一致（見 content-plan-90days.md B2 模板）
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(), // meta description；缺省時取答案優先段
    target_keyword: z.string().optional(),
    intent: z.enum(['informational', 'commercial']).default('informational'),
    cluster: z.string().optional(),
    author: z.string().default('SemanticLab 語意實驗室'),
    date_published: z.coerce.date(),
    date_updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    // 有其他語言版本時填，供 hreflang 使用：{ 'zh-hant': 'what-is-geo', en: 'what-is-geo' }
    translations: z.record(z.string()).optional(),
  }),
});

export const collections = { blog };
