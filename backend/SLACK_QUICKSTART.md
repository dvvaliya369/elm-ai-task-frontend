# Slack Notifications - Quick Start Guide

Get Slack notifications up and running in 5 minutes!

## 🚀 Quick Setup

### Step 1: Get Your Slack Bot Token

1. Visit [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"** → **"From scratch"**
3. Name it (e.g., "ELM AI Task Bot") and select your workspace
4. Go to **"OAuth & Permissions"** in the sidebar
5. Under **"Bot Token Scopes"**, add these scopes:
   - `chat:write`
   - `chat:write.public`
6. Click **"Install to Workspace"** at the top
7. Copy the **"Bot User OAuth Token"** (starts with `xoxb-`)

### Step 2: Get Your Channel ID

1. Open Slack and go to the channel you want to use
2. Click the channel name at the top
3. Scroll down and copy the **Channel ID** (e.g., `C1234567890`)

### Step 3: Configure Environment Variables

Create or update your `.env` file in the `backend` directory:

```env
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-actual-bot-token-here
SLACK_CHANNEL_ID=C1234567890
SLACK_ENABLED=true
```

### Step 4: Invite Bot to Channel

In your Slack channel, type:
```
/invite @YourBotName
```

### Step 5: Test It!

```typescript
import { slackService } from './services/slack.service.js';

// Verify connection
const isConnected = await slackService.verifyConnection();
console.log('Slack connected:', isConnected);

// Send a test message
await slackService.sendMessage({
  text: '🎉 Slack notifications are working!',
});
```

## 📝 Common Use Cases

### 1. Welcome New Users

```typescript
await slackService.sendWelcomeNotification('John Doe', 'john@example.com');
```

### 2. Alert on Errors

```typescript
await slackService.sendErrorNotification('Database connection failed', {
  service: 'MongoDB',
  timestamp: new Date().toISOString(),
});
```

### 3. Notify Post Creation

```typescript
await slackService.sendPostCreatedNotification(
  'Jane Smith',
  'My Awesome Post',
  'https://example.com/posts/123'
);
```

### 4. Custom Notifications

```typescript
await slackService.sendGeneralNotification({
  userName: 'Admin',
  title: '🎯 Daily Goal Reached',
  message: 'The team has reached 100 posts today!',
  color: 'good',
});
```

## 🔧 Troubleshooting

### Bot not sending messages?

**Check 1:** Is Slack enabled?
```typescript
console.log(process.env.SLACK_ENABLED); // Should be 'true'
```

**Check 2:** Verify connection
```typescript
await slackService.verifyConnection();
```

**Check 3:** Is bot in the channel?
- Type `/invite @YourBotName` in the Slack channel

### "channel_not_found" error?

- Double-check your `SLACK_CHANNEL_ID`
- Make sure the bot is invited to the channel

### "invalid_auth" error?

- Verify your `SLACK_BOT_TOKEN` is correct
- Make sure it starts with `xoxb-`
- Check if the token was revoked in Slack settings

## 📚 Next Steps

- Read the full [SLACK_INTEGRATION.md](./SLACK_INTEGRATION.md) for detailed documentation
- Explore [Slack Block Kit Builder](https://app.slack.com/block-kit-builder) for rich messages
- Check out the example server in `src/server.example.ts`

## 💡 Pro Tips

1. **Disable in development:** Set `SLACK_ENABLED=false` to avoid spam during testing
2. **Use different channels:** Pass `channel` parameter to send to specific channels
3. **Rich formatting:** Use Block Kit for beautiful, interactive messages
4. **Error monitoring:** Set up automatic error notifications to catch issues early

---

Need help? Check the [full documentation](./SLACK_INTEGRATION.md) or [Slack API docs](https://api.slack.com/).
