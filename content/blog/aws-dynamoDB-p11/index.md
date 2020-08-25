---
title: AWS DynamoDB part 11
date: '2020-08-25'
---

## DynamoDB conditional write, atomic write and concurrent write

Concurrent write will always favours whoever writes last to the database but with conditional write implemented you can use the condition to determine who's writes overwrites the others.

Atomic writes is like you take the value modified by the first person and then add the value changed by the second person.

![pic](./atomic.jpg)

## DynamoDB pattern with S3

## DynamoDB operation

## DynamoDB security
