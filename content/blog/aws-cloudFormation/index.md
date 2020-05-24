---
title: AWS CloudFormation
date: '2020-05-25'
---

**CloudFormation powers the idea of infrastructure as code.**

<u>You use CloudFormation in a declaration way, for instance:</u>

You can create a security group

You can provision two ec2 instances using this security group

You can provision a s3 bucket

You can put a load balancer in front of these ec2 machines.

### CloudFormation Building blocks

**Mandatory ----> Resources**

**Parameters ---> Dynamic input for the template**

**Mapping ---> the static variable for the template**

**Output ---> reference to what is created**

**Conditionals**

**Metadata**

You can delete the cloudformation template and it will delete all the resources that it created in the first place.

## Identify resources used in the cloudformation like this:

(224 resources!!)

**AWS::aws-production-name::data-type-name**

## Why use parameters in CloudFormation?

If you want to re use a cloudformation template across the organization or if the input cant be know ahead of the time
