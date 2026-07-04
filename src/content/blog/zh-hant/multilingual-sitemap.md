---
title: 每種語言各一份 sitemap 怎麼設
description: 多語言網站建議每種語言各建一份 XML sitemap，再用 sitemap index 統整提交。本文提供繁中／簡中／英文的實際檔案範例、含 hreflang 標註的 sitemap 寫法，以及在 GSC 分開監控收錄的方法。
target_keyword: 多語言 sitemap
intent: informational
cluster: 多語言 / 國際 SEO（群集 5）
author: GeoSeoToday
date_published: 2026-07-25
date_updated: 2026-07-25
---
# 每種語言各一份 sitemap 怎麼設

**多語言網站的最佳實務是「每種語言各一份 XML sitemap，再用一個 sitemap index 統整」：例如 `sitemap-zh-hant.xml`、`sitemap-zh-hans.xml`、`sitemap-en.xml`。** 這樣做能在 GSC 分別監控每個語言的收錄狀況，一眼看出「是全站問題，還是某個語言版本出問題」。

## 為什麼要按語言拆 sitemap？

sitemap 本身不影響排名，它的價值在**收錄與診斷**。把三個語言混在同一份 sitemap 裡，GSC 只會告訴你「已提交 3,000 頁、已收錄 2,100 頁」——你不知道缺的 900 頁集中在哪個語言。按語言拆開後：

1. **收錄率分語言可見**：簡中版收錄率若明顯低於繁中版，可能是內容太接近繁中（機器直轉）或 hreflang／canonical 設定出錯，能立刻鎖定方向。
2. **提交與除錯獨立**：新增一批英文文章後，只需重新提交英文 sitemap。
3. **與子目錄架構天然對齊**：`/zh-hant/` 目錄對應 `sitemap-zh-hant.xml`，追蹤邏輯一致。

## 檔案結構範例

三語網站的標準配置是「1 個 index＋3 份語言 sitemap」：

```
https://example.com/sitemap-index.xml   ← 只提交這一個
├── https://example.com/sitemap-zh-hant.xml
├── https://example.com/sitemap-zh-hans.xml
└── https://example.com/sitemap-en.xml
```

sitemap index 的內容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://example.com/sitemap-zh-hant.xml</loc></sitemap>
  <sitemap><loc>https://example.com/sitemap-zh-hans.xml</loc></sitemap>
  <sitemap><loc>https://example.com/sitemap-en.xml</loc></sitemap>
</sitemapindex>
```

## 進階：在 sitemap 裡標 hreflang

hreflang 除了放 HTML `<head>`，也可以放在 sitemap 裡（兩種方式**擇一**，不要重複又不一致）。寫法是在每個 `<url>` 裡用 `xhtml:link` 列出全部語言版本＋x-default：

```xml
<url>
  <loc>https://example.com/zh-hant/geo-guide/</loc>
  <xhtml:link rel="alternate" hreflang="zh-Hant" href="https://example.com/zh-hant/geo-guide/" />
  <xhtml:link rel="alternate" hreflang="zh-Hans" href="https://example.com/zh-hans/geo-guide/" />
  <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/geo-guide/" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/geo-guide/" />
</url>
```

規則和 HTML 版完全相同：**每個 URL 都要列全部語言＋自我參照＋x-default，且雙向一致**。頁面數量大的網站用 sitemap 標註，可以把 hreflang 的維護集中在產生 sitemap 的那一段程式碼裡，比逐頁模板更不容易漏。

## 設定時的 5 個注意事項

1. **只放可收錄的最終 URL**：帶 noindex、轉址中、404 的頁面不要進 sitemap，收錄率報表才有診斷價值。
2. **URL 用絕對路徑**，且與 canonical 一致（含結尾斜線與 https）。
3. **單一 sitemap 上限 50,000 個 URL、未壓縮 50 MB**（sitemaps.org 協定規範），超過就再拆。
4. **lastmod 要真實**：只在內容實際更新時改動，全站每天自動更新 lastmod 會讓這個欄位失去參考價值。
5. **在 robots.txt 宣告 sitemap index**：`Sitemap: https://example.com/sitemap-index.xml`，讓 Bing 等其他引擎也能發現。

## GSC 的操作步驟

1. 進入 GSC →「Sitemap」→ 提交 `sitemap-index.xml`，Google 會自動展開三份子 sitemap。
2. 之後每份語言 sitemap 都會有獨立的一列，各自顯示「已找到的網頁數」與可篩選的收錄狀態。
3. 每月檢查一次：任一語言的收錄比率明顯落後其他語言，就往內容重複度、hreflang、內部連結三個方向排查。

## 常見問題（FAQ）

**Q1：一定要按語言拆嗎？全站一份不行？**
技術上一份也能收錄，但你會失去分語言診斷的能力。拆分幾乎零成本（多數框架與 SEO 外掛都支援），換來的診斷精度非常划算。

**Q2：Astro、Next.js 這類框架怎麼產生多語言 sitemap？**
主流做法是用官方或社群的 sitemap 整合（如 @astrojs/sitemap）依路由前綴分組，或自寫一支在 build 時按 `/zh-hant/`、`/zh-hans/`、`/en/` 分檔輸出的腳本，順便注入 xhtml:link 標註。

**Q3：hreflang 放 HTML 還是放 sitemap 好？**
頁數少、模板可控 → HTML head 直觀好查；頁數多、由系統產生 → sitemap 集中維護。關鍵是擇一，兩處都放又不同步是常見事故來源。

**Q4：sitemap 提交後多久會收錄？**
提交只是「通知」，不保證收錄與時程。新站通常數天到數週；若特定語言長期收錄率低，問題多半在內容品質或重複度，而不是 sitemap 本身。

---

sitemap 拆好之後，別忘了每個 URL 的 hreflang 配對——GeoSeoToday的 [hreflang 產生器與 GEO 檢測工具](/zh-hant/geo/) 可以直接產出 HTML 與 sitemap 兩種格式的標籤。下一步是把 GSC 的追蹤也按語言切開，見〈[GSC 如何依語言資料夾分開追蹤](/zh-hant/blog/gsc-multilingual-tracking/)〉；整體架構請回到支柱頁〈[多語言 / 國際 SEO 完整指南](/zh-hant/blog/multilingual-seo-guide/)〉。
