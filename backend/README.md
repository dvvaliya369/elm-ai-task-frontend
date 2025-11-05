# ELM AI Task Backend

Backend server for the ELM AI Task application with email and Slack notification functionality.

## 🚀 Features

- **Email Notifications**: Send emails using Nodemailer with EJS templates
- **Slack Notifications**: Real-time team notifications via Slack
- **TypeScript**: Fully typed codebase for better development experience
- **Express Server**: RESTful API endpoints
- **Environment Configuration**: Secure credential management
- **Service Architecture**: Clean, modular service layer

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Language**: TypeScript 5.3.3
- **Email**: Nodemailer 6.9.7
- **Slack**: @slack/web-api 7.12.0
- **Template Engine**: EJS 3.1.9
- **Environment**: dotenv 16.3.1

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── email.config.ts      # Email service configuration
│   │   └── slack.config.ts      # Slack service configuration
│   ├── services/
│   │   ├── email.service.ts     # Email notification service
│   │   └── slack.service.ts     # Slack notification service
│   ├── utils/
│   │   ├── email.utils.ts       # Email helper functions
│   │   └── slack.utils.ts       # Slack helper functions
│   └── server.example.ts        # Example server implementation
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json
├── SLACK_QUICKSTART.md          # Quick start guide for Slack
└── SLACK_INTEGRATION.md         # Comprehensive Slack documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Slack workspace (for Slack notifications)
- Email service credentials (for email notifications)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Build the project:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=8000
DOMAIN=http://localhost:8000

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@example.com

# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_CHANNEL_ID=C1234567890
SLACK_ENABLED=true
```

## 📧 Email Service

### Usage

```typescript
import { emailService } from './services/email.service.js';

// Send welcome email
await emailService.sendWelcomeEmail('user@example.com', 'John Doe');

// Send password reset email
await emailService.sendPasswordResetEmail('user@example.com', 'John Doe', 'reset-token');

// Send custom email
await emailService.sendEmail({
  to: 'user@example.com',
  subject: 'Hello',
  text: 'This is a test email',
});
```

### Available Methods

- `sendEmail(options)` - Send custom email
- `sendWelcomeEmail(to, userName)` - Welcome new users
- `sendPasswordResetEmail(to, userName, resetToken)` - Password reset
- `sendVerificationEmail(to, userName, verificationToken)` - Email verification
- `sendNotificationEmail(to, userName, title, message, actionUrl?, actionText?)` - General notifications
- `verifyConnection()` - Test email service connection

## 💬 Slack Service

### Quick Start

See [SLACK_QUICKSTART.md](./SLACK_QUICKSTART.md) for a 5-minute setup guide.

### Usage

```typescript
import { slackService } from './services/slack.service.js';

// Send welcome notification
await slackService.sendWelcomeNotification('John Doe', 'john@example.com');

// Send error alert
await slackService.sendErrorNotification('Database connection failed', {
  service: 'MongoDB',
  timestamp: new Date().toISOString(),
});

// Send custom message
await slackService.sendMessage({
  text: 'Hello from ELM AI Task!',
  iconEmoji: ':wave:',
});
```

### Available Methods

- `sendMessage(options)` - Send custom message
- `sendWelcomeNotification(userName, userEmail)` - Welcome new users
- `sendPasswordResetNotification(userName, userEmail)` - Password reset alerts
- `sendVerificationNotification(userName, userEmail)` - Email verification alerts
- `sendGeneralNotification(options)` - Custom notifications
- `sendErrorNotification(errorMessage, context)` - Error monitoring
- `sendPostCreatedNotification(userName, postTitle, postUrl)` - Post creation alerts
- `sendRichMessage(text, blocks, channel)` - Custom Block Kit messages
- `verifyConnection()` - Test Slack connection

### Full Documentation

See [SLACK_INTEGRATION.md](./SLACK_INTEGRATION.md) for comprehensive documentation.

## 🔗 API Integration

The backend provides notification services that can be integrated into your API endpoints:

```typescript
import express from 'express';
import { emailService } from './services/email.service.js';
import { slackService } from './services/slack.service.js';

const app = express();

// User registration with dual notifications
app.post('/api/auth/register', async (req, res) => {
  const { name, email } = req.body;
  
  // Send welcome email to user
  await emailService.sendWelcomeEmail(email, name);
  
  // Notify team on Slack
  await slackService.sendWelcomeNotification(name, email);
  
  res.json({ success: true });
});
```

See [src/server.example.ts](./src/server.example.ts) for more examples.

## 🧪 Testing

### Verify Services

```typescript
import { emailService } from './services/email.service.js';
import { slackService } from './services/slack.service.js';

// Test email connection
const emailConnected = await emailService.verifyConnection();
console.log('Email service:', emailConnected ? 'Connected' : 'Disconnected');

// Test Slack connection
const slackConnected = await slackService.verifyConnection();
console.log('Slack service:', slackConnected ? 'Connected' : 'Disconnected');
```

## 🔒 Security Best Practices

1. **Never commit credentials**: Keep `.env` in `.gitignore`
2. **Use environment variables**: Never hardcode tokens or passwords
3. **Rotate credentials regularly**: Update tokens and passwords periodically
4. **Limit permissions**: Only grant necessary OAuth scopes
5. **Monitor usage**: Check logs for unusual activity

## 🐛 Troubleshooting

### Email Issues

- Verify `EMAIL_HOST`, `EMAIL_PORT`, and credentials
- Check if less secure app access is enabled (Gmail)
- Use app-specific passwords for Gmail
- Run `emailService.verifyConnection()` to test

### Slack Issues

- Verify `SLACK_BOT_TOKEN` is correct (starts with `xoxb-`)
- Check if bot is invited to the channel (`/invite @BotName`)
- Ensure bot has `chat:write` permission
- Run `slackService.verifyConnection()` to test
- Set `SLACK_ENABLED=false` to disable temporarily

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Slack API Documentation](https://api.slack.com/)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📝 License

ISC

## 👥 Contributing

Contributions are welcome! Please follow the existing code style and patterns.

---

For questions or issues, please refer to the documentation files or create an issue in the repository.
