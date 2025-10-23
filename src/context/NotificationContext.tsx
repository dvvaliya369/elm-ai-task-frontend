/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import type {
  NotificationContextType,
  NotificationState,
  NotificationPermission,
  BrowserNotificationOptions,
  NotificationPreferences,
  NotificationType
} from '../interface/notification';
import { notificationService } from '../service/notification.service';
import { useToast } from '../hooks/useToast';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();
  
  const [state, setState] = useState<NotificationState>(() => ({
    permission: notificationService.getPermission(),
    isSupported: notificationService.isSupported(),
    preferences: notificationService.loadPreferences(),
    isRequestingPermission: false
  }));

  // Update permission status when it changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setState(prev => ({
          ...prev,
          permission: notificationService.getPermission()
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (state.isRequestingPermission) {
      return state.permission;
    }

    setState(prev => ({ ...prev, isRequestingPermission: true }));

    try {
      const permission = await notificationService.requestPermission();
      setState(prev => ({
        ...prev,
        permission,
        isRequestingPermission: false
      }));
      return permission;
    } catch (error) {
      console.error('Error requesting permission:', error);
      setState(prev => ({
        ...prev,
        isRequestingPermission: false
      }));
      return 'denied';
    }
  }, [state.isRequestingPermission, state.permission]);

  const sendToastFallback = useCallback((type: NotificationType, title: string, body?: string) => {
    const message = body ? `${title}: ${body}` : title;
    
    switch (type) {
      case 'success':
        toast.showSuccess(message);
        break;
      case 'error':
        toast.showError(message);
        break;
      case 'warning':
        toast.showWarning(message);
        break;
      case 'info':
      default:
        toast.showInfo(message);
        break;
    }
  }, [toast]);

  const sendNotification = useCallback(async (options: BrowserNotificationOptions): Promise<boolean> => {
    const { type = 'info', fallbackToToast = state.preferences.fallbackToToast } = options;

    // Check if this notification type is enabled
    if (!notificationService.isTypeEnabled(type, state.preferences)) {
      return false;
    }

    // Check if browser notifications are enabled in preferences
    if (!state.preferences.browserNotificationsEnabled) {
      if (fallbackToToast) {
        sendToastFallback(type, options.title, options.body);
      }
      return false;
    }

    // Check permission and try to send browser notification
    if (state.permission === 'granted') {
      try {
        const notification = await notificationService.sendNotification(options);
        if (notification) {
          return true;
        }
      } catch (error) {
        console.error('Error sending browser notification:', error);
      }
    }

    // Fallback to toast if enabled
    if (fallbackToToast) {
      sendToastFallback(type, options.title, options.body);
    }

    return false;
  }, [state.permission, state.preferences, sendToastFallback]);

  const updatePreferences = useCallback((newPreferences: Partial<NotificationPreferences>) => {
    setState(prev => {
      const updatedPreferences = { ...prev.preferences, ...newPreferences };
      notificationService.savePreferences(updatedPreferences);
      return {
        ...prev,
        preferences: updatedPreferences
      };
    });
  }, []);

  // Convenience methods for different notification types
  const sendInfo = useCallback(async (
    title: string,
    body?: string,
    options: Partial<BrowserNotificationOptions> = {}
  ): Promise<boolean> => {
    return sendNotification({
      ...options,
      title,
      body,
      type: 'info'
    });
  }, [sendNotification]);

  const sendSuccess = useCallback(async (
    title: string,
    body?: string,
    options: Partial<BrowserNotificationOptions> = {}
  ): Promise<boolean> => {
    return sendNotification({
      ...options,
      title,
      body,
      type: 'success'
    });
  }, [sendNotification]);

  const sendError = useCallback(async (
    title: string,
    body?: string,
    options: Partial<BrowserNotificationOptions> = {}
  ): Promise<boolean> => {
    return sendNotification({
      ...options,
      title,
      body,
      type: 'error'
    });
  }, [sendNotification]);

  const sendWarning = useCallback(async (
    title: string,
    body?: string,
    options: Partial<BrowserNotificationOptions> = {}
  ): Promise<boolean> => {
    return sendNotification({
      ...options,
      title,
      body,
      type: 'warning'
    });
  }, [sendNotification]);

  const contextValue: NotificationContextType = {
    // State
    permission: state.permission,
    isSupported: state.isSupported,
    preferences: state.preferences,
    isRequestingPermission: state.isRequestingPermission,
    
    // Actions
    requestPermission,
    sendNotification,
    updatePreferences,
    
    // Convenience methods
    sendInfo,
    sendSuccess,
    sendError,
    sendWarning
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationContext };
export type { NotificationContextType };