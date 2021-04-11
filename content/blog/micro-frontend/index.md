---
title: Micro Front End
date: '2021-04-08'
---

![yakuza](./yakuza.jpg)

## Intro

You can't talk about micro frontend without knowing something about micro-services. The whole idea is to split the services into its own stand alone api's instead of utilizing the old monolithic architecture like before. With Micro services, you are able to have multiple teams working on different set of api's independently without relying too much on other teams.

What about front end app? Traditionally it's done as one giant code base but with the popularity of the micro services idea, the micro front end concept is born.

## A simple example:

We could have an app that displays a list of products and a shopping cart, with micro front end what that means is that one engineering team could work on the products portion and the other team could work on the cart portion.

![mff](./mfe.png)

There are three parts of this:

- **Container**: Holds **Products** and **Cart**

- **Products**: Stand alone application

- **Cart**: Another stand alone application

It's all made possible with the new feature from Webpack, which is called **Module Federation**
