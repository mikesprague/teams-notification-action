import { getEmoji } from '../helpers.js';

export interface DeployCardParams {
  title: string;
  message: string;
  color: string;
  commit: any;
  branch: string | undefined;
  author: any;
  runNum: string;
  runId: string;
  repoName: string;
  sha: string;
  repoUrl: string;
  timestamp: string;
}

export const populateCard = ({
  title,
  message,
  color,
  commit,
  branch,
  author,
  runNum,
  runId,
  repoName,
  sha,
  repoUrl,
  timestamp,
}: DeployCardParams) => {
  const messageArray = [];
  if (message) {
    messageArray.push({
      type: 'TextBlock',
      text: message,
      wrap: true,
      spacing: 'None',
    });
  }

  return {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          version: '1.3',
          msteams: {
            width: 'Full',
          },
          body: [
            {
              type: 'Container',
              items: [
                {
                  type: 'TextBlock',
                  text: `${getEmoji(color)}${title}`,
                  wrap: true,
                  size: 'Large',
                  weight: 'Bolder',
                },
              ],
              style: color,
              bleed: true,
            },
            {
              type: 'TextBlock',
              text: `**Workflow Run #${runNum}** on [${repoName}](${repoUrl})`,
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: `by ${commit.data.commit.author.name}${
                author?.login ? ` (@${author.login})` : ''
              } on ${timestamp}`,
              wrap: true,
              size: 'Small',
              spacing: 'None',
            },
            ...messageArray,
            {
              type: 'FactSet',
              facts: [
                {
                  title: 'Branch',
                  value: branch,
                },
                {
                  title: 'Commit',
                  value: `${sha.substr(0, 7)}`,
                },
              ],
            },
            {
              type: 'ActionSet',
              actions: [
                {
                  type: 'Action.OpenUrl',
                  title: 'View Workflow Run',
                  url: `${repoUrl}/actions/runs/${runId}`,
                  style: 'default',
                },
                {
                  type: 'Action.OpenUrl',
                  title: 'View Commit Changes',
                  url: commit.data.html_url,
                  style: 'default',
                },
              ],
            },
          ],
        },
      },
    ],
  };
};
