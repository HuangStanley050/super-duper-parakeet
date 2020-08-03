---
title: AWS DynamoDB part 5
date: '2020-08-03'
---

## Concurrency model

There is a feature that does Conditional update and Delete

This ensure the item hasn't been changed before alteration

This makes DynamoDB **Optimistic Locking** type of database

### A quick example:

![img](./concurrency.jpg)
