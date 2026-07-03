---
title: x-default 要指到哪個語言？
description: x-default 是 hreflang 的「預設出口」，當使用者的語言不符合任何已標註版本時，Google 就端出 x-default 指向的頁面。本文說明三種指定策略——英文版、語言選擇頁、主要市場版——與各自適用情境。
target_keyword: x-default
intent: informational
cluster: 多語言 / 國際 SEO（群集 5）
author: SemanticLab 語意實驗室
date_published: 2026-07-24
date_updated: 2026-07-24
---
# x-default 要指到哪個語言？

**x-default 應該指向「當使用者不屬於任何已標註語言時，你最希望他看到的版本」——多數國際站指向英文版，有語言選擇頁的網站指向選擇頁，只經營華文市場的網站則可指向繁中或簡中主力版本。** 它沒有唯一正解，但有明確的決策邏輯。

## x-default 是什麼？

x-default 是 Google 在 2013 年 4 月推出的 hreflang 特殊值，作用是指定「保底頁面」：當搜尋者的語言／地區不符合你標註的任何一個版本時（例如一位德文使用者搜到你的三語網站），Google 會端出 x-default 指向的 URL。可以把它想成 switch 語法裡的 `default:` 分支。

在標籤裡它長這樣（注意 x-default 不是語言碼，同一組標註只能有一個）：

```html
<link rel="alternate" hreflang="zh-Hant" href="https://example.com/zh-hant/schema-guide/" />
<link rel="alternate" hreflang="zh-Hans" href="https://example.com/zh-hans/schema-guide/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/schema-guide/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/schema-guide/" />
```

## 三種指定策略比較

| 策略 | x-default 指向 | 適合誰 | 風險 |
|---|---|---|---|
| 國際通用語 | 英文版頁面 | 有英文版、目標含國際市場 | 幾乎沒有，最常見選擇 |
| 語言選擇頁 | `/` 的語言入口頁 | 語言超過 3–4 種、無明顯主力市場 | 選擇頁本身內容薄，需避免變成空殼頁 |
| 主力市場版本 | 繁中（或簡中）頁面 | 只經營華文市場、沒有英文版 | 非華文使用者體驗差，但本來就非目標客群 |

## 決策流程：三個問題

1. **你有英文版嗎？** 有 → x-default 指英文版，結案。這是對「其他所有人」最不會出錯的答案，也是多數三語站（繁中／簡中／英文）的標準做法。
2. **沒有英文版，但有語言選擇頁嗎？** 有 → 指向選擇頁。注意選擇頁要可被索引、不能是純 JavaScript 跳轉。
3. **兩者都沒有？** 指向你的主力語言版本。例如純繁中＋簡中的站，把 x-default 指向繁中版——這比不設定好，因為它同時消除了「哪一版是預設」的模糊空間。

## 常見的 x-default 錯誤

- **忘記設定**：x-default 雖非強制，但缺了它，Google 面對未標註語言的使用者時只能自行猜測，繁簡站可能被猜錯版本。
- **設了多個 x-default**：同一組 hreflang 只能有一個 x-default，設兩個以上會讓整組訊號混亂。
- **指向會自動轉址的 URL**：有些網站的根網址會依 IP 自動 302 跳轉語言版，把 x-default 指向這種 URL，等於指向一個 Google 抓不到穩定內容的位置。
- **只在首頁設定**：x-default 和其他 hreflang 一樣，應該在**每一個有多語版本的頁面**逐頁指向該頁對應的預設版本，而不是全站都指向首頁。

## 常見問題（FAQ）

**Q1：x-default 是必填的嗎？不設會怎樣？**
不是必填，hreflang 沒有 x-default 也能運作。但不設等於把「未涵蓋語言的使用者看哪版」交給 Google 猜；補上一行成本極低，建議一律設定。

**Q2：x-default 可以和某個語言版本指向同一個 URL 嗎？**
可以，而且這是最常見的做法——例如 `hreflang="en"` 和 `hreflang="x-default"` 同時指向英文版 URL，兩行並存完全合法。

**Q3：華文站沒有英文版，x-default 指繁中還是簡中？**
指向你的主力市場版本。以台灣為主要市場就指繁中；若海外簡中讀者占比更高則指簡中。判斷依據是 GSC 裡哪個語言目錄的曝光與轉換更重要。

**Q4：x-default 會影響排名嗎？**
不會直接影響。它和 hreflang 一樣屬於分流訊號，決定「誰看到哪一版」，不改變頁面本身的排名能力。

---

x-default 只有一行，但每頁都要跟著完整的 hreflang 組合一起輸出——SemanticLab 語意實驗室的 [hreflang 產生器與 GEO 檢測工具](/zh-hant/geo/) 會在產生標籤時自動附上正確的 x-default，不必再人工判斷格式。搭配〈[hreflang 是什麼？多語言站必備教學](/zh-hant/blog/what-is-hreflang/)〉服用效果更好，完整脈絡見支柱頁〈[多語言 / 國際 SEO 完整指南](/zh-hant/blog/multilingual-seo-guide/)〉。
