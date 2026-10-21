# personal-website

個人網站:介紹自己、任職經歷與專案。Astro + React islands + Tailwind,部署在 Netlify。名詞定義見 [`GLOSSARY.md`](GLOSSARY.md)。

## 本機開發

需要 Node 24(`nvm use` 會讀 `.nvmrc`)。

```sh
npm install
npm run dev      # http://localhost:4321
npm run verify   # 型別檢查 + 測試 + build,和 Netlify 上跑的一樣
```

## 新增或修改內容

所有內容都在 `src/content/`,每份內容中英各一個檔案,檔名(slug)相同:

```
src/content/
├── projects/{zh-tw,en}/<slug>.md      # Project
├── experiences/{zh-tw,en}/<slug>.md   # Experience
├── services/{zh-tw,en}/<slug>.md      # Service
└── about/{zh-tw,en}/about.md          # 自介(首頁 hero 也用這裡的 name、headline)
```

欄位定義在 `src/content.config.ts`。複製現有檔案改最快。

build 會擋下以下錯誤(訊息會指出檔案):

- 只有一種語言版本
- 中英兩版的非文字欄位不同(日期、`tech`、`confidential`、`featured`、`experience`、連結、Service 的 `projects`、`order`)
- Project 的 `experience`、Service 的 `projects` 指向不存在的 slug
- `confidential: true` 的 Project 有 `github`／`demo`,或沒填 `clientIndustry`

其他要替換的東西:

- `src/config/site.ts`:名字、email、LinkedIn、GitHub
- `src/assets/photo.svg`:照片(換成 `.jpg`/`.png` 時,一併改 `about.md` 的 `photo`)
- `public/resume/resume-zh-tw.pdf`、`resume-en.pdf`:履歷
- `astro.config.mjs` 的 `site`:正式網址

## 部署(第一次)

1. 在 Netlify 建立 site,連到這個 GitHub repo。build 設定會自動讀 `netlify.toml`。
2. Netlify 後台 → Forms → 開啟表單偵測,並在 Form notifications 設定 email 通知。
3. Cloudflare Web Analytics 建立網站,把 token 設成 Netlify 環境變數 `PUBLIC_CF_ANALYTICS_TOKEN`,重新部署。

之後 push 到 `master` 就會自動部署;build 失敗時,線上網站維持上一版。
