---
title: hreflang 常見錯誤導致繁簡自我蠶食
description: hreflang 設定錯誤是繁簡自我蠶食的頭號原因。本文整理 7 個最常見錯誤——缺回連、漏自我參照、語言代碼寫錯、指向轉址頁等——並提供正確程式碼範例與 GSC 驗證方法。
target_keyword: hreflang 錯誤
intent: informational
cluster: 多語言 / 國際 SEO（群集 5）
author: GeoSeoToday
date_published: 2026-07-23
date_updated: 2026-07-23
---
# hreflang 常見錯誤導致繁簡自我蠶食

**hreflang 設定錯誤是繁簡中文網站「自我蠶食」的頭號原因：當標註缺回連、漏自我參照或語言代碼寫錯時，Google 會忽略整組標籤，把繁中與簡中頁面當成互相競爭的重複內容，導致兩邊排名一起衰退。** 本文列出 7 個最常見錯誤與修法。

## 為什麼繁簡站特別容易中招？

繁體與簡體中文頁面在演算法眼中相似度極高——很多時候只差字形與少數用詞。英文對法文這種「明顯不同語言」的組合，就算 hreflang 出錯，Google 還能靠語言偵測自行分辨；但繁中對簡中，一旦 hreflang 失效，Google 幾乎必然混淆兩者。這就是為什麼 hreflang 從 2011 年推出至今，繁簡網站仍是出錯後果最嚴重的族群：**同一組關鍵字，繁簡兩頁輪流出現、互搶點擊，最後兩邊都做不起來。**

## 7 個最常見的 hreflang 錯誤

### 錯誤 1：缺少回連（return tag）

hreflang 是「雙向合約」：繁中頁指向簡中頁，簡中頁也必須指回繁中頁。只要任一方向缺失，**整組標註直接被 Google 忽略**。這是最常見也最致命的錯誤，通常發生在只改了一個語言模板、忘了同步其他語言。

### 錯誤 2：漏掉自我參照

每一頁的 hreflang 清單必須包含「自己」。正確的三語＋x-default 寫法，四行要完整出現在**每一個**語言版本上：

```html
<link rel="alternate" hreflang="zh-Hant" href="https://example.com/zh-hant/pricing/" />
<link rel="alternate" hreflang="zh-Hans" href="https://example.com/zh-hans/pricing/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/pricing/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/pricing/" />
```

### 錯誤 3：語言代碼寫錯

hreflang 用的是 ISO 639-1 語言碼＋ISO 15924 文字碼／ISO 3166-1 地區碼，常見的錯誤寫法：

| 錯誤寫法 | 問題 | 正確寫法 |
|---|---|---|
| `zh-tw`（單獨當語言用沒問題，但…） | 只想涵蓋全球繁中使用者時範圍太窄 | `zh-Hant` |
| `tw`、`cn` | 這是地區碼，不能單獨當語言碼 | `zh-Hant`、`zh-Hans` |
| `zh-Hant-TW` 卻沒有對應內容 | 標了地區變體但內容根本相同 | 收斂回 `zh-Hant` |
| `en-UK` | 英國的正確地區碼是 GB | `en-GB` |

### 錯誤 4：指向轉址、404 或 noindex 頁面

hreflang 指向的 URL 必須是**可直接收錄的最終網址**。指向 301 轉址中繼頁、404 頁或帶 noindex 的頁面，該筆標註等於作廢。網站搬家或改 URL 結構後，這類錯誤會大量出現。

### 錯誤 5：canonical 與 hreflang 打架

每個語言版本的 canonical 必須指向自己。若簡中頁的 canonical 指向繁中頁，等於一邊叫 Google「收錄簡中版」、一邊叫它「以繁中版為準」，訊號互相矛盾，通常以簡中版消失收場。

### 錯誤 6：只在部分頁面實作

只有首頁有 hreflang、內頁全裸奔，是很多網站的現況。自我蠶食恰恰最常發生在長尾內頁。hreflang 必須**全站每一個有多語版本的頁面**都實作。

### 錯誤 7：HTML 與 sitemap 兩處標註互相矛盾

兩種放置方式擇一即可。若 HTML head 寫一套、sitemap 又寫另一套且內容不一致，Google 收到矛盾訊號後的行為不可預測。

## 如何確認自己有沒有中招？

1. **GSC 成效報表分流檢查**：分別以「網頁」篩選 `/zh-hant/` 與 `/zh-hans/`，比對各自的曝光國家。若簡中頁在台灣拿到大量曝光，八成是 hreflang 失效。
2. **同關鍵字排名輪替**：追蹤主要關鍵字時，發現繁簡兩個 URL 輪流上下，是典型蠶食徵兆。
3. **抽查原始碼**：隨機抽 5 頁，逐行核對「全語言＋自我參照＋x-default、雙向一致」。

## 常見問題（FAQ）

**Q1：hreflang 錯誤修好後多久生效？**
取決於重新抓取速度，一般 2–6 週逐步恢復。可在修正後於 GSC 對主要頁面請求建立索引，加速重抓。

**Q2：繁簡蠶食一定是 hreflang 的錯嗎？**
不一定，但它是頭號嫌犯。其次的原因包括 canonical 設錯、簡中版只是機器直轉（內容過近）、以及兩版共用同一組 title。排查時先驗 hreflang，再看 canonical 與內容差異化。

**Q3：可以只對重要頁面做 hreflang 嗎？**
技術上可以，但蠶食最常發生在你沒盯著的長尾頁。建議在模板層自動輸出，一次覆蓋全站，成本反而最低。

**Q4：Google 已移除 GSC 的國際指定報表，還能在哪裡驗證？**
GSC 的 International Targeting 報表已於 2022 年後陸續退場，現在主要靠成效報表的國家×頁面交叉分析，搭配第三方爬蟲工具（如 Screaming Frog 的 hreflang 檢查）做全站掃描。

---

與其每次手動核對四行標籤，不如讓工具代勞：GeoSeoToday的 [hreflang 產生器與 GEO 檢測工具](/zh-hant/geo/) 會自動帶入全語言清單、自我參照與 x-default，杜絕缺回連問題。新手建議先讀〈[hreflang 是什麼？多語言站必備教學](/zh-hant/blog/what-is-hreflang/)〉打好基礎，整體策略請見支柱頁〈[多語言 / 國際 SEO 完整指南](/zh-hant/blog/multilingual-seo-guide/)〉。
