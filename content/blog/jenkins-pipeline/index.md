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

When the application is deployed, the automated job would kick off from the property specified from "upstream"

It would look up the script from "scriptPath", in this instance the script in the app where we would run the e2e is called **Jenkinsfile_E2E**

**Our e2e jenkin script:**

```
@Library('yourlibrary') _

pipeline {
  agent { label 'workers' }
  stages {
    stage('setup variables') {
      steps {
        script {
          // changed based on different project
          region = 'ap-southeast-2'
          account = '000000'

          // Log in to devops ECR
          sh "aws ecr get-login-password --region ${region} | docker login --username AWS --password-stdin 0000000.dkr.ecr.${region}.amazonaws.com"

          // will be the same for all projects
          env.HTTP_PROXY = 'yourProxy'
          env.HTTPS_PROXY = 'yourProxy'
          env.NO_PROXY = 'localhost,127.0.0.1,ap-southeast-2.amazonaws.com'

          envMap = [
            'lokiponyssc-e2e-dev-pipeline': 'dev',
            'lokiponyssc-e2e-sys-pipeline': 'sys'
          ]
          envString = envMap[env.JOB_BASE_NAME]
        }
        ecrDockerLogin([region: region])
        checkout scm
      }
    }

    stage('run E2E') {
      steps {
        withCredentials([string(credentialsId: 'npm-pull-key', variable: 'NPM_TOKEN')]) {
          sh """
            make e2e NPM_TOKEN=$NPM_TOKEN E2E_ENVIRONMENT=$envString
          """
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'e2e/screenshots/*.png', allowEmptyArchive: true
      archiveArtifacts artifacts: 'e2e/report/*'
      cucumber failedFeaturesNumber: -1, failedScenariosNumber: -1, failedStepsNumber: -1, fileIncludePattern: '**/*.json', jsonReportDirectory: 'e2e/report', pendingStepsNumber: -1, skippedStepsNumber: -1, sortingMethod: 'ALPHABETICAL', undefinedStepsNumber: -1
    }
    success {
      slackSend color: 'good', botUser: true, message: "*E2E Success* - ${envString} - <${env.BUILD_URL}/cucumber-html-reports/overview-features.html|#${env.BUILD_NUMBER} Report>"
    }
    failure {
      slackSend color: 'danger', botUser: true, message: "*E2E Failure* - ${envString} - <${env.BUILD_URL}/cucumber-html-reports/overview-features.html|#${env.BUILD_NUMBER} Report>"
    }
  }
}

```

One of the key information we will be looking at would be:

```
stage('run E2E') {
  steps {
    withCredentials([string(credentialsId: 'npm-pull-key', variable: 'NPM_TOKEN')]) {
      sh """
        make e2e NPM_TOKEN=$NPM_TOKEN E2E_ENVIRONMENT=$envString
      """
    }
  }
}
```

This step would tell jenkins to run a special **"Makefile"** which builds a docker container and after runs instruction in that container for the e2e tests.

```
sh """
  make e2e NPM_TOKEN=$NPM_TOKEN E2E_ENVIRONMENT=$envString
"""
```

The **make** command will look for the **Makefile** within the project directory and execute the section within that contains a _e2e_ tag like: **e2e::**
