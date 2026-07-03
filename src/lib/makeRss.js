import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const TITLE = {
  'zh-hant': 'SemanticLab — SEO / GEO 實戰內容',
  'zh-hans': 'SemanticLab — SEO / GEO 实战内容',
  en: 'SemanticLab — Practical SEO / GEO Content',
};

export async function makeRss(lang, context) {
  const now = new Date();
  const posts = (
    await getCollection('blog', (p) => p.id.startsWith(`${lang}/`) && !p.data.draft && p.data.date_published <= now)
  ).sort((a, b) => b.data.date_published.valueOf() - a.data.date_published.valueOf());
  return rss({
    title: TITLE[lang],
    description: TITLE[lang],
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description ?? '',
      pubDate: p.data.date_published,
      link: `/${lang}/blog/${p.id.split('/').slice(1).join('/')}/`,
    })),
  });
}
