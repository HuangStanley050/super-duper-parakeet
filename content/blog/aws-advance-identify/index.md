---
title: AWS advanced identity
date: '2020-08-27'
---

## STS (Security Token Service)

Allows temporary and limited access to AWS services (up to 1 hour)

- AssumeRole

- AssumeRoleWithSAML

- AssumeRoleWithWebIdentity

- GetSessionToken

- GetFederationToken

- GetCallerIdentity

* DecodeAuthorizationMessage

**How does it work?**

![role](./role.jpg)

![cross](./cross.jpg)

![mfa](./mfa.jpg)

## Advanced IAM

## Grant user permission to pass role to AWS service

To configure many AWS services, you must pass an IAM role to the service.

The service will later assume the role and perform the actions.

Some examples are:

- To an EC2 instance

- To a Lambda function

- To an ECS task

- To CodePipeline to allow it to invoke other services

You need this: **iam:PassRole**

## Directory Service
