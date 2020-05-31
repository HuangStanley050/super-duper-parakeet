---
title: AWS S3 (Advance)
date: '2020-06-01'
---

Can enable **S3 MFA delete**, which means that you can't delete your objects in the bucket without the root account permission, plus MFA access with a device.

S3 default encryption make it easy to encrypt objects being uploaded to the bucket and it is the new way for encryption, the old way is through bucket policy and **bucket policy will always be evaluated before** anything.
