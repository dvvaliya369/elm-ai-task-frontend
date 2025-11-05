import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { emailService } from './services/email.service.js';
import { slackService } from './services/slack.service.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Test email service
app.post('/api/test/email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    await emailService.sendEmail({
      to,
      subject,
      text: message,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Test Slack service
app.post('/api/test/slack', async (req, res) => {
  try {
    const { text, channel } = req.body;
    
    await slackService.sendMessage({
      text,
      channel,
      iconEmoji: ':robot_face:',
    });

    res.json({ success: true, message: 'Slack message sent successfully' });
  } catch (error) {
    console.error('Error sending Slack message:', error);
    res.status(500).json({ success: false, error: 'Failed to send Slack message' });
  }
});

// Verify services endpoint
app.get('/api/verify/services', async (req, res) => {
  try {
    const emailStatus = await emailService.verifyConnection();
    const slackStatus = await slackService.verifyConnection();

    res.json({
      email: emailStatus ? 'connected' : 'disconnected',
      slack: slackStatus ? 'connected' : 'disconnected',
    });
  } catch (error) {
    console.error('Error verifying services:', error);
    res.status(500).json({ error: 'Failed to verify services' });
  }
});

// Example: User registration with dual notifications
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // TODO: Add your user registration logic here
    // const user = await createUser({ name, email, password });

    // Send welcome email
    await emailService.sendWelcomeEmail(email, name);

    // Send Slack notification to team
    await slackService.sendWelcomeNotification(name, email);

    res.json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Send error notification to Slack
    await slackService.sendErrorNotification(
      'User registration failed',
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      }
    );

    res.status(500).json({
      success: false,
      error: 'Registration failed',
    });
  }
});

// Example: Password reset with dual notifications
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    // TODO: Add your password reset logic here
    // const user = await findUserByEmail(email);
    // const resetToken = generateResetToken();

    const userName = 'User'; // Replace with actual user name
    const resetToken = 'sample-token'; // Replace with actual token

    // Send reset email
    await emailService.sendPasswordResetEmail(email, userName, resetToken);

    // Notify team on Slack
    await slackService.sendPasswordResetNotification(userName, email);

    res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send password reset email',
    });
  }
});

// Example: Post creation notification
app.post('/api/posts/create', async (req, res) => {
  try {
    const { title, content, authorName } = req.body;

    // TODO: Add your post creation logic here
    // const post = await createPost({ title, content, authorId });

    const postId = 'sample-post-id'; // Replace with actual post ID
    const postUrl = `${process.env.DOMAIN}/posts/${postId}`;

    // Send Slack notification
    await slackService.sendPostCreatedNotification(
      authorName,
      title,
      postUrl
    );

    res.json({
      success: true,
      message: 'Post created successfully',
      postId,
    });
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create post',
    });
  }
});

// Example: Send custom notification
app.post('/api/notifications/send', async (req, res) => {
  try {
    const { userName, title, message, actionUrl, actionText, color } = req.body;

    await slackService.sendGeneralNotification({
      userName,
      title,
      message,
      actionUrl,
      actionText,
      color,
    });

    res.json({
      success: true,
      message: 'Notification sent successfully',
    });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send notification',
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  
  // Send error to Slack
  slackService.sendErrorNotification(err.message, {
    path: req.path,
    method: req.method,
    stack: err.stack?.substring(0, 500),
  }).catch(console.error);

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Verify services on startup
  console.log('\nVerifying services...');
  
  const emailStatus = await emailService.verifyConnection();
  console.log(`Email service: ${emailStatus ? '✓ Connected' : '✗ Disconnected'}`);
  
  const slackStatus = await slackService.verifyConnection();
  console.log(`Slack service: ${slackStatus ? '✓ Connected' : '✗ Disconnected'}`);
  
  console.log('\nServer ready to accept requests');
});

export default app;
