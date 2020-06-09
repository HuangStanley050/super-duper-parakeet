---
title: AWS RDS
date: '2020-06-09'
---

## DB engines managed by AWS

- Postgres

- Mysql

- MariaDB

- Oracle

- MS SQL Server

- Aurora

### Why use this instead of using your own DB on EC2?

1. Automated provisioning, OS patching

2. Continuous backup

3. Monitor dashboard

4. Read replicas

5. Multi AZ set up for diaster recover

6. Maintenance window

7. Scaling both vertically and horizontally

8. Storaged backed by EBS

## Backup Automatic

![backup](./rdsBackup.jpg)

## Read Replicas vs Multi AZ

It helps only with read operation with dbs

**can make up to 5 read replicas**

**within AZ, cross AZ or cross region**

**Replications are async and will be eventually consistent**
