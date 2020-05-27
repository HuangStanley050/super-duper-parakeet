---
title: AWS S3
date: '2020-05-29'
---

Bucket needs to have a globally unique name

They are defined at a region level

Naming restrictions:

- No uppercase

- No underscore

- No IP address

- Must start with a lowercase or number

- 3-63 characters long

**The Objects in the bucket have a key**

**The key is the full path:**

like:

s3://my-bucket/**myFile.jpg** or

s3://my-bucket/**dir/stuff/myFile.jpg**

the key is composed of **prefix** and **object name**

example: <u>prefix</u>---> **dir/stuff**

<u>object name</u>---> **myFile.jpg**

### There is no directory in bucket
