---
title: AWS Lambda Final/Summary
date: '2020-07-14'
---

## Lambda Limits

**Execution**

1. Memory allocation is between 128mb to 3008mb

2. Max run time is 15 mins(300sec)

3. Environment variable size is capped at 4k

4. Temporary disk capacity at /temp is 512mb

5. Concurrent execution up to 1000 but can be increased

**Deployment**

1. Lambda function size is 50mb

2. Uncompressed deployment is 250mb (unzipped + external dependencies)

3. Env size is 4k as well

## Best practice

**Perform heavy duty work outside of lambda**

- Connect to db outside of function

- Initialize AWS SDK outside of function

- Put dependencies outside of lambda

**Avoid using recursive code with lambda**
