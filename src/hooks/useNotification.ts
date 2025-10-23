import { useNotificationContext } from '../context/NotificationContext';
import type { NotificationContextType } from '../interface/notification';

/**
 * Custom hook for accessing notification functionality
 * Provides easy access to browser notifications with toast fallback
 */
export const useNotification = (): NotificationContextType => {
  return useNotificationContext();
};

export default useNotification;