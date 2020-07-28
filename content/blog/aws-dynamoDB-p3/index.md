---
title: AWS DynamoDB part 3
date: '2020-07-29'
---

## DynamoDB API's

### Writing Data

1. PutItem

2. UpdateItem

### Delete Data

1. DeleteItem

2. DeleteTable

### Batch Writing

1. BatchWriteItem (upto 25 PutItem/DeleteItem)

up to 16mb per data and 400kb of data per item

### Read Data

1. GetItem

2. BatchGetItem (up to 100 items and 16mb)

### Query

Return items base on:

- Partition key value

- Sort key value
