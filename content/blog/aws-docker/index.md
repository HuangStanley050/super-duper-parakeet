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

![iam](./IAM.png)

**EC2 Instance Profile Role**

- Used by the ECS agent

- Make api call to ECS service

- Send container log to CloudWatch logs

- Pull docker images from ECR

**ECS task role**

- Allow each task to have a specific role

- Use different task role for different ECS service you run.

* Task role are defined in Task Definitions

## ECS Task and Restraint

When a type of EC2 instance is launched, ECS must determine where to place it with the constraints of CPU, memory and available ports.

As well as when we scale a service, ECS needs to know which service to terminate.

![cons](./constraints.png)

This is where you can define **Task placement strategy** and **Task constraints placement**

## ECS Autoscaling