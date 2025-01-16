# teams-incoming-webhook-action

[![Build and Test](https://github.com/mikesprague/teams-incoming-webhook-action/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/mikesprague/teams-incoming-webhook-action/actions/workflows/build-and-test.yml)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=406118991)

Sends an [AdaptiveCard](https://adaptivecards.io/explorer/) notification to an [MS Teams Incoming Webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) from a GitHub Action Workflow

This action requires a secret to be set up with your Teams Incoming Webhook URL named `MS_TEAMS_WEBHOOK_URL` ([official docs for creating secrets in your repo](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository))

- [Inputs](#inputs)
- [Example Usage](#example-usage)
  - [Simple Notification](#simple-notification)
  - [Workflow Status Notifications](#workflow-status-notifications)
    - [Info Notification](#info-notification)
    - [Cancel Notification](#cancel-notification)
    - [Failure Notification](#failure-notification)
    - [Success Message](#success-message)

## Inputs

- `github-token`
  - **required:** true
  - **type:** string
  - **description:** GitHub Token for API operations (see examples for how to reference)
  - **example:** `github-token: ${{ github.token }}`
- `webhook-url`
  - **required:** true
  - **type:** string
  - **description:** MS Teams Incoming Webhook URL
  - **example:** `webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}`
- `title`
  - **required:** true
  - **type:** string
  - **description:** Message title or heading
  - **example:** `title: "Test Message Heading"`
- `message`
  - **required:** false
  - **type:** string
  - **default:** `""`
  - **description:** Message to be sent (not used for workflow status notifications)
  - **example:** `message: "This is some test message content for a simple notification"`
- `color`
  - **required:** false
  - **type:** string
  - **default:** `"default"`
  - **description:** Background color of the heading in the message - accepts `default`, `info`, `success`, `failure`, `warning` as values
  - **example:** `color: "info"`
- `deploy-card`
  - **required:** false
  - **type:** boolean
  - **default:** `false`
  - **description:** Sends a workflow notification that is built dynamically from commit and repo info
  - **example:** `deploy-card: true`
- `timezone`
  - **required:** false
  - **type:** string
  - **default:** `"America/New_York"`
  - **description:** Timezone to use for timestamps in messages
  - **example:** `timezone: "Europe/Rome"`

## Example Usage

This action was built with the intention of sending workflow status notifications but also supports a simple message style

### Simple Notification

The following sends a simple notification with a title and message

```yaml
- name: Send simple notification
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    title: 'Notification Test'
    message: 'This is an example of a simple notification with a title and a body'
```

![Simple Notification Example](./readme-images/simple-notification.png 'Simple Notification Example')

### Workflow Status Notifications

The following examples show how to send notifications based on your workflow status

#### Info Notification

Include as first step in workflow to notify workflow run has started

```yaml
- name: Deploy Started Notification
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Deployment Started'
    color: 'info'
```

![Deploy Notification Example - Info](./readme-images/deploy-info.png 'Deploy Notification Example - Info')

#### Cancel Notification

Include anywhere in steps to notify workflow run has been cancelled

```yaml
- name: Cancelled Notification
  if: ${{ cancelled() }}
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Deployment Cancelled'
    color: 'warning'
```

![Deploy Notification Example - Info](./readme-images/deploy-cancel.png 'Deploy Notification Example - Info')

#### Failure Notification

Include anywhere in steps to notify when a workflow run fails

```yaml
- name: Failure Notification
  if: ${{ failure() }}
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Deployment Failed'
    color: 'failure'
```

![Deploy Notification Example - Info](./readme-images/deploy-fail.png 'Deploy Notification Example - Info')

#### Success Message

Include anywhere in steps to notify when workflow run is successful

```yaml
- name: Success Notification
  if: ${{ success() }}
  uses: mikesprague/teams-incoming-webhook-action@v1
  with:
    github-token: ${{ github.token }}
    webhook-url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    deploy-card: true
    title: 'Deployment Successful'
    color: 'success'
```

![Deploy Notification Example - Success](./readme-images/deploy-success.png 'Deploy Notification Example - Success')

