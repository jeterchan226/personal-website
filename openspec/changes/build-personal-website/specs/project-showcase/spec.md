## ADDED Requirements

### Requirement: 首頁內容
首頁 SHALL 依序顯示:自我介紹 hero、Service 區塊、featured Project、聯絡 CTA。

#### Scenario: 顯示 featured Project
- **WHEN** 有 3 個 Project 標記 featured
- **THEN** 首頁精選區顯示這 3 個 Project 卡片

### Requirement: Service 區塊
每個 Service SHALL 顯示名稱、描述,以及連到其引用 Project 的連結。

#### Scenario: 點擊 Service 下的 Project
- **WHEN** Visitor 點擊 Service 下的 Project 連結
- **THEN** 前往該 Project 詳細頁

### Requirement: Project 列表
`/projects` SHALL 列出所有 Project,依起始日期新到舊排序;每張卡片顯示名稱、摘要、期間、Tech、成果。

#### Scenario: 排序
- **WHEN** 有起始於 2023 與 2025 的兩個 Project
- **THEN** 2025 的排在前面

### Requirement: Tech 篩選
`/projects` SHALL 提供 Tech 標籤按鈕;選取一個 Tech 時只顯示含該 Tech 的 Project,再次點擊取消篩選。

#### Scenario: 篩選 Go
- **WHEN** Visitor 點擊 `Go`
- **THEN** 只顯示 Tech 含 `Go` 的 Project

#### Scenario: 取消篩選
- **WHEN** Visitor 再次點擊已選的 `Go`
- **THEN** 顯示所有 Project

#### Scenario: JavaScript 停用
- **WHEN** 瀏覽器停用 JavaScript
- **THEN** 仍顯示完整 Project 列表

### Requirement: Project 詳細頁
`/projects/[slug]` SHALL 顯示 Project 所有欄位與 Markdown 內文;若隸屬 Experience,顯示雇主名稱與職稱。

#### Scenario: 一般 Project
- **WHEN** Visitor 開啟非 Confidential 且有 GitHub 連結的 Project
- **THEN** 頁面顯示 GitHub 連結

### Requirement: Confidential Project 呈現
Confidential Project SHALL 以客戶產業描述代替客戶名稱,顯示保密標示,不顯示任何原始碼或 demo 連結;所屬 Experience 的雇主名稱照常顯示。

#### Scenario: 顯示 Confidential Project
- **WHEN** Visitor 開啟隸屬 A 公司、客戶產業為「金融業」的 Confidential Project
- **THEN** 頁面顯示 A 公司名稱與「金融業客戶」,無連結
