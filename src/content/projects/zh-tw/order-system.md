---
title: 訂單系統重構
summary: 把單體訂單服務拆成事件驅動架構,撐住雙 11 流量。
startDate: 2023-01-01
endDate: 2023-10-01
role: 技術負責人
tech: [Go, PostgreSQL, Kafka]
outcomes:
  - 尖峰處理量提升 5 倍
  - P99 延遲從 800ms 降到 120ms
featured: true
experience: acme
---

## 背景

原本的訂單服務是單體應用,每到大促就需要人工擴容,仍常超時。

## 作法

- 以 Kafka 拆出下單、庫存、通知三個服務
- 用 outbox pattern 保證資料一致
- 逐步切流,全程零停機
