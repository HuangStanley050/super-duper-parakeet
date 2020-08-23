---
title: AWS DynamoDB part 10
date: '2020-08-23'
---

## DynamoDB transactions

It is a new feature which you can update/create/delete multiple rows in different tables at the same time.

It is an all or nothing type of operation.

## DynamoDB Session state

**Difference compared with other AWS services**

- ElasticCache - only in memory but dynamoDB is serverless

- EFS - EFS must be attached to an ec2 instance as a network drive

- EBS - This can only be used for local caching not shared caching

- S3 - It is meant for bigger objects and has higher latency
