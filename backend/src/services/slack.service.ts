import { WebClient } from '@slack/web-api';
import { createSlackClient, slackConfig } from '../config/slack.config.js';
import { formatSlackMessage, createBlockMessage } from '../utils/slack.utils.js';
import type { ChatPostMessageArguments, Block, KnownBlock } from '@slack/web-api';

export interface SlackMessageOptions {
  channel?: string;
  text: string;
  blocks?: (Block | KnownBlock)[];
  threadTs?: string;
  username?: string;
  iconEmoji?: string;
}

export interface SlackNotificationOptions {
  userName: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  color?: 'good' | 'warning' | 'danger' | string;
}

export class SlackService {
  private client: WebClient | null;

  constructor() {
    this.client = createSlackClient();
  }

  private isEnabled(): boolean {
    return slackConfig.enabled && this.client !== null;
  }

  async sendMessage(options: SlackMessageOptions): Promise<boolean> {
    if (!this.isEnabled()) {
      console.log('Slack is disabled, skipping message');
      return false;
    }

    try {
      const messageArgs: ChatPostMessageArguments = {
        channel: options.channel || slackConfig.channelId,
        text: options.text,
        blocks: options.blocks,
        thread_ts: options.threadTs,
        username: options.username,
        icon_emoji: options.iconEmoji,
      };

      const result = await this.client!.chat.postMessage(messageArgs);
      
      if (result.ok) {
        console.log('Slack message sent successfully:', result.ts);
        return true;
      } else {
        console.error('Failed to send Slack message:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Error sending Slack message:', error);
      throw error;
    }
  }

  async sendWelcomeNotification(userName: string, userEmail: string): Promise<boolean> {
    const text = `🎉 Welcome ${userName}!`;
    const blocks = createBlockMessage({
      title: '🎉 New User Welcome',
      message: `Welcome to ELM AI Task, ${userName}! We're excited to have you on board.`,
      fields: [
        { title: 'User Name', value: userName },
        { title: 'Email', value: userEmail },
      ],
      color: 'good',
    });

    return this.sendMessage({
      text,
      blocks,
      iconEmoji: ':wave:',
    });
  }

  async sendPasswordResetNotification(
    userName: string,
    userEmail: string
  ): Promise<boolean> {
    const text = `🔐 Password reset requested for ${userName}`;
    const blocks = createBlockMessage({
      title: '🔐 Password Reset Request',
      message: `A password reset has been requested for ${userName}.`,
      fields: [
        { title: 'User Name', value: userName },
        { title: 'Email', value: userEmail },
        { title: 'Time', value: new Date().toLocaleString() },
      ],
      color: 'warning',
    });

    return this.sendMessage({
      text,
      blocks,
      iconEmoji: ':lock:',
    });
  }

  async sendVerificationNotification(
    userName: string,
    userEmail: string
  ): Promise<boolean> {
    const text = `✅ Email verification requested for ${userName}`;
    const blocks = createBlockMessage({
      title: '✅ Email Verification Request',
      message: `Email verification has been requested for ${userName}.`,
      fields: [
        { title: 'User Name', value: userName },
        { title: 'Email', value: userEmail },
      ],
      color: 'good',
    });

    return this.sendMessage({
      text,
      blocks,
      iconEmoji: ':white_check_mark:',
    });
  }

  async sendGeneralNotification(options: SlackNotificationOptions): Promise<boolean> {
    const text = `${options.title}: ${options.message}`;
    const blocks = createBlockMessage({
      title: options.title,
      message: options.message,
      fields: [
        { title: 'User', value: options.userName },
      ],
      actionUrl: options.actionUrl,
      actionText: options.actionText,
      color: options.color || 'good',
    });

    return this.sendMessage({
      text,
      blocks,
    });
  }

  async sendRichMessage(
    text: string,
    blocks: (Block | KnownBlock)[],
    channel?: string
  ): Promise<boolean> {
    return this.sendMessage({
      text,
      blocks,
      channel,
    });
  }

  async sendErrorNotification(
    errorMessage: string,
    context?: Record<string, any>
  ): Promise<boolean> {
    const text = `🚨 Error: ${errorMessage}`;
    const fields = context
      ? Object.entries(context).map(([key, value]) => ({
          title: key,
          value: String(value),
        }))
      : [];

    const blocks = createBlockMessage({
      title: '🚨 Error Alert',
      message: errorMessage,
      fields,
      color: 'danger',
    });

    return this.sendMessage({
      text,
      blocks,
      iconEmoji: ':rotating_light:',
    });
  }

  async sendPostCreatedNotification(
    userName: string,
    postTitle: string,
    postUrl?: string
  ): Promise<boolean> {
    const text = `📝 New post created by ${userName}`;
    const blocks = createBlockMessage({
      title: '📝 New Post Created',
      message: `${userName} has created a new post: "${postTitle}"`,
      fields: [
        { title: 'Author', value: userName },
        { title: 'Post Title', value: postTitle },
      ],
      actionUrl: postUrl,
      actionText: 'View Post',
      color: 'good',
    });

    return this.sendMessage({
      text,
      blocks,
      iconEmoji: ':memo:',
    });
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.isEnabled()) {
      console.log('Slack is disabled');
      return false;
    }

    try {
      const result = await this.client!.auth.test();
      if (result.ok) {
        console.log('Slack connection verified successfully');
        console.log('Connected as:', result.user);
        console.log('Team:', result.team);
        return true;
      } else {
        console.error('Slack connection verification failed');
        return false;
      }
    } catch (error) {
      console.error('Error verifying Slack connection:', error);
      return false;
    }
  }
}

export const slackService = new SlackService();
