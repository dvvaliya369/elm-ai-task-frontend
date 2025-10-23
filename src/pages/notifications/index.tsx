import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Paper
} from '@mui/material';
import {
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useNotification } from '../../hooks/useNotification';
import { NotificationPermissionBanner } from '../../components/NotificationPermissionBanner';
import { NotificationSettings } from '../../components/NotificationSettings';

const NotificationsDemo: React.FC = () => {
  const notification = useNotification();

  const handleSendInfo = async () => {
    await notification.sendInfo(
      'Information',
      'This is an informational notification to keep you updated.',
      { tag: 'demo-info' }
    );
  };

  const handleSendSuccess = async () => {
    await notification.sendSuccess(
      'Success!',
      'Your action was completed successfully.',
      { tag: 'demo-success' }
    );
  };

  const handleSendWarning = async () => {
    await notification.sendWarning(
      'Warning',
      'Please pay attention to this important warning.',
      { tag: 'demo-warning' }
    );
  };

  const handleSendError = async () => {
    await notification.sendError(
      'Error Occurred',
      'Something went wrong and needs your attention.',
      { tag: 'demo-error' }
    );
  };

  const handleSendCustom = async () => {
    await notification.sendNotification({
      title: 'Custom Notification',
      body: 'This is a custom notification with additional options.',
      type: 'info',
      requireInteraction: true,
      tag: 'demo-custom',
      data: {
        url: 'https://example.com',
        customData: 'This notification will stay until clicked'
      }
    });
  };

  const notificationCards = [
    {
      title: 'Information',
      description: 'Send an informational notification',
      icon: <InfoIcon color="info" />,
      color: 'info' as const,
      handler: handleSendInfo
    },
    {
      title: 'Success',
      description: 'Send a success notification',
      icon: <SuccessIcon color="success" />,
      color: 'success' as const,
      handler: handleSendSuccess
    },
    {
      title: 'Warning',
      description: 'Send a warning notification',
      icon: <WarningIcon color="warning" />,
      color: 'warning' as const,
      handler: handleSendWarning
    },
    {
      title: 'Error',
      description: 'Send an error notification',
      icon: <ErrorIcon color="error" />,
      color: 'error' as const,
      handler: handleSendError
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <NotificationsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Browser Notifications Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Test and configure browser notifications for your application
        </Typography>
      </Box>

      {/* Permission Banner */}
      <NotificationPermissionBanner />

      {/* Status Information */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Notification Status
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="body2" color="text.secondary">
              Browser Support
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {notification.isSupported ? '✅ Supported' : '❌ Not Supported'}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="body2" color="text.secondary">
              Permission Status
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {notification.permission === 'granted' && '✅ Granted'}
              {notification.permission === 'denied' && '❌ Denied'}
              {notification.permission === 'default' && '⏳ Not Requested'}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="body2" color="text.secondary">
              Browser Notifications
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {notification.preferences.browserNotificationsEnabled ? '✅ Enabled' : '❌ Disabled'}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="body2" color="text.secondary">
              Toast Fallback
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {notification.preferences.fallbackToToast ? '✅ Enabled' : '❌ Disabled'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Demo Cards */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h5" gutterBottom>
            Test Notifications
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
            {notificationCards.map((card) => (
              <Card key={card.title}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {card.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color={card.color}
                    onClick={card.handler}
                    disabled={!notification.isSupported}
                  >
                    Send {card.title}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>

          {/* Custom Notification */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Custom Notification
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Send a custom notification with advanced options like requiring interaction
                and custom data.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={handleSendCustom}
                disabled={!notification.isSupported}
              >
                Send Custom Notification
              </Button>
            </CardActions>
          </Card>

          {/* Usage Examples */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Usage Examples
              </Typography>
              <Typography variant="body2" paragraph>
                Here are some examples of how to use the notification system in your components:
              </Typography>
              
              <Box component="pre" sx={{ 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: 1, 
                overflow: 'auto',
                fontSize: '0.875rem'
              }}>
{`// Import the hook
import { useNotification } from '../hooks/useNotification';

// Use in your component
const MyComponent = () => {
  const notification = useNotification();

  const handleSuccess = async () => {
    await notification.sendSuccess(
      'Task Completed',
      'Your task has been completed successfully!'
    );
  };

  const handleError = async () => {
    await notification.sendError(
      'Error Occurred',
      'Something went wrong. Please try again.'
    );
  };

  // Custom notification with options
  const handleCustom = async () => {
    await notification.sendNotification({
      title: 'Custom Notification',
      body: 'This notification requires interaction',
      type: 'info',
      requireInteraction: true,
      tag: 'unique-tag',
      data: { url: '/some-page' }
    });
  };
};`}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Settings Panel */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <NotificationSettings />
        </Box>
      </Box>
    </Container>
  );
};

export default NotificationsDemo;