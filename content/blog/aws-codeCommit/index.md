---
title: AWS CodeCommit
date: '2020-06-12'
---

## Security

1. HTTPS

2. SSH

3. MFA

## Cross account usage

**Never share ssh keys**

**Never share aws creds**

**DO use isam roles and AWS STS**

### Notifications

Can integrate with lambda, sns and cloud watch events rules

Use cases are:

- Deletion of brabnch

- Push to master

- Notify external build system

- Trigger lambda to do code analysis

- Pull request updates
