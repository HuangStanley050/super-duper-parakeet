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

**ECS service with load balancers**

![load](./loadBalance.jpg)

## ECR

## Fargate

Before Fargate:

- We have to create our own EC2 instances when launching an ECS cluster

- If we need to scale, we need to add our own EC2 instances.

- Therefore we need to manage infrastructure.

After Fargate:

- All serverless

- No need to provision EC2 instances

- Just need to create task definitions and AWS run it for us

- To scale, just need to increase the task number, no more EC2s.

## ECS IAM

**EC2 Instance Profile Role**

- Used by the ECS agent

- Make api call to ECS service

- Send container log to CloudWatch logs

- Pull docker images from ECR

## ECS Task and Restraint

## ECS Autoscaling
