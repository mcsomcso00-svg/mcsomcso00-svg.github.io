---
title: Schema 結構化資料新手實作教學
description: Schema 結構化資料是用 JSON-LD 告訴搜尋引擎與 AI「這頁是什麼、誰寫的、講什麼」。本文從零教你挑類型、寫第一段 Article + FAQPage 標記、驗證與部署，附可直接改用的程式碼。
target_keyword: schema 教學
intent: informational
cluster: On-page & 技術 SEO（群集 3）
author: SemanticLab 語意實驗室
date_published: 2026-07-15
date_updated: 2026-07-15
---
# Schema 結構化資料新手實作教學

**Schema 結構化資料是一段放在網頁 `<head>` 裡的 JSON-LD 程式碼，用 schema.org 的標準詞彙告訴搜尋引擎和 AI 引擎：這頁是什麼類型、誰寫的、何時發布、回答了哪些問題。** 新手只要學會 Article、FAQPage、BreadcrumbList 三種類型，就涵蓋了部落格 90% 的需求。

## Schema 能帶來什麼？先講清楚期望值

1. **複合搜尋結果（rich results）**：符合條件的標記可能讓搜尋結果多出評分星星、FAQ 摺疊、麵包屑路徑，提升點閱率。
2. **消歧義**：明確告訴機器「這個『Apple』是公司不是水果」，強化實體理解。
3. **對 AI 引擎友善**：結構化的作者、日期、組織資訊，讓 LLM 檢索時更容易判定內容可信度與時效。

也要講清楚它**不能**做什麼：Schema 本身不是排名加分項——Google 官方立場是結構化資料幫助「理解」，不直接提升排名。內容爛，標記再完整也沒用。

另外注意 2026 年的現實：Google 這幾年**縮減**了部分 rich result 的展示（FAQ rich result 自 2023 年 8 月起只保留給知名政府與健康網站）。所以做 FAQPage 標記的主要價值已轉向機器理解與 AI 引用，不是搜尋版面。

## 三種格式，只學 JSON-LD

結構化資料有三種寫法：JSON-LD、Microdata、RDFa。**Google 官方推薦 JSON-LD**，它是一段獨立的 `<script>`，不用改動 HTML 結構，最好維護。本文只教這一種。

## 實作：部落格文章的 Article 標記

把下面這段放進文章頁的 `<head>`（或 `<body>` 也可，Google 都讀）：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Schema 結構化資料新手實作教學",
  "description": "從零學會 JSON-LD 標記",
  "datePublished": "2026-08-13",
  "dateModified": "2026-08-13",
  "author": {
    "@type": "Organization",
    "name": "SemanticLab 語意實驗室",
    "url": "https://example.com/zh-hant/about/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SemanticLab 語意實驗室"
  }
}
</script>
```

欄位重點：

- `headline`：和頁面 H1 一致。
- `datePublished` / `dateModified`：用 ISO 8601 格式；內容更新時記得同步改 `dateModified`。
- `author`：個人用 `Person`（可加 `sameAs` 連到社群檔案佐證身分），團隊掛 `Organization`。這直接支撐 E-E-A-T 訊號（詳見〈[E-E-A-T 是什麼](/zh-hant/blog/what-is-eeat/)〉）。

## 實作：FAQPage 標記

文章有 FAQ 段落時，加上對應標記——**標記內容必須和頁面上實際顯示的文字一致**，這是 Google 的硬性規範：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Schema 會直接提升排名嗎？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "不會直接提升。它幫助搜尋引擎理解內容，並可能觸發複合搜尋結果。"
    }
  }]
}
</script>
```

`mainEntity` 是陣列，有幾題就放幾個 Question 物件。

## 驗證與部署：四步流程

1. **寫**：用上面的模板改內容。靜態網站（Astro、Next 等）建議寫成模板元件，從 frontmatter 自動帶入欄位，避免手動維護不同步。
2. **驗**：貼進 Google 的 **複合搜尋結果測試**（Rich Results Test，search.google.com/test/rich-results）看有沒有錯誤與警告；再用 **Schema.org validator**（validator.schema.org）檢查語法。
3. **部署後監控**：GSC 左側「**體驗與強化**」區會出現對應報表（例如「常見問題」「導覽標記」），列出有效與錯誤的頁面。
4. **維護**：內容改版時同步更新標記——「標記與頁面內容不符」是最常見的違規，可能導致手動處罰。

## 新手優先順序

| 優先度 | 類型 | 用在哪 |
|---|---|---|
| 1 | Article / BlogPosting | 每篇文章 |
| 2 | BreadcrumbList | 全站，配合麵包屑導覽 |
| 3 | FAQPage | 有 FAQ 段的文章 |
| 4 | Organization / Person | 首頁與作者頁，建立實體 |
| 5 | HowTo、Product 等 | 有對應內容類型才加 |

## 常見問題（FAQ）

**Q1：沒有工程師，可以不寫 code 做 Schema 嗎？**
可以。WordPress 用 Rank Math、Yoast 等外掛自動生成；其他 CMS 可用線上 JSON-LD 產生器（如 Merkle 的 Schema Markup Generator）產出後貼進頁面範本。

**Q2：一頁可以放多個 Schema 類型嗎？**
可以，而且很常見——文章頁同時放 Article + FAQPage + BreadcrumbList 完全合規。可以放在同一個 `@graph` 裡，或分成多個 `<script>` 區塊。

**Q3：加了 Schema 多久會看到 rich result？**
Google 重新爬取並處理後才可能出現，通常數天到數週；而且符合資格不保證顯示，Google 依查詢情境決定。用 GSC 的強化報表確認標記「有效」即可，剩下交給時間。

**Q4：Schema 對 GEO／AI 引用真的有幫助嗎？**
有幫助但非魔法。結構化的作者、組織、日期讓 AI 檢索系統更容易評估來源可信度；但 AI 引用最終看的是內容本身夠不夠具體、可摘錄。兩者要一起做。

---

SemanticLab 語意實驗室的每一篇文章都自動掛 Article + FAQPage 標記——這是我們 GEO 就緒標準的一部分，你可以把文章貼進 [GEO 就緒度檢測器](/zh-hant/geo/) 看看結構訊號是否到位。Schema 在整個技術 SEO 版圖的位置，見支柱頁〈[On-page & 技術 SEO 完整指南](/zh-hant/blog/onpage-technical-seo-guide/)〉。
