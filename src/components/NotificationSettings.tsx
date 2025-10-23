import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Typography,
  Chip,
  Box,
  Button,
  Alert,
  Divider
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsOff as NotificationsOffIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNotification } from '../hooks/useNotification';
import type { NotificationType } from '../interface/notification';

interface NotificationSettingsProps {
  /**
   * Whether to show the card header
   */
  showHeader?: boolean;
  /**
   * Custom title for the settings card
   */
  title?: string;
  /**
   * Whether to show the test notification button
   */
  showTestButton?: boolean;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  showHeader = true,
  title = 'Notification Settings',
  showTestButton = true
}) => {
  const {
    permission,
    isSupported,
    preferences,
    updatePreferences,
    requestPermission,
    sendInfo,
    isRequestingPermission
  } = useNotification();

  const notificationTypes: { type: NotificationType; label: string; description: string }[] = [
    { type: 'info', label: 'Information', description: 'General information and updates' },
    { type: 'success', label: 'Success', description: 'Successful actions and confirmations' },
    { type: 'warning', label: 'Warnings', description: 'Important warnings and alerts' },
    { type: 'error', label: 'Errors', description: 'Error messages and critical issues' }
  ];

  const handleBrowserNotificationsToggle = (enabled: boolean) => {
    updatePreferences({ browserNotificationsEnabled: enabled });
  };

  const handleFallbackToggle = (enabled: boolean) => {
    updatePreferences({ fallbackToToast: enabled });
  };

  const handleTypeToggle = (type: NotificationType, enabled: boolean) => {
    const enabledTypes = enabled
      ? [...preferences.enabledTypes, type]
      : preferences.enabledTypes.filter(t => t !== type);
    
    updatePreferences({ enabledTypes });
  };

  const handleRequireInteractionToggle = (enabled: boolean) => {
    updatePreferences({ requireInteraction: enabled });
  };

  const handleSilentToggle = (enabled: boolean) => {
    updatePreferences({ silent: enabled });
  };

  const handleTestNotification = async () => {
    await sendInfo(
      'Test Notification',
      'This is a test notification to verify your settings are working correctly.',
      { tag: 'test-notification' }
    );
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { color: 'success' as const, text: 'Granted' };
      case 'denied':
        return { color: 'error' as const, text: 'Denied' };
      default:
        return { color: 'warning' as const, text: 'Not Requested' };
    }
  };

  if (!isSupported) {
    return (
      <Card>
        {showHeader && (
          <CardHeader
            avatar={<NotificationsOffIcon />}
            title={title}
          />
        )}
        <CardContent>
          <Alert severity="warning" icon={<WarningIcon />}>
            Browser notifications are not supported in this environment.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const permissionStatus = getPermissionStatus();

  return (
    <Card>
      {showHeader && (
        <CardHeader
          avatar={<NotificationsIcon />}
          title={title}
          action={
            <Chip
              label={permissionStatus.text}
              color={permissionStatus.color}
              size="small"
            />
          }
        />
      )}
      <CardContent>
        {/* Permission Status */}
        {permission !== 'granted' && (
          <Alert
            severity={permission === 'denied' ? 'error' : 'info'}
            action={
              permission === 'default' ? (
                <Button
                  color="inherit"
                  size="small"
                  onClick={requestPermission}
                  disabled={isRequestingPermission}
                >
                  {isRequestingPermission ? 'Requesting...' : 'Request Permission'}
                </Button>
              ) : undefined
            }
            sx={{ mb: 2 }}
          >
            {permission === 'denied'
              ? 'Browser notifications are blocked. Please enable them in your browser settings.'
              : 'Browser notifications require permission to work.'
            }
          </Alert>
        )}

        {/* Main Settings */}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.browserNotificationsEnabled}
                onChange={(e) => handleBrowserNotificationsToggle(e.target.checked)}
                disabled={permission === 'denied'}
              />
            }
            label="Enable Browser Notifications"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.fallbackToToast}
                onChange={(e) => handleFallbackToggle(e.target.checked)}
              />
            }
            label="Fallback to Toast Notifications"
          />
        </FormGroup>

        <Divider sx={{ my: 2 }} />

        {/* Notification Types */}
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend">
            <Typography variant="subtitle2" gutterBottom>
              Notification Types
            </Typography>
          </FormLabel>
          <FormGroup>
            {notificationTypes.map(({ type, label, description }) => (
              <Box key={type} sx={{ mb: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.enabledTypes.includes(type)}
                      onChange={(e) => handleTypeToggle(type, e.target.checked)}
                      disabled={!preferences.browserNotificationsEnabled}
                    />
                  }
                  label={label}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, display: 'block' }}>
                  {description}
                </Typography>
              </Box>
            ))}
          </FormGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Advanced Settings */}
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend">
            <Typography variant="subtitle2" gutterBottom>
              Advanced Settings
            </Typography>
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.requireInteraction}
                  onChange={(e) => handleRequireInteractionToggle(e.target.checked)}
                  disabled={!preferences.browserNotificationsEnabled}
                />
              }
              label="Require Interaction"
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mb: 1, display: 'block' }}>
              Notifications will stay visible until clicked
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={preferences.silent}
                  onChange={(e) => handleSilentToggle(e.target.checked)}
                  disabled={!preferences.browserNotificationsEnabled}
                />
              }
              label="Silent Notifications"
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 4, display: 'block' }}>
              Notifications will not play sound or vibrate
            </Typography>
          </FormGroup>
        </FormControl>

        {/* Test Button */}
        {showTestButton && permission === 'granted' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleTestNotification}
                disabled={!preferences.browserNotificationsEnabled}
                startIcon={<NotificationsIcon />}
              >
                Send Test Notification
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;