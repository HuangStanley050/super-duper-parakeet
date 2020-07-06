---
title: AWS Lambda Part 5
date: '2020-07-06'
---

## Lambda Performance

**If you need to use cpu intensive work for lambda, it's best to increase RAM**

To get the benefits out of increased ram you need to make sure you are using multi threading in your lambda function.

Ram is from 128mb up to 3 gig, the more ram you have, the more vCPU credits you get.

Lambda will timeout after 3 secs, however you can increaes the time to up to 15 mins. So the best use case is usually between 3 secs to 15 mins.

### Execution context

It is a temporary run time environment set up to initialize any external dependency that your lambda might needs like SDK, db connections etc...

The context is maintained for sometime in anticipation for the next couple of invocations.

It will have this **/temp** where you can write files during execution.

### How to use /temp

1. If your lambda needs to download big file to work

2. if your lambda needs disk space to perform operations

3. max size is 512mb
