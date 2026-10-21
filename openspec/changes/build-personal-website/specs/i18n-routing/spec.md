## ADDED Requirements

### Requirement: 雙語網址前綴
系統 SHALL 為每個頁面產生 `/zh-tw/` 與 `/en/` 兩個版本。

#### Scenario: 存取英文 Project 頁
- **WHEN** Visitor 開啟 `/en/projects/order-system`
- **THEN** 顯示該 Project 英文版

### Requirement: 根路徑依瀏覽器語言導向
存取 `/` 時,系統 SHALL 依瀏覽器語言導向:英文導向 `/en/`,其餘導向 `/zh-tw/`。

#### Scenario: 英文瀏覽器
- **WHEN** 瀏覽器偏好語言為 `en-US` 的 Visitor 開啟 `/`
- **THEN** 導向 `/en/`

#### Scenario: 無法判斷語言
- **WHEN** 瀏覽器未提供可辨識的語言偏好
- **THEN** 導向 `/zh-tw/`

### Requirement: 語言切換
每頁 SHALL 提供語言切換,切換後停留在另一語言的對應頁面。

#### Scenario: 在 Project 頁切換語言
- **WHEN** Visitor 在 `/zh-tw/projects/order-system` 切換為英文
- **THEN** 前往 `/en/projects/order-system`

### Requirement: 介面文字雙語
導覽、按鈕、標籤等介面文字 SHALL 依頁面語言顯示。

#### Scenario: 日期格式
- **WHEN** 進行中 Project 起始於 2024 年 3 月
- **THEN** 中文頁顯示「2024.03 – 至今」,英文頁顯示「Mar 2024 – Present」
