export type NotificationPermission = 'default' | 'granted' | 'denied';

export type NotificationType = 'info' | 'success' | 'error' | 'warning';

export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: unknown;
  requireInteraction?: boolean;
  silent?: boolean;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface BrowserNotificationOptions extends NotificationOptions {
  type?: NotificationType;
  fallbackToToast?: boolean;
}

export interface NotificationPreferences {
  browserNotificationsEnabled: boolean;
  fallbackToToast: boolean;
  enabledTypes: NotificationType[];
  requireInteraction: boolean;
  silent: boolean;
}

export interface NotificationState {
  permission: NotificationPermission;
  isSupported: boolean;
  preferences: NotificationPreferences;
  isRequestingPermission: boolean;
}

export interface NotificationContextType {
  // State
  permission: NotificationPermission;
  isSupported: boolean;
  preferences: NotificationPreferences;
  isRequestingPermission: boolean;
  
  // Actions
  requestPermission: () => Promise<NotificationPermission>;
  sendNotification: (options: BrowserNotificationOptions) => Promise<boolean>;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  
  // Convenience methods
  sendInfo: (title: string, body?: string, options?: Partial<BrowserNotificationOptions>) => Promise<boolean>;
  sendSuccess: (title: string, body?: string, options?: Partial<BrowserNotificationOptions>) => Promise<boolean>;
  sendError: (title: string, body?: string, options?: Partial<BrowserNotificationOptions>) => Promise<boolean>;
  sendWarning: (title: string, body?: string, options?: Partial<BrowserNotificationOptions>) => Promise<boolean>;
}

export interface NotificationServiceConfig {
  defaultIcon?: string;
  defaultBadge?: string;
  defaultRequireInteraction?: boolean;
  defaultSilent?: boolean;
}