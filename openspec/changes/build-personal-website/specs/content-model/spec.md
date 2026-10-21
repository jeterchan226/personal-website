## ADDED Requirements

### Requirement: 內容以雙語檔案配對
系統 SHALL 以每種語言一個 Markdown 檔表示一份內容(Experience、Project、Service、About),放在 `zh-tw/` 與 `en/` 子目錄下,以相同檔名(slug)配對。

#### Scenario: 中英檔案齊全
- **WHEN** `projects/zh-tw/order-system.md` 與 `projects/en/order-system.md` 都存在且欄位合法
- **THEN** build 成功,兩種語言站都產生該 Project

#### Scenario: 缺少英文版
- **WHEN** `projects/zh-tw/order-system.md` 存在但 `projects/en/order-system.md` 不存在
- **THEN** build 失敗,錯誤訊息指出缺少的語言與 slug

#### Scenario: 缺少中文版
- **WHEN** 某 slug 只有 `en/` 檔案
- **THEN** build 失敗,錯誤訊息指出缺少的語言與 slug

### Requirement: Project 欄位
每個 Project SHALL 包含:名稱、一句話摘要、起始日期、結束日期(選填)、角色、Tech 清單、成果清單、是否 Confidential、是否 featured,以及選填的所屬 Experience、GitHub 連結、demo 連結、封面圖、客戶產業描述;內文為 Markdown。

#### Scenario: 欄位格式錯誤
- **WHEN** Project 缺少必填欄位或欄位型別錯誤
- **THEN** build 失敗,錯誤訊息指出檔案與欄位

#### Scenario: 結束日期留空
- **WHEN** Project 未填結束日期
- **THEN** 該 Project 視為進行中

### Requirement: Project 隸屬至多一段 Experience
Project SHALL 隸屬 0 或 1 段 Experience;若有填寫,引用的 Experience slug MUST 存在。

#### Scenario: 引用不存在的 Experience
- **WHEN** Project 的所屬 Experience 指向不存在的 slug
- **THEN** build 失敗,錯誤訊息指出錯誤的 slug

### Requirement: Confidential Project 不得有連結
標記為 Confidential 的 Project MUST NOT 含 GitHub 或 demo 連結,且 MUST 填寫客戶產業描述。

#### Scenario: Confidential 含連結
- **WHEN** Confidential Project 填了 GitHub 或 demo 連結
- **THEN** build 失敗,錯誤訊息指出檔案

#### Scenario: Confidential 缺產業描述
- **WHEN** Confidential Project 未填客戶產業描述
- **THEN** build 失敗

### Requirement: Experience 欄位
每段 Experience SHALL 包含:組織名、職稱、起始日期、結束日期(選填,留空為至今)、地點(選填)、描述。

#### Scenario: Experience 欄位合法
- **WHEN** Experience 檔案含所有必填欄位
- **THEN** build 成功

### Requirement: Service 引用 Project
每個 Service SHALL 包含名稱、描述、顯示順序與 Project slug 清單;一個 Project 可被多個 Service 引用。清單中每個 slug MUST 存在。

#### Scenario: Service 引用不存在的 Project
- **WHEN** Service 的 Project 清單含 `oder-system`,而該 slug 不存在
- **THEN** build 失敗,錯誤訊息指出 Service 與錯誤的 slug

#### Scenario: 同一 Project 屬於多個 Service
- **WHEN** 兩個 Service 都列出 `order-system`
- **THEN** build 成功,兩個 Service 下都顯示該 Project

### Requirement: 雙語配對的結構欄位一致
同一 slug 的中英兩檔中,非文字欄位(日期、Tech、Confidential、featured、所屬 Experience、連結、Service 的顯示順序與 Project 清單)MUST 相同。

#### Scenario: 兩版 Tech 不一致
- **WHEN** 中文版 Tech 為 `[Go, Kafka]`,英文版為 `[Go]`
- **THEN** build 失敗,錯誤訊息指出不一致的欄位
