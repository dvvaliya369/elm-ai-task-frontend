# Browser Notification System

A comprehensive browser notification system for React applications with TypeScript support, Material-UI integration, and toast fallback functionality.

## Features

- 🔔 **Browser Notifications**: Native browser notification support with permission management
- 🍞 **Toast Fallback**: Automatic fallback to toast notifications when browser notifications are unavailable
- ⚙️ **Configurable Settings**: User preferences for notification types and behavior
- 🎨 **Material-UI Integration**: Seamless integration with existing Material-UI components
- 📱 **Responsive Design**: Works across different devices and screen sizes
- 🔒 **TypeScript Support**: Full type safety and IntelliSense support

## Quick Start

### 1. Import and Use the Hook

```tsx
import { useNotification } from '../hooks/useNotification';

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

  return (
    <div>
      <button onClick={handleSuccess}>Send Success</button>
      <button onClick={handleError}>Send Error</button>
    </div>
  );
};
```

### 2. Add Permission Banner

```tsx
import { NotificationPermissionBanner } from '../components/NotificationPermissionBanner';

const App = () => {
  return (
    <div>
      <NotificationPermissionBanner />
      {/* Your app content */}
    </div>
  );
};
```

### 3. Add Settings Component

```tsx
import { NotificationSettings } from '../components/NotificationSettings';

const SettingsPage = () => {
  return (
    <div>
      <NotificationSettings />
    </div>
  );
};
```

## API Reference

### useNotification Hook

The main hook for accessing notification functionality:

```tsx
const {
  // State
  permission,           // 'default' | 'granted' | 'denied'
  isSupported,         // boolean
  preferences,         // NotificationPreferences
  isRequestingPermission, // boolean
  
  // Actions
  requestPermission,   // () => Promise<NotificationPermission>
  sendNotification,    // (options) => Promise<boolean>
  updatePreferences,   // (preferences) => void
  
  // Convenience methods
  sendInfo,           // (title, body?, options?) => Promise<boolean>
  sendSuccess,        // (title, body?, options?) => Promise<boolean>
  sendError,          // (title, body?, options?) => Promise<boolean>
  sendWarning,        // (title, body?, options?) => Promise<boolean>
} = useNotification();
```

### Notification Options

```tsx
interface BrowserNotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: unknown;
  requireInteraction?: boolean;
  silent?: boolean;
  type?: 'info' | 'success' | 'error' | 'warning';
  fallbackToToast?: boolean;
}
```

### Notification Preferences

```tsx
interface NotificationPreferences {
  browserNotificationsEnabled: boolean;
  fallbackToToast: boolean;
  enabledTypes: NotificationType[];
  requireInteraction: boolean;
  silent: boolean;
}
```

## Components

### NotificationPermissionBanner

A banner component that prompts users to enable browser notifications:

```tsx
<NotificationPermissionBanner
  autoShow={true}                    // Show automatically when needed
  message="Custom message"           // Custom message text
  dismissible={true}                 // Allow dismissing the banner
  onDismiss={() => console.log('dismissed')} // Dismiss callback
/>
```

### NotificationSettings

A comprehensive settings panel for managing notification preferences:

```tsx
<NotificationSettings
  showHeader={true}                  // Show card header
  title="Custom Title"               // Custom title
  showTestButton={true}              // Show test notification button
/>
```

## Advanced Usage

### Custom Notifications with Data

```tsx
await notification.sendNotification({
  title: 'New Message',
  body: 'You have received a new message',
  type: 'info',
  requireInteraction: true,
  tag: 'message-notification',
  data: {
    messageId: '123',
    url: '/messages/123',
    customData: 'any data you need'
  }
});
```

### Checking Permission Status

```tsx
const { permission, isSupported } = useNotification();

if (!isSupported) {
  console.log('Browser notifications not supported');
} else if (permission === 'denied') {
  console.log('Notifications are blocked');
} else if (permission === 'granted') {
  console.log('Notifications are enabled');
}
```

### Managing Preferences

```tsx
const { preferences, updatePreferences } = useNotification();

// Disable error notifications
updatePreferences({
  enabledTypes: preferences.enabledTypes.filter(type => type !== 'error')
});

// Enable silent notifications
updatePreferences({
  silent: true
});
```

## Demo

Visit `/notifications` in your application to see a comprehensive demo of all notification features, including:

- Permission management
- Different notification types
- Settings configuration
- Usage examples
- Browser compatibility status

## Browser Support

The notification system automatically detects browser support and falls back to toast notifications when:

- Browser doesn't support the Notification API
- User has denied notification permissions
- Browser notifications are disabled in user preferences

## File Structure

```
src/
├── interface/
│   └── notification.ts              # TypeScript interfaces
├── service/
│   └── notification.service.ts      # Core notification service
├── context/
│   └── NotificationContext.tsx      # React context provider
├── hooks/
│   └── useNotification.ts           # Custom hook
├── components/
│   ├── NotificationPermissionBanner.tsx
│   └── NotificationSettings.tsx
└── pages/
    └── notifications/
        └── index.tsx                 # Demo page
```

## Integration Notes

- The NotificationProvider is already integrated into the main app
- Preferences are automatically saved to localStorage
- The system integrates seamlessly with the existing toast notification system
- All components follow Material-UI design patterns
- Full TypeScript support with proper type definitions