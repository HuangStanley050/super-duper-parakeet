---
title: AWS Lambda part 1
date: '2020-06-29'
---

Virtual functions that have no servers to manage.

Limit execution time.

Running only on demand.

Scaling is automated.

## Benefits

1. Easy pricing

2. Easy integration with other AWS services

3. Easy monitoring with AWS Cloudwatch

4. Can get more resource per funtions (up to 3gig of RAM)

## Languages supported

1. NodeJS

2. C#

3. Java

4. Python

5. Golang

6. Ruby

**Docker is not running on lambda**

## Main servies integrations

![integration](./integration.jpg)

## As a REST API

**Connect via------>**

### Translate http to json, vice versa back to ALB and API gateway

- ALB (Application Load Balancer)

  Support multi header values such as query string, it will be converted to an array.

  ![multi](./multi.jpg)

- API Gateway
