## ADDED Requirements

### Requirement: 共用版面
每頁 SHALL 有共用頁首(導覽:首頁、Projects、About、Contact、語言切換、主題切換)與頁尾。

#### Scenario: 導覽
- **WHEN** Visitor 點擊頁首 Projects
- **THEN** 前往同語言的 `/projects`

### Requirement: 深色模式
系統 SHALL 預設跟隨作業系統色彩主題,並提供手動切換;手動選擇 SHALL 在該瀏覽器記住。

#### Scenario: 跟隨系統
- **WHEN** 作業系統為深色且 Visitor 未手動選擇
- **THEN** 顯示深色主題

#### Scenario: 手動切換後重新整理
- **WHEN** Visitor 手動切換為淺色後重新整理
- **THEN** 仍顯示淺色,且無深色閃爍

### Requirement: 流量分析
每頁 SHALL 載入 Cloudflare Web Analytics,不使用 cookie。

#### Scenario: 頁面載入
- **WHEN** Visitor 開啟任一頁
- **THEN** 送出一次 Cloudflare Web Analytics 瀏覽紀錄

### Requirement: 部署
push 到 `master` SHALL 觸發 Netlify build 與部署;build 失敗時 MUST 保留上一版上線內容。

#### Scenario: 內容驗證失敗
- **WHEN** push 的內容缺少英文版
- **THEN** Netlify build 失敗,線上網站維持上一版

### Requirement: SEO 基本資訊
每頁 SHALL 有 title、description、`hreflang` 對應另一語言版本。

#### Scenario: hreflang
- **WHEN** 檢視 `/zh-tw/about` 的 HTML
- **THEN** 含指向 `/en/about` 的 `hreflang="en"` 連結
