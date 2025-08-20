import { useState, useCallback } from 'react';

export const useProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    open: Boolean(anchorEl),
    handleProfileClick,
    handleClose,
  };
};
