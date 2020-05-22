---
title: AWS VPC(Virtual Private Cloud)
date: '2020-05-23'
---

### Things to know for the exam

VPC, Subnet, Internet Gateway and NATS Gateway

Security Groups and Network ACL

VPC peering and VPC endpoints

Site to site VPN and direct connects

## VPC Subnet

We use a Route Table to define access to the internet and the subnets within VPC

![sub](./vpc-subnet.jpg)

Top level view

![top](./vpc-high-level.jpg)

## Internet Gateway

The public subnet in VPN connects to the Internet Gateway and then Internet Gateway talks to the WWW

## NATS Gateway

Allows private subnets within VPN to access internet while remain private

![nats](./nats.jpg)
