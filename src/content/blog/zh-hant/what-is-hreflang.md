---
title: hreflang 是什麼？多語言站必備教學
description: hreflang 是一組 HTML 標籤，用來告訴 Google 同一頁面有哪些語言版本、各自該給哪個地區的使用者。本文用繁中／簡中／英文的實際範例教你正確寫法、三種放置方式與驗證方法。
target_keyword: hreflang 是什麼
intent: informational
cluster: 多語言 / 國際 SEO（群集 5）
author: GeoSeoToday
date_published: 2026-07-23
date_updated: 2026-07-23
---
# hreflang 是什麼？多語言站必備教學

**hreflang 是一組放在 HTML `<head>` 或 sitemap 裡的標籤，用來告訴 Google「這個頁面還有哪些語言版本、各自對應哪個語言或地區的使用者」。** 只要你的網站同時有繁中、簡中或英文版本，hreflang 就是必備配置——沒有它，Google 可能把簡中頁面端給台灣使用者，甚至讓繁簡版本互相搶排名。

## hreflang 解決什麼問題？

Google 早在 2011 年就推出 hreflang 標註，原因很直接：對搜尋引擎來說，繁體中文和簡體中文的頁面內容高度相似，如果不明確標註，演算法很難判斷該把哪個版本排給哪個市場。結果就是兩種常見災難：

1. **端錯版本**：台灣使用者搜尋時看到簡體頁面，跳出率飆高。
2. **自我蠶食**：繁簡兩版被當成重複內容互相競爭，兩邊排名都做不起來。

hreflang 的角色就像「語言路標」：它不會直接提升排名，但能確保**對的語言版本出現在對的市場**，把既有排名的價值放到最大。

## hreflang 的正確寫法（含程式碼範例）

核心規則只有三條：**每一頁都要列出全部語言版本、必須包含自我參照、建議加上 x-default**。以一個三語網站的文章頁為例：

```html
<link rel="alternate" hreflang="zh-Hant" href="https://example.com/zh-hant/geo-guide/" />
<link rel="alternate" hreflang="zh-Hans" href="https://example.com/zh-hans/geo-guide/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/geo-guide/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/geo-guide/" />
```

這四行要**同時出現在繁中、簡中、英文三個版本的頁面上**，一字不差。幾個重點：

- `zh-Hant`／`zh-Hans` 是「文字系統」代碼，適合不分地區的繁簡站；若你真的有分地區的內容，才用 `zh-TW`、`zh-HK`、`zh-CN`。
- `x-default` 指定「不符合任何語言條件時」的預設版本，通常指向英文或語言選擇頁。
- URL 必須是完整絕對路徑（含 `https://`），不能用相對路徑。

## 三種放置方式比較

| 放置方式 | 適合情境 | 注意事項 |
|---|---|---|
| HTML `<head>` 標籤 | 頁面數量中等、模板可控 | 每頁的 head 會多出 N 行，頁數多時維護成本高 |
| XML sitemap | 頁面多、有自動產生 sitemap 的系統 | 用 `xhtml:link` 標註，改動集中在一個檔案 |
| HTTP header | PDF 等非 HTML 檔案 | 一般網站很少用到 |

三種方式**擇一即可**，混用反而容易產生互相矛盾的訊號。對多數用 Astro、Next.js 等框架建的站，直接在 layout 模板中依語言自動輸出 head 標籤是最省事的做法。

## 最容易踩的三個地雷

1. **缺少回連（return tag）**：A 頁指向 B 頁，但 B 頁沒有指回 A 頁，整組標註會被 Google 忽略。
2. **忘記自我參照**：每一頁都必須把「自己」也列進 hreflang 清單。
3. **指向錯誤狀態的 URL**：hreflang 指向的頁面若是 404、被 noindex 或經過轉址，標註等於白做。

hreflang 錯誤是繁簡自我蠶食的頭號原因，詳細的錯誤清單可以看〈[hreflang 常見錯誤導致繁簡自我蠶食](/zh-hant/blog/hreflang-mistakes/)〉。

## 怎麼驗證 hreflang 有沒有生效？

設定完成後不要憑感覺，用工具驗證：

- **Google Search Console**：觀察各語言目錄（如 `/zh-hant/`、`/zh-hans/`）在對應市場的曝光是否分流正常。
- **網頁原始碼檢查**：隨機抽 3–5 頁，確認每頁都輸出完整的 alternate 清單。
- **site: 指令抽查**：在目標市場的 Google 搜尋品牌詞，看端出來的是不是正確語言版本。

## 常見問題（FAQ）

**Q1：hreflang 會直接提升排名嗎？**
不會。hreflang 是「分流訊號」不是「排名訊號」，它的價值在於讓對的版本出現在對的市場、避免繁簡互相蠶食——這間接保護了你的點擊率與排名表現。

**Q2：只有繁中和英文兩個語言，也需要 hreflang 嗎？**
需要。只要同一內容存在兩個以上語言版本就建議標註，尤其中文和英文以外若日後要加簡中，先把架構做對可以省掉大量返工。

**Q3：hreflang 用 zh-TW 還是 zh-Hant？**
若內容是針對「所有繁體中文使用者」（台灣＋香港＋海外），用 `zh-Hant` 更精確；只有當你為台灣和香港準備了不同內容時，才需要分 `zh-TW` 和 `zh-HK`。

**Q4：hreflang 和 canonical 會衝突嗎？**
不會，但要配合正確：每個語言版本的 canonical 應指向「自己」，而不是指向其他語言版本。若簡中頁的 canonical 指向繁中頁，等於告訴 Google 簡中頁不用收錄。

---

hreflang 標籤手寫容易漏，GeoSeoToday把「全語言＋自我參照＋x-default」的規則做成了免費的 [hreflang 產生器與 GEO 檢測工具](/zh-hant/geo/)，貼上 URL 就能一鍵產出正確標籤。想從架構層面理解多語言站怎麼規劃，請看支柱頁〈[多語言 / 國際 SEO 完整指南](/zh-hant/blog/multilingual-seo-guide/)〉，以及〈[x-default 要指到哪個語言？](/zh-hant/blog/x-default-guide/)〉。
