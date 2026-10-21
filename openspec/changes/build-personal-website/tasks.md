## 1. 專案初始化

- [x] 1.1 建立 Astro 專案(TypeScript strict),加入 `@astrojs/react`、`react`、`react-dom`
- [x] 1.2 加入 Tailwind CSS v4(`@tailwindcss/vite`)與 `@tailwindcss/typography`
- [x] 1.3 加入 Vitest,設定 `npm test`
- [x] 1.4 設定 `astro.config.mjs` i18n:`locales: ['zh-tw','en']`、`defaultLocale: 'zh-tw'`、`prefixDefaultLocale: true`
- [x] 1.5 建立 `netlify.toml`(build 指令 `astro check && vitest run && astro build`)與 `public/_redirects`(`/` 依 Language 導向)
- [x] 1.6 更新 `.gitignore`、`README.md`(本機開發與新增內容的步驟)

## 2. 內容模型

- [x] 2.1 在 `src/content.config.ts` 定義 `projects`、`experiences`、`services`、`about` 的 Zod schema
- [x] 2.2 寫 `src/lib/content/validate.ts` 跨檔驗證純函式:中英齊全、結構欄位一致、Experience／Project 引用存在、Confidential 無連結且有產業描述
- [x] 2.3 為 2.2 每條規則寫 Vitest 測試(先寫測試,看它失敗,再實作)
- [x] 2.4 寫 `src/lib/content/index.ts` 資料存取函式(`getProjects`、`getProject`、`getExperiences`、`getServices`、`getAbout`),首次呼叫時執行驗證,失敗即丟錯
- [x] 2.5 建立範例內容:2 段 Experience、4 個 Project(含 1 個 Confidential、1 個 side project)、2 個 Service、About,中英各一

## 3. i18n

- [x] 3.1 建立 `src/i18n/ui.ts` 介面文字表與 `t(lang, key)` 函式
- [x] 3.2 建立 `src/i18n/format.ts` 期間格式化(含「至今」/「Present」),寫 Vitest 測試
- [x] 3.3 建立語言切換連結 helper(目前路徑換語言前綴)

## 4. 版面框架

- [x] 4.1 `src/styles/global.css`:引入 Tailwind、設定 `dark` variant 綁定 `data-theme`、基本色票與字型
- [x] 4.2 `BaseLayout.astro`:title、description、hreflang、主題初始化 inline script、Cloudflare Analytics script(讀 `PUBLIC_CF_ANALYTICS_TOKEN`,未設定則不載入)
- [x] 4.3 `Header.astro`(導覽 + 語言切換)、`Footer.astro`
- [x] 4.4 `ThemeToggle.tsx` React island

## 5. Project 展示

- [x] 5.1 `ProjectCard.astro`(名稱、摘要、期間、Tech、成果,`data-tech` 屬性)
- [x] 5.2 `/[lang]/projects/index.astro`:新到舊列表
- [x] 5.3 `TechFilter.tsx` React island:切換 Tech、隱藏不符卡片
- [x] 5.4 `/[lang]/projects/[slug].astro`:詳細頁、所屬 Experience、連結、Confidential 呈現
- [x] 5.5 `ServiceList.astro`
- [x] 5.6 `/[lang]/index.astro` 首頁:hero、Service、featured Project、聯絡 CTA

## 6. About

- [x] 6.1 `ExperienceTimeline.astro`:新到舊,列出所屬 Project 連結
- [x] 6.2 `/[lang]/about.astro`:照片、自介、時間軸、履歷 PDF 下載
- [x] 6.3 放入範例照片與 `public/resume/resume-zh-tw.pdf`、`resume-en.pdf` 佔位檔

## 7. 聯絡

- [x] 7.1 `ContactForm.astro`:Netlify Forms、honeypot、必填欄位、類型選項
- [x] 7.2 `/[lang]/contact.astro`(表單 + email／LinkedIn／GitHub)與 `/[lang]/contact/thanks.astro`
- [x] 7.3 本機 `/` 後備頁(連到兩種語言)

## 8. 驗證與部署

- [x] 8.1 `astro check`、`vitest run`、`astro build` 全部通過
- [x] 8.2 手動測試:刪掉一個英文 Project 檔,確認 build 失敗且訊息清楚;還原
- [x] 8.3 本機預覽檢查所有頁面中英版、深色模式、Tech 篩選、停用 JavaScript 時列表完整
- [ ] 8.4 建立 Netlify site 並部署(預設子網域),開啟 Forms email 通知
- [ ] 8.5 建立 Cloudflare Web Analytics,設定 `PUBLIC_CF_ANALYTICS_TOKEN`,重新部署並確認有紀錄
