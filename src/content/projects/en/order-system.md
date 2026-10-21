---
title: Order System Rebuild
summary: Split a monolithic order service into an event-driven architecture that survives peak sales traffic.
startDate: 2023-01-01
endDate: 2023-10-01
role: Tech Lead
tech: [Go, PostgreSQL, Kafka]
outcomes:
  - 5x peak throughput
  - P99 latency down from 800ms to 120ms
featured: true
experience: acme
---

## Background

The order service was a monolith that needed manual scaling before every big sale and still timed out.

## Approach

- Split ordering, inventory and notifications into three services over Kafka
- Kept data consistent with the outbox pattern
- Shifted traffic gradually with zero downtime
