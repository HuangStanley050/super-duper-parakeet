---
title: AWS DynamoDB Part 2
date: '2020-07-18'
---

## Throughput

**Table must provision read/write capacity unit**

1. Read Capacity Unit (RCU)

2. Write Capacity Unit (WCU)

### WCU

one wcu represents 1kb

Example 1: Writing 10 objects per sec and each object is 2kb.

Result: 20 WCU

Example 2: 6 object per second with 4.5kb.

Result : 6 \* 5 = 30 WCU (result is rounded to upper limit)
