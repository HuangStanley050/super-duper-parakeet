---
title: AWS Elastic Cache
date: '2020-06-11'
---

It is a managed db cache service with Redis or Memcached.

Basic idea is for the application to query the Elastic Cache if it's a hit it reads from Elastic cache and if it's a miss then it will query RDS or whatever db and store that result in Elastic Cache.

![cache](./cache.jpg)

## Example for a user session store

![sesson](./session.jpg)
