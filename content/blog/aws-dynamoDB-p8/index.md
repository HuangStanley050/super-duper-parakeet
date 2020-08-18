---
title: AWS DynamoDB part 8
date: '2020-08-18'
---

## DynamoDB TTL

It will automatically delete an item after expiry date and time.

It comes with no extra cost nor any usage with WCU and RCU.

Help reduce storage and manage size over time.

It is enabled per row, you define a TTL column and put date in there.

Typically gets deleted after 48 hours.

DynamDB stream can potentially help recover the item base on events
