import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../store/index';
import { logout } from '../../../store/authSlice';

export const useNavbarHandlers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleLogin = useCallback(() => {
    navigate('/log-in');
  }, [navigate]);

  const handleSignup = useCallback(() => {
    navigate('/sign-up');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/log-in');
  }, [dispatch, navigate]);

  return {
    handleNavigation,
    handleLogin,
    handleSignup,
    handleLogout,
  };
};
