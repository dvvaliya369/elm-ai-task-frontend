import type {
  NotificationPermission,
  BrowserNotificationOptions,
  NotificationPreferences,
  NotificationServiceConfig,
  NotificationType
} from '../interface/notification';

class NotificationService {
  private config: NotificationServiceConfig;
  private activeNotifications: Map<string, Notification> = new Map();

  constructor(config: NotificationServiceConfig = {}) {
    this.config = {
      defaultIcon: '/vite.svg',
      defaultRequireInteraction: false,
      defaultSilent: false,
      ...config
    };
  }

  /**
   * Check if browser notifications are supported
   */
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  /**
   * Get current notification permission status
   */
  getPermission(): NotificationPermission {
    if (!this.isSupported()) {
      return 'denied';
    }
    return Notification.permission as NotificationPermission;
  }

  /**
   * Request notification permission from user
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission as NotificationPermission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Send a browser notification
   */
  async sendNotification(options: BrowserNotificationOptions): Promise<Notification | null> {
    if (!this.isSupported() || this.getPermission() !== 'granted') {
      return null;
    }

    try {
      const notificationOptions: NotificationOptions = {
        body: options.body,
        icon: options.icon || this.config.defaultIcon,
        badge: options.badge || this.config.defaultBadge,
        tag: options.tag,
        data: options.data,
        requireInteraction: options.requireInteraction ?? this.config.defaultRequireInteraction,
        silent: options.silent ?? this.config.defaultSilent
      };

      const notification = new Notification(options.title, notificationOptions);

      // Store notification reference if it has a tag
      if (options.tag) {
        // Close existing notification with same tag
        const existing = this.activeNotifications.get(options.tag);
        if (existing) {
          existing.close();
        }
        this.activeNotifications.set(options.tag, notification);
      }

      // Set up event handlers
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
        
        // Handle custom click data
        if (options.data && typeof options.data === 'object' && 'url' in options.data) {
          window.open(options.data.url as string, '_blank');
        }
      };

      notification.onclose = () => {
        if (options.tag) {
          this.activeNotifications.delete(options.tag);
        }
      };

      notification.onerror = (error) => {
        console.error('Notification error:', error);
        if (options.tag) {
          this.activeNotifications.delete(options.tag);
        }
      };

      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  }

  /**
   * Send typed notifications with predefined styling
   */
  async sendTypedNotification(
    type: NotificationType,
    title: string,
    body?: string,
    options: Partial<BrowserNotificationOptions> = {}
  ): Promise<Notification | null> {
    const typeConfig = this.getTypeConfig(type);
    
    return this.sendNotification({
      title,
      body,
      icon: typeConfig.icon,
      tag: options.tag || `${type}-${Date.now()}`,
      ...options,
      data: {
        type,
        ...(options.data && typeof options.data === 'object' ? options.data : {})
      }
    });
  }

  /**
   * Get configuration for notification types
   */
  private getTypeConfig(type: NotificationType) {
    const configs = {
      info: {
        icon: this.config.defaultIcon
      },
      success: {
        icon: this.config.defaultIcon
      },
      error: {
        icon: this.config.defaultIcon
      },
      warning: {
        icon: this.config.defaultIcon
      }
    };

    return configs[type];
  }

  /**
   * Close notification by tag
   */
  closeNotification(tag: string): void {
    const notification = this.activeNotifications.get(tag);
    if (notification) {
      notification.close();
      this.activeNotifications.delete(tag);
    }
  }

  /**
   * Close all active notifications
   */
  closeAllNotifications(): void {
    this.activeNotifications.forEach(notification => {
      notification.close();
    });
    this.activeNotifications.clear();
  }

  /**
   * Get default notification preferences
   */
  getDefaultPreferences(): NotificationPreferences {
    return {
      browserNotificationsEnabled: true,
      fallbackToToast: true,
      enabledTypes: ['info', 'success', 'error', 'warning'],
      requireInteraction: false,
      silent: false
    };
  }

  /**
   * Load preferences from localStorage
   */
  loadPreferences(): NotificationPreferences {
    try {
      const stored = localStorage.getItem('notification-preferences');
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<NotificationPreferences>;
        return { ...this.getDefaultPreferences(), ...parsed };
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
    return this.getDefaultPreferences();
  }

  /**
   * Save preferences to localStorage
   */
  savePreferences(preferences: NotificationPreferences): void {
    try {
      localStorage.setItem('notification-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    }
  }

  /**
   * Check if notification type is enabled in preferences
   */
  isTypeEnabled(type: NotificationType, preferences: NotificationPreferences): boolean {
    return preferences.enabledTypes.includes(type);
  }
}

// Create singleton instance
export const notificationService = new NotificationService();
export default notificationService;