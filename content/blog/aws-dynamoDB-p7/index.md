---
title: AWS DynamoDB part 7
date: '2020-08-14'
---

## DynamoDB Stream

Any change operations including update, edit or create, you can use DynamoDB stream.

The stream can be used in real time with AWS Lambda or EC2 instances, for example, the operations that we can do are:

- React to change in real time (send a welcome email)

- Analytics

- Create derivative table or views

- Insert into Elastic search

**Could implement cross region replication with Stream**

**Stream only have retention of data for 24 hours**

### Type of information to be sent via the stream when table is modified

1. KEYS_ONLY: only the key of the modified item

2. NEW_IMAGE: the entire item after it's modified

3. OLD_IMAGE: the entire item, before it's modified

4. NEW_AND_OLD_IMAGE: both the new and old images of the item
