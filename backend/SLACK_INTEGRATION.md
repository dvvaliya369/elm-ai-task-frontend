# Slack Notifications Integration

This document explains how to integrate and use Slack notifications in the ELM AI Task backend.

## 📋 Table of Contents

- [Setup](#setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Methods](#available-methods)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## 🚀 Setup

### 1. Install Dependencies

The `@slack/web-api` package has already been installed. If you need to reinstall:

```bash
cd backend
npm install @slack/web-api
```

### 2. Create a Slack App

1. Go to [Slack API](https://api.slack.com/apps)
2. Click "Create New App" → "From scratch"
3. Name your app (e.g., "ELM AI Task Notifications")
4. Select your workspace

### 3. Configure Bot Permissions

In your Slack App settings:

1. Navigate to **OAuth & Permissions**
2. Add the following **Bot Token Scopes**:
   - `chat:write` - Send messages
   - `chat:write.public` - Send messages to public channels
   - `channels:read` - View basic channel info
   - `users:read` - View users in workspace

3. Click **Install to Workspace**
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

### 4. Get Channel ID

1. Open Slack and navigate to the channel where you want to send notifications
2. Click the channel name at the top
3. Scroll down to find the **Channel ID** (e.g., `C1234567890`)

### 5. (Optional) Create Incoming Webhook

For webhook-based notifications:

1. Navigate to **Incoming Webhooks** in your Slack App settings
2. Activate Incoming Webhooks
3. Click **Add New Webhook to Workspace**
4. Select a channel and authorize
5. Copy the webhook URL

## ⚙️ Configuration

### Environment Variables

Update your `.env` file with the following variables:

```env
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_CHANNEL_ID=C1234567890
SLACK_ENABLED=true
```

**Important:** 
- Set `SLACK_ENABLED=false` to disable Slack notifications without removing credentials
- The bot token is required for most functionality
- Channel ID is the default channel for notifications

## 📖 Usage

### Import the Service

```typescript
import { slackService } from './services/slack.service.js';
```

### Basic Usage

```typescript
// Send a simple message
await slackService.sendMessage({
  text: 'Hello from ELM AI Task!',
  iconEmoji: ':wave:',
});

// Send to a specific channel
await slackService.sendMessage({
  channel: 'C9876543210',
  text: 'Message to specific channel',
});
```

## 🔧 Available Methods

### 1. `sendMessage(options: SlackMessageOptions)`

Send a custom message with full control over formatting.

```typescript
interface SlackMessageOptions {
  channel?: string;           // Channel ID (optional, uses default)
  text: string;              // Message text (required)
  blocks?: Block[];          // Slack Block Kit blocks
  threadTs?: string;         // Thread timestamp for replies
  username?: string;         // Custom username
  iconEmoji?: string;        // Custom emoji icon
}
```

### 2. `sendWelcomeNotification(userName: string, userEmail: string)`

Send a welcome notification when a new user signs up.

```typescript
await slackService.sendWelcomeNotification('John Doe', 'john@example.com');
```

### 3. `sendPasswordResetNotification(userName: string, userEmail: string)`

Notify when a password reset is requested.

```typescript
await slackService.sendPasswordResetNotification('John Doe', 'john@example.com');
```

### 4. `sendVerificationNotification(userName: string, userEmail: string)`

Notify when email verification is requested.

```typescript
await slackService.sendVerificationNotification('John Doe', 'john@example.com');
```

### 5. `sendGeneralNotification(options: SlackNotificationOptions)`

Send a general notification with custom content.

```typescript
interface SlackNotificationOptions {
  userName: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  color?: 'good' | 'warning' | 'danger' | string;
}

await slackService.sendGeneralNotification({
  userName: 'John Doe',
  title: 'Profile Updated',
  message: 'User has updated their profile information',
  color: 'good',
});
```

### 6. `sendErrorNotification(errorMessage: string, context?: Record<string, any>)`

Send error alerts to Slack.

```typescript
await slackService.sendErrorNotification(
  'Database connection failed',
  {
    service: 'MongoDB',
    timestamp: new Date().toISOString(),
    retries: 3,
  }
);
```

### 7. `sendPostCreatedNotification(userName: string, postTitle: string, postUrl?: string)`

Notify when a new post is created.

```typescript
await slackService.sendPostCreatedNotification(
  'John Doe',
  'My First Post',
  'https://example.com/posts/123'
);
```

### 8. `sendRichMessage(text: string, blocks: Block[], channel?: string)`

Send a message with custom Slack Block Kit blocks.

```typescript
import { createBlockMessage } from './utils/slack.utils.js';

const blocks = createBlockMessage({
  title: 'Custom Notification',
  message: 'This is a custom formatted message',
  fields: [
    { title: 'Field 1', value: 'Value 1' },
    { title: 'Field 2', value: 'Value 2' },
  ],
  actionUrl: 'https://example.com',
  actionText: 'View Details',
  color: 'good',
});

await slackService.sendRichMessage('Custom notification', blocks);
```

### 9. `verifyConnection()`

Test the Slack connection.

```typescript
const isConnected = await slackService.verifyConnection();
if (isConnected) {
  console.log('Slack is ready!');
}
```

## 💡 Examples

### Example 1: User Registration Flow

```typescript
import { slackService } from './services/slack.service.js';
import { emailService } from './services/email.service.js';

async function handleUserRegistration(user: User) {
  try {
    // Send welcome email
    await emailService.sendWelcomeEmail(user.email, user.name);
    
    // Notify team on Slack
    await slackService.sendWelcomeNotification(user.name, user.email);
    
    console.log('User registration notifications sent');
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}
```

### Example 2: Error Monitoring

```typescript
import { slackService } from './services/slack.service.js';

async function handleError(error: Error, context: any) {
  try {
    // Log error
    console.error('Application error:', error);
    
    // Send to Slack for team visibility
    await slackService.sendErrorNotification(error.message, {
      stack: error.stack?.substring(0, 500),
      context: JSON.stringify(context),
      environment: process.env.NODE_ENV,
    });
  } catch (slackError) {
    console.error('Failed to send error to Slack:', slackError);
  }
}
```

### Example 3: Post Activity Notifications

```typescript
import { slackService } from './services/slack.service.js';

async function notifyPostCreated(post: Post, author: User) {
  const postUrl = `${process.env.DOMAIN}/posts/${post.id}`;
  
  await slackService.sendPostCreatedNotification(
    author.name,
    post.title,
    postUrl
  );
}
```

### Example 4: Custom Notification with Blocks

```typescript
import { slackService } from './services/slack.service.js';
import { createBlockMessage } from './utils/slack.utils.js';

async function sendDailySummary(stats: DailyStats) {
  const blocks = createBlockMessage({
    title: '📊 Daily Summary',
    message: 'Here\'s your daily activity summary',
    fields: [
      { title: 'New Users', value: stats.newUsers.toString() },
      { title: 'New Posts', value: stats.newPosts.toString() },
      { title: 'Total Likes', value: stats.totalLikes.toString() },
      { title: 'Total Comments', value: stats.totalComments.toString() },
    ],
    color: 'good',
    footer: 'ELM AI Task Analytics',
  });

  await slackService.sendRichMessage('Daily Summary', blocks);
}
```

## 🔍 Troubleshooting

### Slack is not sending messages

1. **Check if Slack is enabled:**
   ```typescript
   console.log('Slack enabled:', process.env.SLACK_ENABLED);
   ```

2. **Verify bot token:**
   ```typescript
   const isConnected = await slackService.verifyConnection();
   ```

3. **Check bot permissions:**
   - Ensure bot has `chat:write` scope
   - Verify bot is added to the target channel

### "channel_not_found" error

- Verify the channel ID is correct
- Ensure the bot is invited to the channel (type `/invite @YourBotName` in the channel)

### "invalid_auth" error

- Check that `SLACK_BOT_TOKEN` is correct
- Ensure the token starts with `xoxb-`
- Verify the token hasn't been revoked

### Messages not appearing

- Check if `SLACK_ENABLED=true` in your `.env` file
- Verify the channel ID is correct
- Check application logs for error messages

### Rate Limiting

Slack has rate limits. If you're sending many messages:
- Implement message queuing
- Add delays between messages
- Use batch notifications when possible

## 🎨 Utility Functions

The `slack.utils.ts` file provides helpful formatting functions:

```typescript
import {
  formatLink,
  formatUserMention,
  formatChannelMention,
  addEmoji,
  escapeSlackText,
  truncateText,
  createErrorMessage,
  createListMessage,
} from './utils/slack.utils.js';

// Format a link
const link = formatLink('https://example.com', 'Click here');

// Mention a user
const mention = formatUserMention('U1234567890');

// Mention a channel
const channelMention = formatChannelMention('C1234567890');

// Add emoji
const text = addEmoji('Hello', ':wave:');

// Escape special characters
const safe = escapeSlackText('<script>alert("xss")</script>');

// Truncate long text
const short = truncateText(longText, 1000);
```

## 📚 Additional Resources

- [Slack API Documentation](https://api.slack.com/)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder)
- [Slack Web API Node.js SDK](https://slack.dev/node-slack-sdk/)
- [Message Formatting Guide](https://api.slack.com/reference/surfaces/formatting)

## 🤝 Integration with Email Service

You can use both email and Slack notifications together:

```typescript
import { emailService } from './services/email.service.js';
import { slackService } from './services/slack.service.js';

async function sendDualNotification(user: User, type: string) {
  // Send to user via email
  await emailService.sendNotificationEmail(
    user.email,
    user.name,
    'Important Update',
    'Your account has been updated'
  );
  
  // Notify team via Slack
  await slackService.sendGeneralNotification({
    userName: user.name,
    title: 'User Account Updated',
    message: `${user.name}'s account has been updated`,
    color: 'good',
  });
}
```

## 🔐 Security Best Practices

1. **Never commit tokens:** Keep `.env` file in `.gitignore`
2. **Use environment variables:** Never hardcode tokens in code
3. **Rotate tokens regularly:** Update bot tokens periodically
4. **Limit permissions:** Only grant necessary OAuth scopes
5. **Monitor usage:** Check Slack app analytics for unusual activity

---

For questions or issues, please refer to the main project documentation or contact the development team.
