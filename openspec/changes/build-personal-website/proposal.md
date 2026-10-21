## Why

站主需要一個公開網站,讓招募者與潛在客戶快速了解本人、任職經歷與作品,並能直接聯絡。目前 repo 為空,從零建立。

## What Changes

- 建立 Astro + React islands + TypeScript 靜態網站,部署於 Netlify(預設子網域)。
- 以 Markdown 內容檔管理 **Experience**、**Project**、**Service**、About 自介;每份內容必須中英兩版,以同一 slug 配對。
- build 時驗證內容:欄位格式、中英兩版齊全、**Confidential Project** 不得有原始碼／demo 連結、**Service** 引用的 Project slug 必須存在;任一失敗即 build 失敗、不上線。
- 中英雙語路由 `/zh-tw/...`、`/en/...`;`/` 依瀏覽器語言導向,預設繁中。
- 頁面:首頁(hero、Service、精選 Project、聯絡 CTA)、`/projects`(列表 + **Tech** 篩選)、`/projects/[slug]`、`/about`(自介、照片、Experience 時間軸、履歷 PDF)、`/contact`(表單 + 社群連結)。
- 聯絡表單使用 Netlify Forms(honeypot 防垃圾,新訊息 email 通知)。
- 極簡視覺,深色模式(跟隨系統,可手動切換)。
- Cloudflare Web Analytics 流量分析。

## Capabilities

### New Capabilities
- `content-model`: Experience、Project、Service、About 的內容結構、雙語配對規則與 build 時驗證。
- `i18n-routing`: 雙語網址結構、根路徑導向、語言切換。
- `project-showcase`: 首頁精選、Project 列表與 Tech 篩選、Project 詳細頁、Confidential 呈現規則、Service 區塊。
- `about-page`: 自介、照片、Experience 時間軸、履歷 PDF 下載。
- `contact`: 聯絡表單與社群連結。
- `site-shell`: 版面框架、深色模式、流量分析、部署。

### Modified Capabilities
(無)

## Impact

- 新增整個網站專案:`package.json`、Astro 設定、`src/`、`public/`、`netlify.toml`。
- 新依賴:`astro`、`@astrojs/react`、`react`、`react-dom`、`typescript`、`tailwindcss`、`@tailwindcss/vite`、`@tailwindcss/typography`、`vitest`。
- 外部服務:Netlify(hosting、Forms)、Cloudflare Web Analytics。
- 詞彙定義見 `GLOSSARY.md`。
