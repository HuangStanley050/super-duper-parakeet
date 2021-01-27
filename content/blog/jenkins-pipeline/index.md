---
title: Jenkins Pipeline
date: '2021-01-23'
---

## Intro

![jenkins](./jenkins.jpeg)

Jenkins is a way to implement continuous integration delivery pipeline which automates software delivery through version control right to client.

- initiating code builds
- running automated tests
- deploying to a staging or production environment

In this instance, I will be going over a simple E2E automated test when the app is deployed.

## Setup

**First thing** We need to have a repo that hosts all the jenkins jobs in a code so once any changes are made to the master branch, the job will automatically kicks off.

In the repo, we would have a **.groovy** file which lists all the jobs/tasks like this:

```
Jobs1()

void Jobs1() {
  def folderName = 'yourProjectName'
  def deployFolderName = "${folderName}/deploy"
  def e2eFolderName = "${folderName}/e2e"

  folder(folderName)
  folder(deployFolderName)
  folder(e2eFolderName)

  def apps = [

                [
                  'name':'e2e-task',
                  'repo':'yourRepoAddress',
                  'scriptPath': 'Jenkinsfile_E2E',
                  'folder': e2eFolderName,
                  'upstream': 'whereYourCodeHasBeenDeployed'
                ]
  ]

  for ( app in apps ) {
    //sensible defaults
    def title = app.service_name ?: "${app.name}-pipeline"
    def folder = app.folder ?: folderName
    def name = "${folder}/${title}"
    app.repo = app.repo ?: "repoAddress"
    app.credentials = app.credentials ?: ''
    app.scriptPath = app.scriptPath ?: 'Jenkinsfile'
    app.branch = app.branch ?: 'master'
    //app.throttleConcurrentBuilds = app.throttleConcurrentBuilds ?: true

    def appjob = pipelineJob(name)
    Helper.addPipeline(appjob, app)
  }
}
```
