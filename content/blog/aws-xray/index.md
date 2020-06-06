---
title: AWS Xray
date: '2020-06-07'
---

It is a service very similar to CloudWatch that collection information about requests that your application serves and provides to tool for you to view, filter and gain insight into the data to identify issues and opportunities for optimization.

## How Xray works

X-ray SDK embedded inside your app ---> X-ray daemon ---> X-ray API ---> X-ray console which will display all the inforamtion.

### Xray SDK includes:

- Interceptor to trace incoming HTTP requests

- Client handler that instructment AWS SDK client to call other AWS services

- An HTTP client that can call other internal and external web services

### Xray integrats with:

- ELB

- Lambda

- API gateway

- EC2

- Elastic Beanstalk

**Languages supported**

1. Go

2. Node

3. Ruby

4. Python

5. Java

6. .NET
