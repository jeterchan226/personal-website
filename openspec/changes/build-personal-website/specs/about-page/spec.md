## ADDED Requirements

### Requirement: 自介與照片
`/about` SHALL 顯示站主照片與 About 自介內文。

#### Scenario: 開啟 About
- **WHEN** Visitor 開啟 `/zh-tw/about`
- **THEN** 顯示照片與中文自介

### Requirement: Experience 時間軸
`/about` SHALL 以時間軸列出所有 Experience,新到舊排序;每段顯示組織、職稱、期間、地點、描述,以及隸屬該 Experience 的 Project 連結。

#### Scenario: Experience 下有 Project
- **WHEN** 兩個 Project 隸屬 A 公司的 Experience
- **THEN** A 公司那段下方列出這兩個 Project 的連結

#### Scenario: 進行中的 Experience
- **WHEN** Experience 未填結束日期
- **THEN** 期間顯示「至今」/「Present」

### Requirement: 履歷 PDF 下載
`/about` SHALL 提供履歷 PDF 下載,中文頁提供中文版,英文頁提供英文版。

#### Scenario: 英文頁下載
- **WHEN** Visitor 在 `/en/about` 點擊下載履歷
- **THEN** 下載英文版 PDF
