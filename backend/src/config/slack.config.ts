import { WebClient } from '@slack/web-api';

export interface SlackConfig {
  botToken: string;
  webhookUrl: string;
  channelId: string;
  enabled: boolean;
}

export const slackConfig: SlackConfig = {
  botToken: process.env.SLACK_BOT_TOKEN || '',
  webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
  channelId: process.env.SLACK_CHANNEL_ID || '',
  enabled: process.env.SLACK_ENABLED === 'true',
};

export const createSlackClient = (): WebClient | null => {
  if (!slackConfig.enabled || !slackConfig.botToken) {
    console.warn('Slack is not enabled or bot token is missing');
    return null;
  }

  return new WebClient(slackConfig.botToken);
};
