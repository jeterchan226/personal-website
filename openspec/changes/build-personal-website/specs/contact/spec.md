## ADDED Requirements

### Requirement: 聯絡表單
`/contact` SHALL 提供表單,欄位為姓名、email、類型(求職邀約／合作詢問／其他)、訊息,皆為必填。

#### Scenario: 成功送出
- **WHEN** Visitor 填妥所有欄位並送出
- **THEN** 顯示送出成功頁面,站主收到 email 通知

#### Scenario: 欄位未填
- **WHEN** Visitor 未填 email 就送出
- **THEN** 瀏覽器阻止送出並提示必填

### Requirement: 防垃圾訊息
表單 SHALL 包含 honeypot 欄位;該欄位有值的送出 MUST 被丟棄。

#### Scenario: 機器人填寫 honeypot
- **WHEN** 送出內容的 honeypot 欄位有值
- **THEN** 不產生通知

### Requirement: 社群連結
`/contact` SHALL 顯示 email、LinkedIn、GitHub 連結。

#### Scenario: 顯示連結
- **WHEN** Visitor 開啟 `/contact`
- **THEN** 看到三個連結
