---
title: AWS Docker
date: '2020-09-09'
---

## ECS (Elastic Container Service)

They are logical grouping of EC2 instances

EC2 instance run an ECS agent (Docker Container)

ECS agent then register the instance to the ECS cluster

![ecs](./ecs.jpg)

**Task Definitions**

They are in JSON form of metadata and tells ECS how to run a docker container.

Crucial information included are:

- Image name

- Port binding for container and host

* Memory and CUP

* Environment variable

* Network information

![docker](./docker.jpg)

## ECS Service

This defines how many services should be run and how they should run it across the EC2 fleets.

They can be linked to NLB/ELB and ALB is necessary

## ECR

## Fargate

## ECS IAM

## ECS Task and Restraint

## ECS Autoscaling
