import type { IUser } from '../interface';

export const getUserDisplayName = (user: {
  fullName?: string;
  firstName?: string;
  lastName?: string;
} | null): string => {
  if (!user) return 'Unknown User';
  if (user?.fullName) return user.fullName;
  if (user?.firstName && user?.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user?.firstName) return user.firstName;
  return 'Unknown User';
};

export const getUserInitials = (user: {
  fullName?: string;
  firstName?: string;
  lastName?: string;
} | null): string => {
  const displayName = getUserDisplayName(user);
  return displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getUserAvatarProps = (
  user: (IUser & { _id?: string }) | null,
  useColorfulAvatar: boolean = false
): { src?: string; children?: string; sx?: Record<string, unknown> } => {
  if (!user) {
    return {
      children: 'U',
      sx: {
        bgcolor: 'primary.main',
        color: 'white',
        fontSize: '0.875rem',
      },
    };
  }

  if (user?.profilePhoto?.photo_url) {
    return { src: user.profilePhoto.photo_url, sx: {} };
  }

  const initials = getUserInitials(user);

  const baseProps = {
    children: initials,
    sx: {
      color: 'white',
      fontSize: '0.875rem',
    },
  };

  if (useColorfulAvatar && user?._id) {
    const colors = [
      '#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2',
      '#303f9f', '#0288d1', '#00796b', '#689f38', '#fbc02d'
    ];
    const colorIndex = user._id.charCodeAt(0) % colors.length;
    
    return {
      ...baseProps,
      sx: {
        ...baseProps.sx,
        bgcolor: colors[colorIndex],
      },
    };
  }

  return {
    ...baseProps,
    sx: {
      ...baseProps.sx,
      bgcolor: 'primary.main',
    },
  };
};
