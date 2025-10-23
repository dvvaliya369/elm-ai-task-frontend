import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Close as CloseIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotification } from '../hooks/useNotification';

interface NotificationPermissionBannerProps {
  /**
   * Whether to show the banner automatically when permission is needed
   */
  autoShow?: boolean;
  /**
   * Custom message to display in the banner
   */
  message?: string;
  /**
   * Whether the banner can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
}

export const NotificationPermissionBanner: React.FC<NotificationPermissionBannerProps> = ({
  autoShow = true,
  message,
  dismissible = true,
  onDismiss
}) => {
  const { permission, isSupported, requestPermission, isRequestingPermission } = useNotification();
  const [isDismissed, setIsDismissed] = useState(false);

  const shouldShow = autoShow && 
    isSupported && 
    permission === 'default' && 
    !isDismissed;

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (!shouldShow) {
    return null;
  }

  const defaultMessage = 'Enable browser notifications to stay updated with important information even when this tab is not active.';

  return (
    <Collapse in={shouldShow}>
      <Alert
        severity="info"
        icon={<NotificationsIcon />}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              onClick={handleRequestPermission}
              disabled={isRequestingPermission}
              sx={{ minWidth: 'auto' }}
            >
              {isRequestingPermission ? 'Requesting...' : 'Enable'}
            </Button>
            {dismissible && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
        }
        sx={{
          mb: 2,
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle>Enable Notifications</AlertTitle>
        <Typography variant="body2">
          {message || defaultMessage}
        </Typography>
      </Alert>
    </Collapse>
  );
};

export default NotificationPermissionBanner;