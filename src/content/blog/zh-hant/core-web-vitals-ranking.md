---
title: Core Web Vitals 對排名的實際影響
description: Core Web Vitals（LCP、INP、CLS）是 Google 的頁面體驗指標，對排名是輕量級的間接因素——內容相關性永遠優先。本文給出三指標的 2026 年門檻、真實影響力評估與務實的優化順序。
target_keyword: core web vitals
intent: informational
cluster: On-page & 技術 SEO（群集 3）
author: GeoSeoToday
date_published: 2026-07-15
date_updated: 2026-07-15
---
# Core Web Vitals 對排名的實際影響

**Core Web Vitals（核心網頁指標）由 LCP、INP、CLS 三個指標組成，是 Google 頁面體驗訊號的一部分——它確實參與排名，但權重輕：內容相關性與品質永遠優先，CWV 只在內容相當的頁面之間扮演加減分。** 把它當「及格門檻」而不是「排名武器」，是 2026 年的正確認知。

## 三個指標是什麼？門檻多少？

| 指標 | 測什麼 | 良好門檻 | 白話說法 |
|---|---|---|---|
| LCP（Largest Contentful Paint） | 最大內容元素載入時間 | ≤ 2.5 秒 | 主圖／主標多快出現 |
| INP（Interaction to Next Paint） | 互動到畫面回應的延遲 | ≤ 200 毫秒 | 點下去多快有反應 |
| CLS（Cumulative Layout Shift） | 版面位移累積量 | ≤ 0.1 | 頁面會不會跳來跳去害你點錯 |

注意：**INP 已在 2024 年 3 月正式取代 FID**，如果你看的教學還在講 FID，那是過時資料。評估標準以**真實使用者資料（CrUX，Chrome User Experience Report）的第 75 百分位數**為準——也就是至少 75% 的造訪要達到「良好」。

## Google 官方到底怎麼說它對排名的影響？

整理官方多次表態（Search Central 文件與 John Mueller 等人的公開說明）：

1. 頁面體驗是排名系統會參考的訊號之一，但 Google 明確說**「相關性高但體驗差的頁面，仍會贏過體驗好但內容不相關的頁面」**。
2. Google 已淡化「頁面體驗」作為獨立排名系統的說法——它是多個訊號的集合，不是一個開關。
3. CWV 的影響比較像 **tie-breaker（同分裁決）**：當兩頁內容品質接近時，體驗好的佔優。

務實結論：**從「未達標」修到「良好」值得做；從 2.1 秒優化到 1.4 秒對排名幾乎沒有額外意義**——後者是體驗與轉換率的投資，不是 SEO 投資。

## 但別只看排名：CWV 的間接效益才是大頭

- **跳出與轉換**：Google/SOASTA 的經典研究指出，行動頁載入時間從 1 秒增加到 3 秒，跳出機率上升約 32%。速度影響營收，這比排名加分實在。
- **爬取效率**：伺服器回應快，Googlebot 在同樣時間內能爬更多頁——對大站的 crawl budget 有實質幫助（詳見〈[crawl budget 是什麼](/zh-hant/blog/what-is-crawl-budget/)〉）。
- **AI 引擎抓取**：GPTBot、PerplexityBot 等爬蟲同樣受益於快速回應的網站。

## 怎麼量測？兩種資料別搞混

1. **實驗室資料（Lab）**：PageSpeed Insights 上半部的 Lighthouse 分數、本機 DevTools。可重現、適合除錯，但**不是排名依據**。
2. **真實資料（Field / CrUX）**：PageSpeed Insights 上方的「探索使用者的實際體驗」、GSC 左側「**體驗 → 核心網頁指標**」報表。**這才是 Google 排名參考的資料**。

GSC 報表的操作：進入「核心網頁指標」→ 分開看行動版與電腦版 → 點「不良」或「需要改善」的網址群組，報表會告訴你是哪個指標、哪一群相似頁面出問題——CWV 問題幾乎都是範本層級的，修一個範本救一整群頁。

## 務實的優化順序（先做 CP 值最高的）

1. **LCP**：壓縮並用現代格式（AVIF/WebP）供應主圖、主圖不要 lazy-load、加上 `fetchpriority="high"`、用 CDN、確認 TTFB < 800ms。圖片相關做法詳見〈[圖片 SEO](/zh-hant/blog/image-seo/)〉。
2. **CLS**：所有圖片與嵌入元素寫死 `width`/`height`、廣告與動態元素預留空間、字體用 `font-display: swap` 並預載。
3. **INP**：減少第三方 script（追蹤碼是最常見兇手）、拆分長任務、延遲載入非關鍵 JS。

多數內容網站做完前兩項就能全綠；INP 問題通常出在掛了太多行銷追蹤碼。

## 常見問題（FAQ）

**Q1：我的站 CWV 全紅，修好排名會漲多少？**
無法保證具體幅度。如果內容本身有競爭力，從「不良」修到「良好」可能在邊際競爭的關鍵字上看到小幅前移；如果內容不行，CWV 全綠也救不了。先確認內容，再修體驗。

**Q2：GSC 說我「資料不足」，怎麼辦？**
代表流量不夠讓 CrUX 收集到足夠樣本（小站很常見）。這種情況 CWV 對你的排名影響趨近於零——用 PageSpeed Insights 的實驗室資料自查即可，把力氣花在內容與內部連結上。

**Q3：Lighthouse 90 分但 GSC 顯示不良，哪個對？**
GSC（真實資料）對。實驗室是單次模擬，真實使用者有各種裝置與網速。以 CrUX 第 75 百分位數為準去修。

**Q4：CWV 需要每月盯嗎？**
不用天天看。改版、換主題、加第三方 script 之後查一次；平時每季隨 SEO 健檢看一眼 GSC 報表即可。

---

GeoSeoToday把 CWV 定位為「技術及格線」：先過線，然後把資源投回內容與結構——因為被 AI 引用與拿到排名，九成靠的是內容本身。想檢查文章內容端是否就緒，用 [GEO 就緒度檢測器](/zh-hant/geo/) 打個分；技術與內容如何搭配，見〈[On-page & 技術 SEO 完整指南](/zh-hant/blog/onpage-technical-seo-guide/)〉。
