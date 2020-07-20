---
title: Incorporate Nightwatch + Cucumber + Browserstack with local testing
date: '2020-07-21'
---

## The task

End to end testing was something pretty new to me and I chose to pick up this task so I can learn something new. The team already has the e2e testing set up and running on a local environment and what we wanted to do was incorporate the e2e with Browserstack to leverage running tests on real devices.

The set up is pretty much what is recommended with the official documentation by the new nightwatch-api [setup with nighwatch and cucumber](https://nightwatch-api.netlify.app/cucumber/). From my limited knowledge/understanding I gather that we use cucumber-js as the test runner with the nightwatch-api using selenium capability to run the test.

The tricky part is to actually incorporate that with Browserstack and I had to spend sometime to research it and make it work.

## The challenge

Initially I thought there has to be some kind of example or documentation floating around the internet but I was not able to find what would address our setup.

Browserstack does provide example for both nightwatch and cucumber but unfortunately not combined with the new nightwatch-api

1. With nightwatch [nightwatch](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/nightwatch)

2. With cucumber [cucumber](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/cucumber)

Another great example below but unfortunately it's using the deprecated nightwatch-cucumber package so it's not applicable to our current situation.

[combined](https://markus.oberlehner.net/blog/acceptance-testing-with-nightwatch-and-cucumber-browserstack/)
