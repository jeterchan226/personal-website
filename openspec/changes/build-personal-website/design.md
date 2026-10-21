## Context

repo 目前只有 `README.md` 與 `GLOSSARY.md`。站主背景偏後端,前端可用 React,但需要每個元件的用途說明。內容由站主以 Markdown 撰寫、push 後自動部署,無後台、無資料庫。詞彙以 `GLOSSARY.md` 為準。

## Goals / Non-Goals

**Goals:**
- 靜態網站,頁面載入快、SEO 好。
- 內容錯誤(缺語言、壞引用、Confidential 帶連結)在 build 時就擋下。
- 前端程式碼少、結構好懂,方便後端背景的站主維護。

**Non-Goals:**
- Blog、技能頁、Experience 獨立頁、CMS 後台。
- 由內容自動產生履歷 PDF(第一版用手動 PDF)。
- 自有網域(之後再綁)。
- Draft／草稿機制:所有已 commit 的內容都視為上線內容。

## Decisions

### 1. Astro + React islands
使用 Astro 7(需 Node ≥ 22.22,本機與 Netlify 皆用 Node 24;Astro 6 有未修補的已知漏洞)。
Astro 在 build 時把頁面產成純 HTML,預設不送 JavaScript。只有 Tech 篩選、主題切換等互動區塊用 React(island)。
- 替代:Next.js — 偏 app 框架,對純內容站過重。純 HTML — 雙語與內容驗證要自己寫。

### 2. Content Collections + Zod 定義內容 schema
`src/content.config.ts` 定義 `projects`、`experiences`、`services`、`about` 四個 collection,每個用 Zod 描述欄位(類似後端 typed model)。欄位格式錯誤時 Astro build 自動失敗。
- 目錄:`src/content/<collection>/<lang>/<slug>.md`。
- Collection entry id 形如 `zh-tw/order-system`,以 `/` 拆出 lang 與 slug。

### 3. 跨檔驗證放在獨立模組,於 build 開始時執行
Zod 只能驗單一檔案。中英齊全、結構欄位一致、引用存在、Confidential 規則屬於跨檔規則,寫在 `src/lib/content/validate.ts`,由 `src/lib/content/index.ts` 的資料存取函式在首次載入時呼叫;任一違規丟出錯誤,整個 build 失敗。
- 頁面只透過 `src/lib/content` 取資料(例如 `getProjects(lang)`),不直接呼叫 `getCollection`,確保驗證一定執行。
- 驗證函式為純函式(輸入 entries,輸出錯誤清單),用 Vitest 單元測試。
- 替代:Astro integration hook — 拿不到 collection 資料,較麻煩。

### 4. i18n 路由
使用 Astro 內建 i18n:`locales: ['zh-tw', 'en']`、`defaultLocale: 'zh-tw'`、`prefixDefaultLocale: true`。頁面放在 `src/pages/[lang]/...`,以 `getStaticPaths` 產生兩種語言。
- 根路徑 `/`:Netlify `_redirects` 以 `Language` 條件導向(`/ /en/ 302 Language=en`,其餘 `/ /zh-tw/ 302`)。不用 JavaScript 導向,避免閃爍。
- 介面文字放在 `src/i18n/ui.ts`(key → 中英字串),日期格式化放 `src/i18n/format.ts`。

### 5. Tech 篩選:伺服器先輸出完整列表,React 只做顯示隱藏
`/projects` 頁面在 build 時輸出所有卡片 HTML;`TechFilter` React island 只負責按鈕狀態,並依卡片上的 `data-tech` 屬性隱藏不符的卡片。停用 JavaScript 時仍看得到完整列表。
- 替代:整個列表用 React 渲染 — JavaScript 變多,且停用時空白。

### 6. 深色模式
Tailwind `dark:` variant,以 `@custom-variant dark` 綁定 `<html data-theme="dark">`。`<head>` 內一段 inline script 在繪製前讀 `localStorage` 或系統偏好,設定 `<html data-theme>`,避免閃爍。`ThemeToggle` React island 負責切換與寫入 `localStorage`。

### 7. 樣式
Tailwind CSS v4(`@tailwindcss/vite` plugin),樣式直接寫在元件 class 上;長文 Markdown 內文用 `@tailwindcss/typography` 的 `prose`。
- 替代:純 CSS — 要自己寫與命名大量樣式,開發較慢。

### 8. 聯絡表單
靜態 HTML `<form data-netlify="true" netlify-honeypot="bot-field">`,不需 JavaScript。送出後導到 `/[lang]/contact/thanks`。email 通知於 Netlify 後台設定。

### 9. 圖片
封面圖與照片放 `src/assets/`,用 Astro `<Image>` 自動產生壓縮與尺寸版本。履歷 PDF 放 `public/resume/resume-zh-tw.pdf`、`resume-en.pdf`。

### 10. 元件清單(每個都會在程式內註解用途)
| 元件 | 種類 | 用途 |
|---|---|---|
| `BaseLayout.astro` | Astro | `<head>`、SEO、hreflang、主題初始化、analytics、頁首頁尾 |
| `Header.astro` / `Footer.astro` | Astro | 導覽、語言切換連結 |
| `ThemeToggle.tsx` | React island | 深淺色切換 |
| `ProjectCard.astro` | Astro | 列表與首頁的 Project 卡片 |
| `TechFilter.tsx` | React island | Tech 篩選按鈕,隱藏不符卡片 |
| `ServiceList.astro` | Astro | 首頁 Service 區塊 |
| `ExperienceTimeline.astro` | Astro | About 頁時間軸 |
| `ContactForm.astro` | Astro | Netlify 表單 |

### 11. 測試
- Vitest:`validate.ts` 的跨檔規則、日期格式化。
- `astro check`(TypeScript 型別檢查)與 `astro build` 作為最終驗證。
- Netlify build 指令:`astro check && vitest run && astro build`。

## Risks / Trade-offs

- [`@tailwindcss/typography` 依賴有漏洞的 `postcss-selector-parser@6`] → `package.json` `overrides` 強制使用 `^7.1.6`;產出 CSS 與原本相同。上游更新後可移除 override。

- [嚴格雙語讓新增內容較慢] → 站主已接受;寫作中內容不 commit 或放分支。
- [跨檔驗證若有頁面繞過 `src/lib/content` 就不會執行] → 驗證在模組載入時執行一次,且所有頁面都經過 `BaseLayout` 會間接載入;加上 code review 慣例。
- [Netlify `Language` 條件導向僅在 Netlify 生效,本機 dev 不會] → 本機 `/` 提供一個連到兩種語言的簡單頁作為後備。
- [公開 repo 會公開所有內容檔] → Confidential Project 只寫可公開的資訊,與網站顯示一致。

## Migration Plan

全新網站,無遷移。上線步驟:建立 Netlify site 連 GitHub repo → 設定 build 指令 → 開啟 Forms 通知 → 建立 Cloudflare Web Analytics site,把 token 設為環境變數 `PUBLIC_CF_ANALYTICS_TOKEN`。回滾:Netlify 後台一鍵回到上一個 deploy。

## Open Questions

- 站主實際的 Experience、Project、Service、自介、照片、履歷 PDF 內容:實作時先放範例內容,由站主替換。
