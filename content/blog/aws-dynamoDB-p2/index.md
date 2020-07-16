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

Example 3: 120 objects per minute with 2kb each

Result: (120/60) \* 2 = 4 WCU

### RCU

There are **Strongly Consistent Read** and **Eventually Consistent Read** type

One read capacity for strong consistent read is 1rcu per second and for eventually consistent read is 2rcu per second for item up to 4kb

Example 1: 10 strong consistent read per second for 4kb each

Result: 10 / 4 \* 4 = 10 RCU

Example 2: 16 eventually consistent read per second for 12kb each

Result: (16 / 2) \* (12 / 4) = 24 RCU
